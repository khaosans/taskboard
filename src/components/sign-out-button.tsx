'use client'

import { signOut } from '@/utils/auth'

export default function SignOutButton() {
  const handleSignOut = async () => {
    await signOut()
    window.location.href = '/login'
  }

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition"
    >
      Sign Out
    </button>
  )
}
function createClientComponentClient() {
  throw new Error('Function not implemented.')
}
