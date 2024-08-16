import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
