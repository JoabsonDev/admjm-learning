import { api } from "@services/axios"
import { create } from "zustand"

const INITIAL_LECTURE_STATE = {
  current: null,
  previous: null,
  next: null
}

type LectureState = {
  current: Lecture | null
  previous: Lecture | null
  next: Lecture | null
}

export type CourseStore = {
  course: Course | null
  fetchCourse: (id: string) => void
  lecture: LectureState
  setLecture: (course: Course, lectureId: string | null) => void
  activeLesson: number | null
  setActiveLesson: (course: Course, lectureId: string) => void
  done: boolean
}

export const useCourse = create<CourseStore>((set) => {
  const findInitialLectureState = (
    course: Course,
    lectureId: string = ""
  ): LectureState => {
    const lectures = course.lessons.reduce((acc, lesson) => {
      return [...acc, ...lesson.lectures]
    }, [] as Lecture[])

    const currentIndex = lectures.findIndex(
      (lecture) => lecture.id === lectureId || !lecture.completed
    )

    if (currentIndex === -1)
      return { current: null, previous: null, next: null }

    return {
      current: lectures[currentIndex],
      previous: lectures[currentIndex - 1] || null,
      next: lectures[currentIndex + 1] || null
    }
  }

  const findActiveLesson = (
    course: Course,
    lectureId: string | null = null
  ): number => {
    if (!course) return 0

    if (!lectureId) {
      const lectures = course.lessons.reduce((acc, lesson) => {
        return [...acc, ...lesson.lectures]
      }, [] as Lecture[])

      const current = lectures.find((lecture) => !lecture.completed)
      if (current) lectureId = current.id
    }

    return course.lessons.findIndex((lesson) =>
      lesson.lectures.find((lecture) => lecture.id === lectureId)
    )
  }

  const handleAllCompleted = (course: Course): boolean => {
    const lectures = course.lessons.reduce((acc, lesson) => {
      return [...acc, ...lesson.lectures]
    }, [] as Lecture[])

    return lectures.every((lecture) => lecture.completed)
  }

  return {
    course: null, // Correção aqui
    fetchCourse: async (id: string) => {
      try {
        const { data } = await api.get<Course>(`/course/${id}`)
        const course = data
        set(() => {
          return {
            course,
            lecture: findInitialLectureState(course),
            activeLesson: findActiveLesson(course),
            done: handleAllCompleted(course)
          }
        })
      } catch (error) {
        console.error("Failed to fetch course:", error)
        set(() => ({
          course: null,
          lecture: INITIAL_LECTURE_STATE,
          activeLesson: 0,
          done: false
        }))
      }
    },
    lecture: INITIAL_LECTURE_STATE,
    activeLesson: 0,
    setActiveLesson: (course, lectureId) =>
      set(() => ({
        activeLesson: findActiveLesson(course, lectureId)
      })),
    done: false,
    setLecture: (course: Course, lectureId: string | null = null) =>
      set((state) => ({
        ...state,
        lecture: findInitialLectureState(course, lectureId!)
      }))
  }
})
