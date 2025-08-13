"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from "lucide-react"
import type { WeatherForecast } from "@/lib/weather"

interface WeatherForecastProps {
  forecast: WeatherForecast | null
  isLoading?: boolean
}

export function WeatherForecastComponent({ forecast, isLoading }: WeatherForecastProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
      case "sunny":
        return Sun
      case "clouds":
      case "cloudy":
        return Cloud
      case "rain":
        return CloudRain
      default:
        return Sun
    }
  }

  const getWeatherColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear":
      case "sunny":
        return "text-yellow-500"
      case "clouds":
      case "cloudy":
        return "text-gray-500"
      case "rain":
        return "text-blue-500"
      default:
        return "text-yellow-500"
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-xl">Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2">Loading weather data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!forecast) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold text-xl">Weather Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Select a destination and dates to see weather forecast</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-serif font-bold text-xl">Weather Forecast</CardTitle>
        <p className="text-sm text-gray-600">Location: {forecast.location}</p>
      </CardHeader>
      <CardContent>
        {/* Current Weather */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-2">Today</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {(() => {
                const IconComponent = getWeatherIcon(forecast.current.condition)
                return <IconComponent className={`h-8 w-8 ${getWeatherColor(forecast.current.condition)}`} />
              })()}
              <div>
                <div className="text-2xl font-bold">{forecast.current.temperature.max}°C</div>
                <div className="text-sm text-gray-600">{forecast.current.description}</div>
              </div>
            </div>
            <div className="text-right text-sm space-y-1">
              <div className="flex items-center gap-1">
                <Thermometer className="h-4 w-4" />
                {forecast.current.temperature.min}°C - {forecast.current.temperature.max}°C
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="h-4 w-4" />
                {forecast.current.humidity}%
              </div>
              <div className="flex items-center gap-1">
                <Wind className="h-4 w-4" />
                {forecast.current.windSpeed} km/h
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">7-Day Forecast</h3>
          <div className="grid gap-3">
            {forecast.forecast.slice(1, 8).map((day, index) => {
              const IconComponent = getWeatherIcon(day.condition)
              const date = new Date(day.date)

              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium w-16">
                      {date.toLocaleDateString("en", { weekday: "short" })}
                    </div>
                    <IconComponent className={`h-5 w-5 ${getWeatherColor(day.condition)}`} />
                    <div className="text-sm">{day.description}</div>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Droplets className="h-3 w-3" />
                      {day.humidity}%
                    </div>
                    <div className="font-medium">
                      {day.temperature.min}° - {day.temperature.max}°
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Weather Alerts */}
        <div className="mt-6 space-y-2">
          <h3 className="font-semibold">Weather Tips</h3>
          <div className="flex flex-wrap gap-2">
            {forecast.current.temperature.max > 35 && <Badge variant="destructive">High Temperature Alert</Badge>}
            {forecast.current.precipitation > 5 && <Badge variant="secondary">Rain Expected</Badge>}
            {forecast.current.windSpeed > 20 && <Badge variant="outline">Windy Conditions</Badge>}
            {forecast.current.temperature.min < 5 && <Badge variant="secondary">Cold Night Alert</Badge>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
