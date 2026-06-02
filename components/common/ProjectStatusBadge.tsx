import { Badge } from "@/components/ui/badge";
import { ProjectStatus } from "@/lib/types";
import { PROJECT_STATUS_COLORS, PROJECT_STATUS_LABELS } from "@/lib/constants";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  className?: string;
}

export function ProjectStatusBadge({
  status,
  className,
}: ProjectStatusBadgeProps) {
  // Ensure status is valid, fallback to 'active' if missing or invalid
  const validStatus =
    status && Object.keys(PROJECT_STATUS_COLORS).includes(status)
      ? status
      : "active";
  const colors = PROJECT_STATUS_COLORS[validStatus as ProjectStatus];
  const label = PROJECT_STATUS_LABELS[validStatus as ProjectStatus];

  return (
    <Badge
      className={`${colors.bg} ${colors.text} border ${colors.border} ${className}`}
    >
      {label}
    </Badge>
  );
}
