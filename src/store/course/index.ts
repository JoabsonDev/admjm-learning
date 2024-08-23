import { calculateTotalDuration } from "@helpers/calculate-total-duration"
import { db } from "@services/firebase-config"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"
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

async function getCourse(courseId: string): Promise<Course> {
  const courseRef = doc(db, "course", courseId)
  const courseSnapshot = await getDoc(courseRef)
  const courseData = courseSnapshot.data() as Course

  if (courseSnapshot.exists()) {
    const lessonsRef = collection(courseRef, "lessons")
    const lessonsSnapshot = await getDocs(lessonsRef)
    const lessons = lessonsSnapshot.docs.map((doc) => doc.data() as Lesson)

    courseData.lessons = lessons
  }

  return courseData
}

export const useCourse = create<CourseStore>((set) => {
  const findInitialLectureState = (
    course: Course,
    lectureId: string = ""
  ): LectureState => {
    if (!course.lessons) {
      return { current: null, previous: null, next: null }
    }

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

    const duration = course.lessons.reduce((acc, { lectures }) => {
      console.log(calculateTotalDuration(lectures).formated)

      acc = acc + calculateTotalDuration(lectures).total
      return acc
    }, 0)

    if (duration >= 3600) {
      course.duration = `${Math.round(duration / 3600)}h`
    } else {
      course.duration = `${Math.floor((duration % 3600) / 60)}min`
    }

    return course
  }

  return {
    course: null,
    fetchCourse: async (id: string) => {
      try {
        const course = await getCourse(id)

        set(() => {
          return {
            course: handleSetTime(course),
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
