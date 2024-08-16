import Auth from "@pages/Auth"
import ForgotPassword from "@pages/ForgotPassword"
import Home from "@pages/Home"
import SignIn from "@pages/SignIn"
import SignUp from "@pages/SignUp"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
