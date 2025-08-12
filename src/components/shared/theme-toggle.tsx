
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <span>Theme</span>
         <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="flex items-center justify-center w-20 h-8 rounded-full p-1"
        >
            <div className="flex items-center gap-1">
                <Sun className="h-4 w-4 transition-all" />
                <Moon className="h-4 w-4 transition-all" />
            </div>
            <div
                className="absolute w-8 h-6 bg-primary rounded-full transition-transform duration-300 ease-in-out"
                style={{
                transform: theme === 'light' ? 'translateX(-22px)' : 'translateX(22px)',
                }}
            />
        </Button>
    </div>
  )
}
