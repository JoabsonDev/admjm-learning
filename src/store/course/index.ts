import { calculateTotalDuration } from "@helpers/calculate-total-duration"
import { formatDuration } from "@helpers/formate-duration"
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
  setCourse: (course: Course) => void
  lecture: LectureState
  setLecture: (course: Course, lectureId: string | null) => void
  activeLesson: number | null
  setActiveLesson: (course: Course, lectureId: string) => void
  done: boolean
}

export const useCourseStore = create<CourseStore>((set) => {
  const findLectureState = (
    course: Course,
    lectureId: string | null
  ): LectureState => {
    if (!course.lessons) {
      return { current: null, previous: null, next: null }
    }

    const lectures = course.lessons.reduce((acc, lesson) => {
      return [...acc, ...lesson.lectures]
    }, [] as Lecture[])

    let currentIndex = lectures.findIndex((lecture) => lecture.id === lectureId)
    if (currentIndex === -1)
      currentIndex = lectures.findIndex((lecture) => !lecture.completed)

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
    if (!course || !course.lessons) return 0

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
    if (!course.lessons) return false

    const lectures = course.lessons.reduce((acc, lesson) => {
      return [...acc, ...lesson.lectures]
    }, [] as Lecture[])

    return lectures.every((lecture) => lecture.completed)
  }

  const handleSetTime = (course: Course): Course => {
    if (!course.lessons) return course

    if (course.duration) return course

    const duration = course.lessons.reduce((acc, { lectures }) => {
      acc = acc + calculateTotalDuration(lectures).total
      return acc
    }, 0)

    course.duration = formatDuration(duration)

    return course
  }

  return {
    course: null,
    setCourse: async (course: Course) => {
      try {
        set(() => {
          return {
            course: handleSetTime(course),
            lecture: findLectureState(course, null),
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
    setLecture: (course: Course, lectureId: string | null = null) =>
      set(() => ({
        lecture: findLectureState(course, lectureId!)
      })),
    activeLesson: 0,
    setActiveLesson: (course, lectureId) =>
      set(() => ({
        activeLesson: findActiveLesson(course, lectureId)
      })),
    done: false
  }
})
