import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { supabase } from "../../lib/supabase"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const user = useAuth()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [user])

  const fetchPosts = async () => {
    try {
      if (!supabase) return
      
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (err) {
      console.error("Error fetching posts:", err)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const { error } = await supabase!.from("posts").delete().eq("id", postId)
      if (error) throw error
      setPosts(posts.filter(p => p.id !== postId))
    } catch (err: any) {
      alert(`Error deleting post: ${err.message}`)
    }
  }

  const handleLogout = async () => {
    await supabase!.auth.signOut()
    navigate("/admin/login")
  }

  // ✅ logged in
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-8">
      <div className="max-w-6xl mx-auto">
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Create Post Card */}
          <Link to="/admin/create" className="gym-card hover:shadow-xl transition-all">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-2xl font-bold mb-2">Create New Post</h2>
            <p className="text-muted-foreground mb-4">Write and publish a new blog post</p>
            <button className="btn-primary-gym">Start Writing</button>
          </Link>

          {/* View Site Card */}
          <Link to="/" className="gym-card hover:shadow-xl transition-all">
            <div className="text-4xl mb-4">🌐</div>
            <h2 className="text-2xl font-bold mb-2">View Site</h2>
            <p className="text-muted-foreground mb-4">Check how your site looks to visitors</p>
            <button className="btn-outline-gym">Go to Site</button>
          </Link>
        </div>

        {/* Manage Blog Posts */}
        <div className="gym-card">
          <h2 className="text-2xl font-bold mb-6">Manage Blog Posts ({posts.length})</h2>
          
          {loading ? (
            <p className="text-muted-foreground">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="text-muted-foreground">No posts yet. <Link to="/admin/create" className="text-primary hover:underline">Create one now</Link></p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4">Title</th>
                    <th className="text-left py-3 px-4">Created</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr key={post.id} className="border-b border-border/50 hover:bg-background/50">
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold">{post.title}</p>
                          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                          Published
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <Link to={`/blog/${post.slug}`} className="inline-block px-3 py-1 text-primary hover:underline text-sm">
                          View
                        </Link>
                        <Link to={`/admin/edit/${post.id}`} className="inline-block px-3 py-1 text-primary hover:underline text-sm">
                          Edit
                        </Link>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="px-3 py-1 text-destructive hover:underline text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}