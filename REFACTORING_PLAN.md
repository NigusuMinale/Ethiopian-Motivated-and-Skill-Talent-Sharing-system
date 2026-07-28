# EMSTS Frontend - Enterprise Architecture Refactoring Plan

## Executive Summary
This document outlines the transformation of the EMSTS frontend from a feature-based structure with significant code duplication into an enterprise-grade, scalable architecture following clean code principles.

## Current State Analysis

### Code Duplication Issues (14+ instances)
1. **StatCard Component** - Reimplemented 14+ times
2. **Modal/Dialog Pattern** - 5+ duplicates
3. **Search + Filter Pattern** - 3+ duplicates
4. **Table/List Row Pattern** - 4+ duplicates
5. **Dashboard Wrapper** - 80% code reuse across 3 components

### Structural Issues
- UI layer mixed with business logic
- No clear separation of concerns
- Mock data scattered in components
- No shared type definitions
- Inconsistent error handling
- No constants/configuration layer

## Target Architecture (Enterprise Style)

```
src/
├── app/                          # App-level config & providers
│   ├── App.tsx                  # Main routing, providers
│   ├── routes.tsx               # Route definitions (centralized)
│   └── constants.ts             # App-wide constants
│
├── core/                        # Core business logic
│   ├── api/                     # API layer
│   │   ├── client.ts           # HTTP client
│   │   ├── endpoints/          # Organized endpoints
│   │   │   ├── auth.ts
│   │   │   ├── jobs.ts
│   │   │   ├── talent.ts
│   │   │   ├── education.ts
│   │   │   └── company.ts
│   │   └── hooks/              # React Query hooks
│   │       ├── useAuth.ts
│   │       ├── useJobs.ts
│   │       ├── useTalent.ts
│   │       └── useEducation.ts
│   │
│   ├── state/                  # Global state management
│   │   ├── auth/
│   │   │   ├── context.ts
│   │   │   ├── hooks.ts
│   │   │   └── types.ts
│   │   └── notifications/      # Toast notifications
│   │
│   ├── services/               # Business logic services
│   │   ├── jobService.ts
│   │   ├── talentService.ts
│   │   ├── authService.ts
│   │   └── educationService.ts
│   │
│   └── types/                  # Shared TypeScript interfaces
│       ├── api.ts             # API response types
│       ├── domain.ts          # Business domain types
│       ├── ui.ts              # UI-specific types
│       └── index.ts
│
├── features/                   # Feature modules (encapsulated)
│   ├── auth/                   # Authentication feature
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── AuthLayout.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── hooks/
│   │   │   └── useAuthForm.ts
│   │   └── index.ts           # Public exports
│   │
│   ├── jobs/                   # Jobs feature
│   │   ├── components/
│   │   │   ├── JobList.tsx
│   │   │   ├── JobCard.tsx
│   │   │   ├── JobFilter.tsx
│   │   │   ├── JobModal.tsx
│   │   │   ├── ApplicantsList.tsx
│   │   │   └── JobStats.tsx
│   │   ├── pages/
│   │   │   ├── JobsPage.tsx
│   │   │   ├── JobDetailPage.tsx
│   │   │   ├── CompanyJobsPage.tsx
│   │   │   ├── EngineeringJobsPage.tsx
│   │   │   ├── FinanceJobsPage.tsx
│   │   │   └── TechJobsPage.tsx
│   │   ├── hooks/
│   │   │   ├── useJobForm.ts
│   │   │   └── useJobFilters.ts
│   │   ├── services/
│   │   │   └── jobService.ts
│   │   ├── types/
│   │   │   └── job.types.ts
│   │   └── index.ts
│   │
│   ├── education/              # Education feature
│   │   ├── components/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CourseList.tsx
│   │   │   ├── CertificatesList.tsx
│   │   │   ├── EducationStats.tsx
│   │   │   └── EducationSettings.tsx
│   │   ├── pages/
│   │   │   ├── EducationPage.tsx
│   │   │   ├── CoursesPage.tsx
│   │   │   └── CertificatesPage.tsx
│   │   ├── hooks/
│   │   │   └── useEducationForm.ts
│   │   ├── types/
│   │   │   └── education.types.ts
│   │   └── index.ts
│   │
│   ├── talent/                 # Talent feature
│   │   ├── components/
│   │   │   ├── TalentProfile.tsx
│   │   │   ├── TalentSearch.tsx
│   │   │   ├── TalentCard.tsx
│   │   │   ├── SkillsManager.tsx
│   │   │   ├── ExperienceForm.tsx
│   │   │   └── EducationForm.tsx
│   │   ├── pages/
│   │   │   ├── TalentProfilePage.tsx
│   │   │   ├── TalentSearchPage.tsx
│   │   │   └── SkillsPage.tsx
│   │   ├── hooks/
│   │   │   └── useProfileForm.ts
│   │   ├── types/
│   │   │   └── talent.types.ts
│   │   └── index.ts
│   │
│   ├── company/                # Company feature
│   │   ├── components/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── TalentGroup.tsx
│   │   │   ├── ProductAd.tsx
│   │   │   └── CompanyStats.tsx
│   │   ├── pages/
│   │   │   ├── CompanyDashboardPage.tsx
│   │   │   ├── TalentGroupsPage.tsx
│   │   │   └── AdvertisementsPage.tsx
│   │   ├── types/
│   │   │   └── company.types.ts
│   │   └── index.ts
│   │
│   └── landing/                # Landing page feature
│       ├── components/
│       │   ├── Navbar.tsx
│       │   ├── Hero.tsx
│       │   ├── Features.tsx
│       │   ├── ForTalent.tsx
│       │   ├── ForCompanies.tsx
│       │   ├── JobsShowcase.tsx
│       │   ├── About.tsx
│       │   └── Contact.tsx
│       ├── pages/
│       │   └── LandingPage.tsx
│       ├── hooks/
│       │   └── useContactForm.ts
│       ├── types/
│       │   └── landing.types.ts
│       └── index.ts
│
├── shared/                     # Reusable across features
│   ├── components/
│   │   ├── common/            # Generic components
│   │   │   ├── StatCard.tsx       # ★ EXTRACTED
│   │   │   ├── FormModal.tsx       # ★ EXTRACTED
│   │   │   ├── SearchFilter.tsx    # ★ EXTRACTED
│   │   │   ├── ListRow.tsx         # ★ EXTRACTED
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── Pagination.tsx
│   │   │   └── Tabs.tsx
│   │   │
│   │   ├── layouts/           # Layout components
│   │   │   ├── MainLayout.tsx
│   │   │   ├── AuthLayout.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   └── PageContainer.tsx
│   │   │
│   │   ├── forms/             # Form components
│   │   │   ├── FormField.tsx
│   │   │   ├── FormActions.tsx
│   │   │   ├── PasswordInput.tsx
│   │   │   └── DatePicker.tsx
│   │   │
│   │   └── ui/               # Radix UI wrappers (existing)
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       └── ... (60+ other Radix components)
│   │
│   ├── hooks/                # Shared hooks
│   │   ├── useAsync.ts       # Generic async handler
│   │   ├── useForm.ts        # Form state management
│   │   ├── useLocalStorage.ts
│   │   ├── useMobile.ts      # (existing)
│   │   ├── useToast.ts       # (existing)
│   │   ├── useDebounce.ts
│   │   ├── useThrottle.ts
│   │   ├── useMediaQuery.ts
│   │   └── useClickOutside.ts
│   │
│   ├── utils/                # Utility functions
│   │   ├── cn.ts            # Class name merger
│   │   ├── formatters.ts    # Date, number, string formatting
│   │   ├── validators.ts    # Validation logic
│   │   ├── constants.ts     # Shared constants
│   │   ├── errors.ts        # Error handling utilities
│   │   └── api-helpers.ts   # API-related utilities
│   │
│   ├── constants/            # Shared constants
│   │   ├── api.ts           # API URLs, timeout constants
│   │   ├── status.ts        # Status enums/constants
│   │   ├── roles.ts         # User roles
│   │   ├── validations.ts   # Regex patterns, rules
│   │   └── messages.ts      # User-facing messages
│   │
│   └── styles/              # Shared styles
│       ├── animations.css   # Reusable animations
│       ├── variables.css    # CSS variables
│       └── utilities.css    # Utility classes
│
├── index.css               # Global styles
├── main.tsx               # Entry point
└── vite-env.d.ts         # Vite types

```

