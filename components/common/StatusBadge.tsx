import { Badge } from '@/components/ui/badge'
import { TaskStatus } from '@/lib/types'
import { TASK_STATUS_COLORS, STATUS_LABELS } from '@/lib/constants'

interface StatusBadgeProps {
  status: TaskStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const colors = TASK_STATUS_COLORS[status]
  const label = STATUS_LABELS[status]

  return (
    <Badge className={`${colors.bg} ${colors.text} border ${colors.border} ${className}`}>
      {label}
    </Badge>
  )
}
