import { Tooltip } from 'react-tooltip'

interface StatusBadgeProps {
  label: string
  status: 'connected' | 'warning' | 'disconnected'
  message?: string
}

export default function StatusBadge({ label, status, message }: StatusBadgeProps) {
  const getColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-400'
      case 'disconnected':
        return 'bg-red-500'
      default:
        return 'bg-gray-400'
    }
  }

  return (
    <div
      data-tooltip-id={`tooltip-${label}`}
      data-tooltip-content={message || `${label} status: ${status}`}
      className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
    >
      <span className={`w-2.5 h-2.5 rounded-full ${getColor()}`} />
      <span>{label}</span>
      <Tooltip id={`tooltip-${label}`} place="bottom" />
    </div>
  )
}
