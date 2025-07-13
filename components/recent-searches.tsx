"use client"

import { CardFooter } from "@/components/ui/card"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { setValue, getValue } from "@/lib/upstash"

export function RecentSearches() {
  const [searches, setSearches] = useState<string[]>([])

  useEffect(() => {
    const fetchSearches = async () => {
      try {
        const storedSearches = await getValue("recentSearches")
        if (storedSearches) {
          setSearches(JSON.parse(storedSearches as string))
        }
      } catch (error) {
        console.error("Failed to fetch recent searches:", error)
      }
    }

    fetchSearches()
  }, [])

  const clearSearches = async () => {
    try {
      await setValue("recentSearches", JSON.stringify([]))
      setSearches([])
    } catch (error) {
      console.error("Failed to clear recent searches:", error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Búsquedas recientes</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {searches.length > 0 ? (
          <ul>
            {searches.map((search, index) => (
              <li key={index}>{search}</li>
            ))}
          </ul>
        ) : (
          <p>No hay búsquedas recientes</p>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={clearSearches} disabled={searches.length === 0}>
          Limpiar historial
        </Button>
      </CardFooter>
    </Card>
  )
}
