'use client'

import { useState, useEffect } from 'react'
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts'

interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
  sparkline_in_7d: { price: number[] }
}

export default function CryptoDashboard() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data = await response.json()
        setCoins(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch cryptocurrency data. Please try again later.')
        setLoading(false)
      }
    }

    fetchCoins()
  }, [])

  if (loading) {
    return <div className="text-center py-10">Loading...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Crypto Dashboard</h1>
      <p className="text-center mb-8 text-muted-foreground">Top 20 cryptocurrencies by market cap</p>
      
      <div className="overflow-x-auto mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Coin</th>
              <th className="p-2 text-right">Price</th>
              <th className="p-2 text-right">24h Change</th>
              <th className="p-2 text-right hidden sm:table-cell">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className="border-b border-muted hover:bg-muted/50">
                <td className="p-2">{coin.market_cap_rank}</td>
                <td className="p-2">
                  <div className="flex items-center">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                    <span className="font-medium">{coin.name}</span>
                    <span className="text-muted-foreground ml-2 hidden sm:inline">{coin.symbol.toUpperCase()}</span>
                  </div>
                </td>
                <td className="p-2 text-right">${coin.current_price.toLocaleString()}</td>
                <td className={`p-2 text-right ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <div className="flex items-center justify-end">
                    {coin.price_change_percentage_24h > 0 ? (
                      <ArrowUpIcon className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </td>
                <td className="p-2 text-right hidden sm:table-cell">${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coins.map((coin) => (
          <Card key={coin.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                {coin.name}
              </CardTitle>
              <CardDescription>{coin.symbol.toUpperCase()}</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  price: {
                    label: "Price",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={coin.sparkline_in_7d.price.map((price, index) => ({ price, index }))}>
                    <XAxis dataKey="index" hide />
                    <YAxis hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="var(--color-price)"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-4 flex justify-between items-center">
                <span className="font-bold">${coin.current_price.toLocaleString()}</span>
                <span className={`${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.price_change_percentage_24h > 0 ? (
                    <ArrowUpIcon className="w-4 h-4 inline mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 inline mr-1" />
                  )}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
