"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import GoogleDriveAuth from "@/components/GoogleDriveAuth"
import GoogleDriveFiles from "@/components/GoogleDriveFiles"
import { Toaster } from 'react-hot-toast'

export default function DrivePage() {
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session?.provider_token) {
      setIsConnected(true)
    }
    setIsLoading(false)
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right" />
      <h1 className="text-2xl font-bold mb-4">Google Drive Integration</h1>
      {!isConnected ? (
        <GoogleDriveAuth onConnect={checkConnection} />
      ) : (
        <GoogleDriveFiles />
      )}
    </div>
  )
}
