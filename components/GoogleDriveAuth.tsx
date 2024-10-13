"use client"

import { useState } from 'react'
import toast from 'react-hot-toast'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface Props {
  onConnect: () => void
}

export default function GoogleDriveAuth({ onConnect }: Props) {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()

  const handleConnect = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/drive.readonly',
          redirectTo: `${window.location.origin}/drive`
        }
      })

      if (error) throw error
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Error connecting to Google Drive:', error)
      toast.error(`Failed to connect to Google Drive: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleConnect}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? 'Connecting...' : 'Connect Google Drive'}
      </button>
    </div>
  )
}
