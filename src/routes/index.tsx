import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { PrivateRoutes } from "./private"
const Auth = lazy(() => import("@pages/Auth"))
const Cart = lazy(() => import("@pages/Cart"))
const Course = lazy(() => import("@pages/Course"))
const CourseDetails = lazy(() => import("@pages/CourseDetails"))
const CourseManager = lazy(() => import("@pages/CourseManager"))
const Dashboard = lazy(() => import("@pages/Dashboard"))
const ForgotPassword = lazy(() => import("@pages/ForgotPassword"))
const Home = lazy(() => import("@pages/Home"))
const Lesson = lazy(() => import("@pages/Lesson"))
const Lessons = lazy(() => import("@pages/Lessons"))
const SignIn = lazy(() => import("@pages/SignIn"))
const SignUp = lazy(() => import("@pages/SignUp"))
const Admin = lazy(() => import("@pages/Admin"))

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth" element={<Auth />}>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboard />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
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

              <Route
                path="/course/:courseId/details"
                element={<CourseDetails />}
              />
            </Route>
            <Route path="/course" element={<Course />}>
              <Route path=":courseId" element={<Course />}>
                <Route path="lecture/:lectureId" element={<Course />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
