import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      if (!supabase) {
        setError("Supabase not configured")
        setLoading(false)
        return
      }

      const { data, error: dbError } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-8 flex items-center justify-center pt-32">
          <p className="text-foreground">Loading posts...</p>
        </div>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-8 flex items-center justify-center pt-32">
          <p className="text-destructive">{error}</p>
        </div>
        <Footer />
      </>
    )
  }

  if (posts.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary p-8 flex items-center justify-center pt-32">
          <p className="text-muted-foreground">No blog posts yet</p>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary pt-32 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-primary mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground">Fitness tips, workout guides, and gym updates</p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="gym-card hover:shadow-xl transition-all overflow-hidden group">
                {/* Featured Image */}
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt || post.content.substring(0, 120)}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                    <span>
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
                  </div>

                  {/* Read More Button */}
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-block btn-primary-gym text-sm py-2 px-4"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}