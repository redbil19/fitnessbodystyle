import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setPosts(data || []))
  }, [])

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