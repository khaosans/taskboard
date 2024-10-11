import Link from 'next/link'
import { Button } from "@/components/ui/button"

export function NavigationBar() {
  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto py-4 px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-primary">TaskMaster</Link>
          <nav className="space-x-4">
            <Link href="/dashboard" className="text-sm hover:underline">Dashboard</Link>
            <Link href="/search" className="text-sm hover:underline">Search</Link>
            <Link href="/progress" className="text-sm hover:underline">Progress</Link>
            <Link href="/projects" className="text-sm hover:underline">Projects</Link>
            <Link href="/teams" className="text-sm hover:underline">Teams</Link>
            <Link href="/members" className="text-sm hover:underline">Members</Link>
            <Link href="/profile" className="text-sm hover:underline">Profile</Link>
            <Link href="/settings" className="text-sm hover:underline">Settings</Link>
            <Link href="/support" className="text-sm hover:underline">Support</Link>
            <Link href="/login" className="text-sm hover:underline">Log in</Link>
            <Button asChild variant="outline">
              <Link href="/signup">Sign up</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}