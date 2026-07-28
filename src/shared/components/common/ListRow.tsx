import { motion } from 'framer-motion';
import { ChevronRight, MoreVertical, Badge as BadgeIcon } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { ReactNode } from 'react';

export interface Badge {
  label: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
  variant?: 'solid' | 'outline';
}

export interface Action {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface ListRowProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  badges?: Badge[];
  actions?: Action[];
  onClick?: () => void;
  expandable?: boolean;
  expanded?: boolean;
  loading?: boolean;
  selected?: boolean;
  className?: string;
  children?: ReactNode;
}

const badgeColorStyles: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-300' },
};

export function ListRow({
  icon,
  title,
  subtitle,
  description,
  badges = [],
  actions = [],
  onClick,
  expandable = false,
  expanded = false,
  loading = false,
  selected = false,
  className,
  children,
}: ListRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        'bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all',
        selected && 'border-blue-500 bg-blue-50',
        onClick && 'cursor-pointer hover:border-gray-300',
        className
      )}
      onClick={onClick}
    >
      <div className="space-y-3">
        {/* Main Content */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {icon && (
              <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                {icon}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{title}</h3>
              {subtitle && (
                <p className="text-sm text-gray-600 truncate">{subtitle}</p>
              )}
              {description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
              )}
            </div>
          </div>

          {/* Right Side: Badges + Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Badges */}
            {badges.length > 0 && (
              <div className="flex gap-1">
                {badges.map((badge, idx) => {
                  const colors = badgeColorStyles[badge.color || 'gray'];
                  const isOutline = badge.variant === 'outline';
                  return (
                    <span
                      key={idx}
                      className={cn(
                        'text-xs font-medium px-2 py-1 rounded',
                        isOutline
                          ? `border ${colors.border} ${colors.text}`
                          : `${colors.bg} ${colors.text}`
                      )}
                    >
                      {badge.label}
                    </span>
                  );
                })}
              </div>
            )}

            {/* Actions Menu */}
            {actions.length > 0 && (
              <div className="relative group">
                <button className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-4 h-4" />
                </button>
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-max">
                  {actions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        action.onClick();
                      }}
                      disabled={action.disabled}
                      className={cn(
                        'w-full px-4 py-2 text-sm text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2',
                        action.variant === 'danger' && 'text-red-600 hover:bg-red-50'
                      )}
                    >
                      {action.icon}
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Expandable Arrow */}
            {expandable && (
              <motion.div
                animate={{ rotate: expanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </motion.div>
            )}
          </div>
        </div>

        {/* Expanded Content */}
        {expandable && expanded && children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-200 pt-3"
          >
            {children}
          </motion.div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ListRow;
