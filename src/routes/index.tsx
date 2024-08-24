import Admin from "@pages/Admin"
import Auth from "@pages/Auth"
import Course from "@pages/Course"
import CourseDetails from "@pages/CourseDetails"
import CourseManager from "@pages/CourseManager"
import Dashboard from "@pages/Dashboard"
import ForgotPassword from "@pages/ForgotPassword"
import Home from "@pages/Home"
import Lesson from "@pages/Lesson"
import Lessons from "@pages/Lessons"
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
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/course-manager" element={<CourseManager />} />
          <Route
            path="/admin/course-manager/:courseId"
            element={<CourseManager />}
          />
          <Route
            path="/admin/course-manager/:courseId/lessons"
            element={<Lessons />}
          />
          <Route
            path="/admin/course-manager/:courseId/lessons/:lessonId"
            element={<Lesson />}
          />

          <Route path="/course/:courseId/details" element={<CourseDetails />} />
        </Route>
        <Route path="/course" element={<Course />}>
          <Route path=":courseId" element={<Course />}>
            <Route path="lecture/:lectureId" element={<Course />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
