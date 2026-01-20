import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { Navigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function CreatePost() {
  const user = useAuth()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  if (!user) return <Navigate to="/admin/login" />

  const createPost = async () => {
    await supabase.from("posts").insert({
      title,
      content,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    })
  }

  return (
    <div className="p-8">
      <input
        placeholder="Title"
        className="border p-2 w-full mb-4"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        className="border p-2 w-full mb-4"
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={createPost}
        className="bg-black text-white px-4 py-2"
      >
        Publish
      </button>
    </div>
  )
}