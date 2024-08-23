import CourseSidebar from "@organisms/CourseSidebar"
import Footer from "@organisms/Footer"
import Header from "@organisms/Header"
import Player from "@organisms/Player"
import { useCourse } from "@store/course"
import { useSidebarStore } from "@store/sidebar"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { tv } from "tailwind-variants"

const variants = tv({
  base: "pt-16 min-h-screen flex flex-col transition-all duration-300",
  variants: {
    hasAside: {
      true: "sm:mr-[300px]"
    }
  }
})
export default function Course() {
  const { isVisible } = useSidebarStore(({ isVisible }) => ({ isVisible }))
  const className = variants({ hasAside: isVisible })
  const { courseId, lectureId } = useParams()

  const { fetchCourse, lecture } = useCourse(({ fetchCourse, lecture }) => ({
    fetchCourse,
    lecture
  }))

  const { isLoading } = useQuery(
    ["course", courseId],
    () => fetchCourse(courseId!),
    { refetchOnWindowFocus: false }
  )

  useEffect(() => {
    if (!lectureId && lecture?.current) {
      window.location.href = `/course/${courseId}/lecture/${lecture.current.id}`
    }
  }, [lecture?.current])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <CourseSidebar />
      <div className={className}>
        {!isLoading && <Player />}
        <Footer className="mt-10" />
      </div>
    </div>
  )
}