## Phase 1: Extract Reusable Components (Week 1)

### 1.1 StatCard Component
**Location**: `src/shared/components/common/StatCard.tsx`
**Removes 14 duplicates from**:
- dashboard.tsx, job/index.tsx, CompanyDashboard, etc.

```typescript
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  trend?: { value: number; isUp: boolean };
  onClick?: () => void;
}
```

### 1.2 FormModal Component
**Location**: `src/shared/components/common/FormModal.tsx`
**Removes 5+ duplicates from**:
- job/index.tsx, Education forms, etc.

```typescript
interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  onSubmit: (data: any) => Promise<void>;
  loading?: boolean;
  children: React.ReactNode;
}
```

### 1.3 SearchFilter Component
**Location**: `src/shared/components/common/SearchFilter.tsx`
**Removes 3+ duplicates from**:
- job/index.tsx, selfall/index.tsx, profile/index.tsx

```typescript
interface SearchFilterProps {
  searchPlaceholder: string;
  onSearch: (value: string) => void;
  filters: FilterOption[];
  onFilterChange: (filterId: string, value: string) => void;
  loading?: boolean;
}
```

### 1.4 ListRow Component
**Location**: `src/shared/components/common/ListRow.tsx`
**Removes 4+ duplicates**:
- Standardizes table row rendering pattern

