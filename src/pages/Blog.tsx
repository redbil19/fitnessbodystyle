import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!supabase) {
          setError("⚠️ Database not configured. Admin: Check Vercel Environment Variables for VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY")
          setLoading(false)
          return
        }

        const { data, error: dbError } = await supabase
          .from("posts")
          .select("*")
          .order("created_at", { ascending: false })

        if (dbError) throw dbError
        setPosts(data || [])
      } catch (err: any) {
        console.error("Error fetching posts:", err)
        setError(err.message || "Failed to fetch posts")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <div className="p-8 text-center text-foreground">Loading posts...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-destructive text-sm">{error}</div>
  }

  if (posts.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No blog posts yet</div>
  }

  return (
    <div className="p-8 grid md:grid-cols-3 gap-6">
      {posts.map(post => (
        <div key={post.id} className="border p-4">
          <h2 className="font-bold">{post.title}</h2>
          <p>{post.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  )
}