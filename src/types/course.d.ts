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
  price?: number
  duration?: string
  rate: RatingSize
  alreadyPurchased?: boolean
  lessons?: Lesson[]
}

// type CourseCard = {
//   id: string
//   title: string
//   description?: string
//   price?: number
//   image: string
//   rating?: RatingSize
//   time?: string
//   alreadyPurchased?: boolean
// }
