/**
 * User role definitions and role-based access control constants
 */

export const USER_ROLES = {
  JOB_SEEKER: 'job_seeker',
  COMPANY: 'company',
  ADMIN: 'admin',
} as const;

export type UserRoleType = typeof USER_ROLES[keyof typeof USER_ROLES];

export const ROLE_LABELS: Record<UserRoleType, string> = {
  job_seeker: 'Job Seeker',
  company: 'Company',
  admin: 'Administrator',
};

export const ROLE_DESCRIPTIONS: Record<UserRoleType, string> = {
  job_seeker: 'Browse and apply for jobs, manage your profile and skills',
  company: 'Post jobs, browse talent, manage applications',
  admin: 'Manage all platform content and users',
};

/**
 * Role-based access control matrix
 * Define what features each role can access
 */
export const RBAC = {
  job_seeker: {
    canViewJobs: true,
    canApplyJobs: true,
    canViewProfile: true,
    canEditProfile: true,
    canViewDashboard: true,
    canPostJobs: false,
    canManageCompany: false,
    canAccessAdmin: false,
  },
  company: {
    canViewJobs: false,
    canApplyJobs: false,
    canViewProfile: true,
    canEditProfile: false,
    canViewDashboard: true,
    canPostJobs: true,
    canManageCompany: true,
    canAccessAdmin: false,
  },
  admin: {
    canViewJobs: true,
    canApplyJobs: false,
    canViewProfile: true,
    canEditProfile: true,
    canViewDashboard: true,
    canPostJobs: false,
    canManageCompany: true,
    canAccessAdmin: true,
  },
} as const;

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRoleType, permission: keyof typeof RBAC.job_seeker): boolean {
  return RBAC[role][permission] || false;
}

/**
 * Check if a user role can access a specific feature
 */
export function canAccess(role: UserRoleType, feature: string): boolean {
  const featurePermissionMap: Record<string, keyof typeof RBAC.job_seeker> = {
    jobs: 'canViewJobs',
    apply: 'canApplyJobs',
    profile: 'canViewProfile',
    editProfile: 'canEditProfile',
    dashboard: 'canViewDashboard',
    postJob: 'canPostJobs',
    company: 'canManageCompany',
    admin: 'canAccessAdmin',
  };

  const permission = featurePermissionMap[feature];
  return permission ? hasPermission(role, permission) : false;
}
