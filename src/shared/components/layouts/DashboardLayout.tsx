import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

export interface DashboardTab {
  id: string;
  label: string;
  icon?: ReactNode;
}

export interface DashboardLayoutProps {
  title: string;
  subtitle?: string;
  tabs?: DashboardTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  stats?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  loading?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function DashboardLayout({
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  stats,
  actions,
  children,
  loading = false,
  className,
  headerClassName,
  contentClassName,
}: DashboardLayoutProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className={cn('', headerClassName)}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>

      {/* Stats Grid */}
      {stats && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {stats}
        </motion.div>
      )}

      {/* Tabs */}
      {tabs && tabs.length > 0 && (
        <div className="border-b border-gray-200">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange?.(tab.id)}
                className={cn(
                  'py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2',
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={cn('relative', contentClassName)}
      >
        {loading && (
          <div className="absolute inset-0 bg-white/50 rounded-lg flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-gray-600">Loading...</span>
            </div>
          </div>
        )}
        {children}
      </motion.div>
    </div>
  );
}

export default DashboardLayout;
