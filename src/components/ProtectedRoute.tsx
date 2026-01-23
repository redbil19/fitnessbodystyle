import { Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

interface ProtectedRouteProps {
  element: React.ReactElement
}

export function ProtectedRoute({ element }: ProtectedRouteProps) {
  const user = useAuth()

  // Still loading
  if (user === undefined) {
    return <div className="min-h-screen flex items-center justify-center text-foreground">Loading...</div>
  }

  // Not authenticated
  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  // Authenticated - show the component
  return element
}
