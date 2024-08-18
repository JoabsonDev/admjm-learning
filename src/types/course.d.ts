type Lecture = {
  id: string
  title: string
  duration: string
  completed?: boolean
}
type Lesson = {
  title: string
  lectures: Lecture[]
}
type Course = {
  id: string
  title: string
  description: string
  thumbnail: string
  rate: number
  lessons: Lesson[]
}
