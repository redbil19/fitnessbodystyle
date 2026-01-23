import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

let authInitialized = false
let currentUser: any = undefined

export function useAuth() {
  const [user, setUser] = useState<any>(currentUser)

  useEffect(() => {
    if (!supabase) {
      setUser(null)
      return
    }

    // Only initialize once
    if (!authInitialized) {
      authInitialized = true
      
      // Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        currentUser = session?.user || null
        setUser(currentUser)
      })
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      currentUser = session?.user || null
      setUser(currentUser)
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  return user
}
