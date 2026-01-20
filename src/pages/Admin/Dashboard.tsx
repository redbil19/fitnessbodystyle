import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function Dashboard() {
  const user = useAuth()

  // ⏳ still loading auth state
  if (user === null) {
    return <div>Loading...</div>
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/admin/login" />
  }

  // ✅ logged in
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
    </div>
  )
}