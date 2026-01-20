import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      console.log('Supabase not initialized')
      setLoading(false)
      return
    }

    // Check current session
    const checkAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) throw error
        setUser(data.session?.user || null)
      } catch (err) {
        console.error('Auth error:', err)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => subscription?.unsubscribe()
  }, [])

  // Return null while loading, user/null after
  return loading ? null : user
}
