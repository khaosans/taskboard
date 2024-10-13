'use client'

import { useState } from 'react'

export default function GoogleDriveAuthButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/google-drive-login', { method: 'POST' })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('No URL returned from login API')
      }
    } catch (error) {
      console.error('Error during Google Drive auth:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button onClick={handleAuth} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Connect Google Drive'}
    </button>
  )
}
