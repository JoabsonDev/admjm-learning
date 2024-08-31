import useAuthStore from "@store/auth"
import { Outlet, useNavigate } from "react-router-dom"

export function PrivateRoutes() {
  const { user, loading } = useAuthStore()
  const navigate = useNavigate()

  // TODO: criar um loader
  if (loading) return <div>Loading...</div>

  if (!user) {
    navigate("/auth/sign-in")
    return null
  }

  return <Outlet />
}
