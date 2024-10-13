"use client"

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface File {
  id: string
  name: string
}

export default function GoogleDriveFiles() {
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchFiles()
  }, [])

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('fetch-google-drive-files')
      
      if (error) throw error
      
      setFiles(data.files)
    } catch (error) {
      console.error('Error fetching files:', error)
      setError('Failed to fetch files. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading files...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Your Google Drive Files:</h2>
      {files.length === 0 ? (
        <p>No files found in your Google Drive.</p>
      ) : (
        <ul className="list-disc pl-5">
          {files.map((file) => (
            <li key={file.id}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