```typescript
interface ListRowProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  badges?: Badge[];
  actions?: Action[];
  onClick?: () => void;
  expandable?: boolean;
}
```

## Phase 2: Organize API Layer (Week 1)

### 2.1 Separate API Endpoints
Move from single `api.ts` to organized structure:
- `src/core/api/endpoints/auth.ts`
- `src/core/api/endpoints/jobs.ts`
- `src/core/api/endpoints/talent.ts`
- `src/core/api/endpoints/education.ts`
- `src/core/api/endpoints/company.ts`

### 2.2 React Query Hooks
Create hooks for each feature:
- `src/core/api/hooks/useAuth.ts`
- `src/core/api/hooks/useJobs.ts`
- `src/core/api/hooks/useTalent.ts`
- `src/core/api/hooks/useEducation.ts`

## Phase 3: Create Feature Modules (Week 2)

Each feature follows this pattern:
```
feature/
├── components/    # UI components (feature-specific)
├── pages/         # Page components
├── hooks/         # Feature-specific hooks
├── services/      # Business logic
├── types/         # Feature-specific types
└── index.ts       # Public API
```

### 3.1 Auth Feature Module
### 3.2 Jobs Feature Module
### 3.3 Education Feature Module
### 3.4 Talent Feature Module
### 3.5 Company Feature Module
### 3.6 Landing Feature Module

## Phase 4: Create Shared Services (Week 2)

- **jobService.ts**: Business logic for job operations
- **talentService.ts**: Talent profile operations
- **authService.ts**: Authentication operations
- **educationService.ts**: Education operations

## Phase 5: Type Definition Consolidation (Week 1)

Create centralized types:
- `src/core/types/api.ts` - API response types
- `src/core/types/domain.ts` - Business domain types
- `src/core/types/ui.ts` - UI component types
- Feature-specific types in `features/*/types/`

## Phase 6: Constants & Configuration (Week 1)

- `src/app/constants.ts` - App-wide constants
- `src/shared/constants/api.ts` - API URLs, timeouts
- `src/shared/constants/status.ts` - Status enums
- `src/shared/constants/roles.ts` - User roles
- `src/shared/constants/validations.ts` - Regex patterns

## Implementation Strategy

### Step 1: Create Base Infrastructure (No breaking changes)
1. Create `src/shared/` directory structure
2. Create `src/core/` directory structure
3. Keep existing code intact

### Step 2: Extract Components (One by one)
1. Create StatCard.tsx in shared
2. Update job/index.tsx to use StatCard
3. Update dashboard.tsx to use StatCard
4. Repeat for FormModal, SearchFilter, ListRow

### Step 3: Refactor API Layer
1. Create separate endpoint files
2. Create React Query hooks
3. Update components to use hooks

### Step 4: Create Feature Modules
1. Move components to feature modules
2. Update imports
3. Create feature index.ts files

### Step 5: Cleanup
1. Remove duplicate code
2. Remove unused imports
3. Update routes
4. Test all functionality

## Benefits of This Architecture

1. **Maintainability**: Clear separation of concerns
2. **Scalability**: Easy to add new features
3. **Reusability**: Shared components and utilities
4. **Testability**: Isolated business logic
5. **Performance**: Better tree-shaking, code splitting
6. **Developer Experience**: Clear folder structure, predictable patterns
7. **Type Safety**: Centralized type definitions
8. **Error Handling**: Consistent error handling patterns
9. **Documentation**: Self-documenting folder structure
10. **CI/CD**: Easier to identify affected areas in changes

## Estimated Timeline

- **Phase 1-2**: 2-3 days (Critical duplicates & API)
- **Phase 3-4**: 3-4 days (Feature modules)
- **Phase 5-6**: 2 days (Types & constants)
- **Testing & Refinement**: 2 days
- **Total**: ~1.5-2 weeks for full migration

## Metrics

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Duplicate Components | 14+ | 0 | -100% |
| Avg Component Size (LOC) | 300-500 | 100-200 | ~65% reduction |
| Type Coverage | ~70% | ~95% | +25% |
| API Endpoint Consistency | 60% | 100% | +40% |
| Code Reuse Rate | 40% | 75% | +35% |

