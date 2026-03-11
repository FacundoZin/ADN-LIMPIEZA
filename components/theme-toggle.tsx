"use client"

import { useTheme } from "next-themes"
import { CloudMoon, CloudSun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="h-10 w-10 shrink-0" />

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "h-10 w-10 rounded-xl transition-all duration-500",
        "bg-transparent hover:bg-muted/80 text-muted-foreground hover:text-foreground",
        "dark:hover:bg-white/10 dark:text-muted-foreground dark:hover:text-primary",
        "hover:scale-110 active:scale-95"
      )}
      aria-label="Cambiar tema"
    >
      <div className="relative h-5 w-5">
        <CloudSun 
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-500 transform",
            isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )} 
        />
        <CloudMoon 
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-500 transform",
            !isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )} 
        />
      </div>
    </Button>
  )
}
