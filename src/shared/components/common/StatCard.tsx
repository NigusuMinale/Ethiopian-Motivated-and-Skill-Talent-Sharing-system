import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
  trend?: {
    value: number;
    isUp: boolean;
  };
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

const colorStyles: Record<string, { bg: string; text: string; icon: string }> = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    icon: 'text-blue-500',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    icon: 'text-green-500',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    icon: 'text-purple-500',
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    icon: 'text-orange-500',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    icon: 'text-red-500',
  },
};

export function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  color = 'blue',
  trend,
  loading = false,
  onClick,
  className,
}: StatCardProps) {
  const styles = colorStyles[color];

  return (
    <motion.div
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        'bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow',
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium uppercase tracking-wide mb-2">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">
              {loading ? '...' : value}
            </p>
            {unit && <span className="text-sm text-gray-500">{unit}</span>}
          </div>
          {trend && (
            <div className={cn('text-xs font-medium mt-2', trend.isUp ? 'text-green-600' : 'text-red-600')}>
              {trend.isUp ? '↑' : '↓'} {Math.abs(trend.value)}% vs last period
            </div>
          )}
        </div>

        <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center', styles.bg)}>
          <Icon className={cn('w-6 h-6', styles.icon)} />
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;
