import CourseCard from "@organisms/CourseCard"

export default function Home() {
  const continueCourses: CourseCard = {
    id: "1",
    title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam suscipit molestias, deserunt magni laudantium, corporis veniam rem ab cupiditate nobis sequi! Ratione, nisi. Veniam corrupti nesciunt namasperiores dolores magnam!",
    // price: 25,
    image:
      "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-1.jpg",
    rating: 4.5,
    time: "25 hours",
    url: "/course/1"
  }

  const featuredCourses: CourseCard[] = [
    {
      id: "1",
      title: "Complete Python Bootcamp: Go from zero to hero in Python 3",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam suscipit molestias, deserunt magni laudantium, corporis veniam rem ab cupiditate nobis sequi! Ratione, nisi. Veniam corrupti nesciunt namasperiores dolores magnam!",
      price: 25,
      image:
        "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-1.jpg",
      rating: 4.5,
      time: "25 hours",
      url: "/course/1"
    },
    {
      id: "2",
      title: "The Complete JavaScript Course 2020: Build Real Projects!",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam suscipit molestias, deserunt magni laudantium, corporis veniam rem ab cupiditate nobis sequi! Ratione, nisi. Veniam corrupti nesciunt namasperiores dolores magnam!",
      price: 20,
      image:
        "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-2.jpg",
      rating: 3.5,
      time: "28 hours",
      url: "/course/2"
    },
    {
      id: "3",
      title: "Beginning C++ Programming - From Beginner to Beyond",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam suscipit molestias, deserunt magni laudantium, corporis veniam rem ab cupiditate nobis sequi! Ratione, nisi. Veniam corrupti nesciunt namasperiores dolores magnam!",
      price: 24.5,
      image:
        "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-3.jpg",
      rating: 4,
      time: "12 hours",
      url: "/course/3"
    },
    {
      id: "4",
      title: "The Complete Digital Marketing Course - 12 Courses in 1",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam suscipit molestias, deserunt magni laudantium, corporis veniam rem ab cupiditate nobis sequi! Ratione, nisi. Veniam corrupti nesciunt namasperiores dolores magnam!",
      price: 12,
      image:
        "https://gambolthemes.net/html-items/cursus-new-demo/images/courses/img-4.jpg",
      rating: 2.5,
      time: "1 hour",
      url: "/course/4"
    }
  ]
  return (
    <div>
      <div className="mb-12">
        <h2 className="mb-5 text-lg font-medium text-neutral-700">
          Continuar estudando
        </h2>

        <CourseCard
          className="mx-auto md:m-0 min-w-72 max-w-full md:max-w-[50%]"
          data={continueCourses}
        />
      </div>

      <div className="mb-12">
        <h2 className="mb-5 text-lg font-medium text-neutral-700">
          Cursos em destaque
        </h2>

        <div className="flex gap-4 flex-wrap">
          {featuredCourses.map((course) => (
            <CourseCard
              className="flex-1 basis-72 mx-auto md:m-0 max-w-full md:max-w-xs"
              key={course.id}
              data={course}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
