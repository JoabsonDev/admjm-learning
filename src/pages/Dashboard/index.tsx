import Footer from "@organisms/Footer"
import Header from "@organisms/Header"
import Main from "@organisms/Main"
import Sidebar from "@organisms/Sidebar"
import { useSidebarStore } from "@store/sidebar"
import { tv } from "tailwind-variants"

const variants = tv({
  base: "pt-16 min-h-screen flex flex-col transition-all duration-300",
  variants: {
    hasAside: {
      true: "sm:ml-60"
    }
  }
})
export default function Dashboard() {
  const { isVisible } = useSidebarStore()
  const className = variants({ hasAside: isVisible })
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Sidebar />
      <div className={className}>
        <Main />
        <Footer className="mt-auto" />
      </div>
    </div>
  )
}
