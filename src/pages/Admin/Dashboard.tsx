import { Navigate, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { supabase } from "../../lib/supabase"

export default function Dashboard() {
  const user = useAuth()
  const navigate = useNavigate()

  // ⏳ still loading auth state
  if (user === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/admin/login" />
  }

  const handleLogout = async () => {
    await supabase!.auth.signOut()
    navigate("/admin/login")
  }

  // ✅ logged in
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="btn-outline-gym"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Post Card */}
          <Link to="/admin/create" className="gym-card hover:shadow-xl transition-all">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-2xl font-bold mb-2">Create New Post</h2>
            <p className="text-muted-foreground mb-4">Write and publish a new blog post to your fitness hub</p>
            <button className="btn-primary-gym">Start Writing</button>
          </Link>

          {/* View Posts Card */}
          <Link to="/blog" className="gym-card hover:shadow-xl transition-all">
            <div className="text-4xl mb-4">📚</div>
            <h2 className="text-2xl font-bold mb-2">View All Posts</h2>
            <p className="text-muted-foreground mb-4">Check out all published blog posts on your fitness hub</p>
            <button className="btn-outline-gym">View Blog</button>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 gym-card">
          <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
          <p className="text-muted-foreground">Logged in as: <span className="text-primary font-semibold">{user.email}</span></p>
        </div>
      </div>
    </div>
  )
}