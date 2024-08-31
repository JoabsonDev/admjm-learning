import useAuthStore from "@store/auth"
import { Navigate, Outlet } from "react-router-dom"

export function PrivateRoutes() {
  const { user, loading } = useAuthStore()

  // TODO: criar um loader
  if (loading)
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-atomic="true"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-500"></div>
        <span className="sr-only">carregando...</span>
      </div>
    )

  if (!user) return <Navigate to="/auth/sign-in" />

  return <Outlet />
}
