import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { ArrowRight } from "lucide-react"

export default function BlogPreview() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      if (!supabase) {
        setLoading(false)
        return
      }

      const { data } = await supabase
        .from("posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(3)

      setPosts(data || [])
    } catch (err) {
      console.error("Error fetching posts:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="blog" className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            Bloguni Ynë
          </h2>
          <p className="text-xl text-muted-foreground mb-6">
            Shiko më shumë informacion për fitnessin në blogun tonë
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 btn-primary-gym"
          >
            Shfletoni të Gjithë Artikujt <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-muted-foreground">
            Nuk ka artikuj akoma. Kthehuni më vonë!
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="gym-card hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
              >
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
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                    {post.excerpt || post.content.substring(0, 100)}
                  </p>

                  {/* Meta & Button */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.created_at).toLocaleDateString('sq-AL', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="text-primary font-semibold text-sm group-hover:gap-2 transition-all flex items-center gap-1">
                      Lexo më shumë <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
