import { useEffect, useState } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { Instagram, Facebook } from "lucide-react"

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchPost()
  }, [slug])

  const fetchPost = async () => {
    try {
      if (!supabase || !slug) {
        setError("Post not found")
        setLoading(false)
        return
      }

      const { data, error: dbError } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single()

      if (dbError || !data) {
        setError("Post not found")
      } else {
        setPost(data)
      }
    } catch (err: any) {
      setError(err.message || "Failed to load post")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-40">
        <p className="text-foreground">Loading...</p>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white p-8 pt-40">
        <div className="max-w-2xl mx-auto">
          <Link to="/blog" className="text-primary hover:underline mb-8 inline-block">
            ← Back to Blog
          </Link>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
            <p className="text-muted-foreground">{error || "The blog post you're looking for doesn't exist."}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-8 pt-40">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link to="/blog" className="text-primary hover:underline mb-8 inline-block flex items-center gap-2">
          ← Back to Blog
        </Link>

        {/* Post Content */}
        <article className="bg-white border border-border rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          )}

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center justify-between gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-300 flex-wrap">
              <div className="flex items-center gap-4">
                <span>
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span>•</span>
                <span>{Math.ceil(post.content.split(' ').length / 200)} min read</span>
              </div>
              
              {/* Social Share Icons */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://www.instagram.com/fitnessbodystyle.al/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="Follow on Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.facebook.com/fitnessbodystyle/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  title="Follow on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg text-gray-700 mb-8 italic">
                {post.excerpt}
              </p>
            )}

            {/* Body */}
            <div className="prose max-w-none mb-8">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-lg">
                {post.content}
              </div>
            </div>

            {/* Back to Blog */}
            <div className="pt-8 border-t border-border">
              <Link to="/blog" className="btn-primary-gym inline-block">
                ← Back to All Posts
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
