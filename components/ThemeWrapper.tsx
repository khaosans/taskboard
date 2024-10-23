import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={resolvedTheme}>
      {children}
    </div>
  )
}
