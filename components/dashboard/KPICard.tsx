import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string | number
  change?: number
  icon: React.ReactNode
  trend?: 'up' | 'down'
}

export function KPICard({ title, value, change, icon, trend }: KPICardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-muted-foreground">{icon}</div>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {change}%
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
