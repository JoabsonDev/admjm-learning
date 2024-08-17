import Footer from "@organisms/Footer"
import Header from "@organisms/Header"
import Main from "@organisms/Main"
import Sidebar from "@organisms/Sidebar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </div>
  )
}
