import Header from "@organisms/Header"
import Main from "@organisms/Main"
import Sidebar from "@organisms/Sidebar"

export default function Home() {
  return (
    <>
      <Header />
      <Sidebar>aside</Sidebar>
      <Main />
      <footer>footer</footer>
    </>
  )
}
