"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs";
import GoogleDriveFiles from "@/components/GoogleDriveFiles"
import GoogleDriveAuth from "@/components/GoogleDriveAuth"
import supabaseClient from "@/lib/supabaseClient"
import logger from "@/lib/logger"

export default function DrivePage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = supabaseClient

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      checkConnection()
    } else if (isLoaded && !isSignedIn) {
      setIsLoading(false)
    }
  }, [isLoaded, isSignedIn])

  const checkConnection = async () => {
    try {
      if (!user?.id) {
        throw new Error('User ID not available');
      }
      logger.info(`Checking connection for user: ${user.id}`);
      const { data, error } = await supabase
        .from('google_drive_tokens')
        .select('tokens')
        .eq('user_id', user.id)
        .single()

      if (error) {
        logger.error(`Supabase error: ${JSON.stringify(error)}`);
        throw error;
      }

      logger.info(`Supabase data: ${JSON.stringify(data)}`);

      if (data && data.tokens) {
        setIsConnected(true);
        logger.info('User is connected to Google Drive');
      } else {
        logger.info('User is not connected to Google Drive');
      }
    } catch (error) {
      logger.error(`Error checking Google Drive connection: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  }

  if (!isLoaded || isLoading) return <div>Loading...</div>

  if (!isSignedIn) return <div>Please sign in to access Google Drive integration.</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Google Drive Integration</h1>
      {!isConnected ? (
        <GoogleDriveAuth onConnect={checkConnection} />
      ) : (
        <GoogleDriveFiles />
      )}
    </div>
  )
}
