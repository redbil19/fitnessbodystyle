import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { Navigate, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function CreatePost() {
  const user = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)

  if (user === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user) return <Navigate to="/admin/login" />

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      setMessage("❌ Please fill in all fields")
      setSuccess(false)
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase!.from("posts").insert({
        title,
        content,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        created_at: new Date().toISOString(),
      })

      if (error) throw error

      setMessage("✅ Post published successfully!")
      setSuccess(true)
      setTitle("")
      setContent("")
      
      setTimeout(() => navigate("/blog"), 2000)
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`)
      setSuccess(false)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/admin/dashboard" className="text-primary hover:underline mb-4 inline-block">
              ← Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-primary">Create New Post</h1>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <form onSubmit={createPost} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Post Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                rows={12}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* Message */}
            {message && (
              <div className={`p-4 rounded-lg border ${success ? 'bg-green-500/10 border-green-500 text-green-400' : 'bg-destructive/10 border-destructive text-destructive'}`}>
                {message}
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary-gym flex-1 disabled:opacity-50"
              >
                {loading ? "Publishing..." : "Publish Post"}
              </button>
              <Link to="/admin/dashboard" className="btn-outline-gym">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}