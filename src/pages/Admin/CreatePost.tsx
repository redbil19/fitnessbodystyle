import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

export default function CreatePost() {
  const user = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [success, setSuccess] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${user.id}/${fileName}`

      const { error } = await supabase!.storage
        .from('blog-images')
        .upload(filePath, file)

      if (error) throw error

      const { data } = supabase!.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      return data?.publicUrl || null
    } catch (err: any) {
      console.error('Image upload error:', err)
      setMessage(`❌ Image upload failed: ${err.message}`)
      return null
    }
  }

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      setMessage("❌ Please fill in title and content")
      setSuccess(false)
      return
    }

    setLoading(true)
    try {
      let imageUrl = null
      if (image) {
        imageUrl = await uploadImage(image)
        if (!imageUrl) {
          setLoading(false)
          return
        }
      }

      const slug = title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")

      const { error } = await supabase!.from("posts").insert({
        title,
        excerpt: excerpt || content.substring(0, 150),
        content,
        image_url: imageUrl,
        slug,
        user_id: user.id,
        created_at: new Date().toISOString(),
      })

      if (error) throw error

      setMessage("✅ Post published successfully!")
      setSuccess(true)
      setTitle("")
      setExcerpt("")
      setContent("")
      setImage(null)
      setImagePreview("")
      
      setTimeout(() => navigate("/admin/dashboard"), 2000)
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
              <label className="block text-sm font-medium text-foreground mb-2">Post Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your post title..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Excerpt</label>
              <input
                type="text"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Short summary of your post..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="max-h-48 rounded-lg" />
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Content *</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here..."
                rows={12}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                required
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