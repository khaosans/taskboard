"use client"

import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function LoginButton() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = useSupabaseClient()

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/drive`,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error('Error logging in:', error)
      alert('Failed to log in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {isLoading ? 'Logging in...' : 'Log in with Google'}
    </button>
  )
}
