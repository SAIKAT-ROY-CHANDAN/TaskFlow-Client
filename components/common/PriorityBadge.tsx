import { Badge } from '@/components/ui/badge'
import { TaskPriority } from '@/lib/types'
import { PRIORITY_COLORS, PRIORITY_LABELS } from '@/lib/constants'

interface PriorityBadgeProps {
  priority: TaskPriority
  className?: string
}

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const colors = PRIORITY_COLORS[priority]
  const label = PRIORITY_LABELS[priority]

  return (
    <Badge className={`${colors.bg} ${colors.text} border ${colors.border} ${className}`}>
      {label}
    </Badge>
  )
}
