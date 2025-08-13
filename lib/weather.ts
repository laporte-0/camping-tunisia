export interface WeatherData {
  date: string
  temperature: {
    min: number
    max: number
  }
  condition: string
  description: string
  humidity: number
  windSpeed: number
  precipitation: number
  icon: string
}

export interface WeatherForecast {
  location: string
  current: WeatherData
  forecast: WeatherData[]
}

// Mock weather data - in a real app, this would call OpenWeather API
export const getWeatherForecast = async (coordinates: [number, number], days = 7): Promise<WeatherForecast> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const [longitude, latitude] = coordinates

  // Mock weather conditions based on location (simplified)
  const isDesert = latitude < 34
  const isMountain = latitude > 35.5
  const isCoastal = longitude > 9.5

  const generateWeatherData = (dayOffset: number): WeatherData => {
    const date = new Date()
    date.setDate(date.getDate() + dayOffset)

    let baseTemp = 25
    let condition = "Clear"
    let description = "Clear sky"

    if (isDesert) {
      baseTemp = 35
      condition = dayOffset % 3 === 0 ? "Clear" : "Sunny"
      description = dayOffset % 3 === 0 ? "Clear desert sky" : "Hot and sunny"
    } else if (isMountain) {
      baseTemp = 15
      condition = dayOffset % 4 === 0 ? "Clouds" : "Clear"
      description = dayOffset % 4 === 0 ? "Partly cloudy" : "Clear mountain air"
    } else if (isCoastal) {
      baseTemp = 22
      condition = dayOffset % 5 === 0 ? "Rain" : "Clear"
      description = dayOffset % 5 === 0 ? "Light rain" : "Pleasant coastal weather"
    }

    const tempVariation = Math.random() * 10 - 5
    const minTemp = Math.round(baseTemp + tempVariation - 5)
    const maxTemp = Math.round(baseTemp + tempVariation + 5)

    return {
      date: date.toISOString().split("T")[0],
      temperature: { min: minTemp, max: maxTemp },
      condition,
      description,
      humidity: Math.round(40 + Math.random() * 40),
      windSpeed: Math.round(5 + Math.random() * 15),
      precipitation: condition === "Rain" ? Math.round(Math.random() * 10) : 0,
      icon: condition.toLowerCase(),
    }
  }

  const forecast = Array.from({ length: days }, (_, i) => generateWeatherData(i))

  return {
    location: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
    current: forecast[0],
    forecast,
  }
}
