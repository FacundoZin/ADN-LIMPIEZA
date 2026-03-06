"use client"

import { CloudMoon, CloudSun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    const initialTheme = storedTheme || systemTheme

    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  if (!mounted) return <div className="h-9 w-9" />

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
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
            theme === "dark" ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )} 
        />
        <CloudMoon 
          className={cn(
            "absolute inset-0 h-5 w-5 transition-all duration-500 transform",
            theme === "light" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
          )} 
        />
      </div>
    </Button>
  )
}
