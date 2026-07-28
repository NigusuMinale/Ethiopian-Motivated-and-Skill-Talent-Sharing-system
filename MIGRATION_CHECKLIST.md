# Component Migration Checklist

## Overview
Track all components that need to be migrated to use shared components from Phase 1, and unified dashboard refactoring (Phase 1.5).

**Legend**:
- ✅ Complete
- 🔄 In Progress
- ⏳ Not Started
- 🚫 Low Priority

---

## Unified Dashboard Refactoring (NEW - Phase 1.5)

### ✅ Phase 1: ForTalent Dashboard
- **File**: `src/pages/ForTalentDashboardPage.tsx`
- **Status**: ✅ COMPLETE (July 27, 2026)
- **What Was Done**: 
  - Consolidated `forTalent/profile/index.tsx` into Profile tab
  - Consolidated `forTalent/skill/index.tsx` into Skills tab
  - Added Overview, Experience, Applications tabs
  - Created single `/dashboard/talent` route
- **Lines Saved**: ~730 LOC (two separate pages → one unified dashboard)
- **User Impact**: 🟢 Instant tab switching, no page reloads, unified URL

### ✅ Phase 2: Company Dashboard
- **File**: `src/pages/CompanyDashboardPage.tsx`
- **Status**: ✅ COMPLETE (July 27, 2026)
- **Components Merged**:
  - `forcompany/job/index.tsx` → Jobs tab ✅
  - `forcompany/selfall/index.tsx` → Talent Search tab ✅
  - `forcompany/Talentgroup/index.tsx` → Groups tab ✅
  - `forcompany/productadvit/index.tsx` → Ads tab ✅
- **Target Route**: `/dashboard/company` ✅
- **Effort Used**: 1-2 hours
- **Lines Saved**: ~780 LOC (4 components → 1 dashboard)
- **Priority**: HIGH ✅ DONE

### ✅ Phase 3: Education Dashboard
- **File**: `src/components/Education/dashboard.tsx`
- **Status**: ✅ COMPLETE (July 27, 2026)
- **Work Completed**: Added `/dashboard/education` route ✅
- **Target Route**: `/dashboard/education` ✅
- **Also Works**: `/education` (backward compatible)
- **Tabs**: Overview, Courses, Achievements ✅
- **Effort Used**: <30 minutes (route consolidation)
- **Priority**: MEDIUM ✅ DONE

### ⏳ Phase 4: Jobs Dashboard
- **File**: `src/pages/JobsPage.tsx`
- **Status**: ⏳ READY TO START
- **Components to Merge**:
  - `jobs/engineering/index.tsx` → Engineering tab
  - `jobs/finance/index.tsx` → Finance tab
  - `jobs/tech/index.tsx` → Tech tab
- **Target Route**: `/dashboard/jobs`
- **Estimated Effort**: 2-3 hours
- **Priority**: MEDIUM

---

## StatCard Candidates (4x Stat Card Patterns)

### Priority 1: Dashboard Components

#### ✅ CompanyJobManagement
- **File**: `src/components/forcompany/job/index.tsx`
- **Status**: ✅ COMPLETE
- **StatCards**: 4 (Total Jobs, Active, Applicants, Views)
- **Additional**: Replaced SearchFilter + 2 FormModals
- **Lines Saved**: ~150
- **Completed**: July 26, 2026

#### ⏳ EducationDashboard
- **File**: `src/components/Education/dashboard.tsx`
- **Status**: ⏳ NOT STARTED
- **StatCards**: 4 (Enrolled, Completed, Hours, Certificates)
- **Additional**: FormModal candidates in achievements section
- **Lines Estimated**: ~140
- **Difficulty**: 🟡 Medium (references undefined mockData variables)
- **Priority**: HIGH

#### ⏳ CompanyDashboard
- **File**: `src/components/forcompany/dashboard.tsx`
- **Status**: ⏳ NOT STARTED
- **StatCards**: 3-5 (needs inspection)
- **Additional**: Likely FormModal + SearchFilter
- **Difficulty**: 🟡 Medium
- **Priority**: HIGH

#### ⏳ TalentProfileDashboard
- **File**: `src/components/Profile/index.tsx`
- **Status**: ⏳ NOT STARTED
- **StatCards**: 2-3 (Profile stats)
- **Additional**: FormModal for profile updates
- **Difficulty**: 🟡 Medium
- **Priority**: MEDIUM

### Priority 2: Landing Page

#### ⏳ LandingPage Features Section
- **File**: `src/components/LandingPage/Features.tsx`
- **Status**: ⏳ NOT STARTED
- **Cards**: 6-8 feature cards (StatCard-like)
- **Difficulty**: 🟢 Easy (simple card pattern)
- **Priority**: MEDIUM
- **Estimated Savings**: ~100 LOC

#### ⏳ LandingPage Stats Section
- **File**: `src/components/LandingPage/Stats.tsx`
- **Status**: ⏳ NOT STARTED
- **StatCards**: 4-6 (company stats)
- **Difficulty**: 🟢 Easy
- **Priority**: MEDIUM
- **Estimated Savings**: ~120 LOC

---

## FormModal Candidates (Modal Patterns)

### Priority 1

#### ✅ CompanyJobManagement (Embedded)
- **File**: `src/components/forcompany/job/index.tsx`
- **Status**: ✅ COMPLETE
- **Modals**: 2 (Create Job, View Job Details)
- **Completed**: July 26, 2026

#### ⏳ EducationDashboard (Embedded)
- **File**: `src/components/Education/dashboard.tsx`
- **Status**: ⏳ NOT STARTED
- **Modals**: 2-3 (Course details, Achievement info)
- **Integrated With**: StatCard migration

#### ⏳ CourseForm
- **File**: `src/components/Education/course.tsx`
- **Status**: ⏳ NOT STARTED
- **Modals**: 1 (Add/Edit course)
- **Priority**: HIGH
- **Estimated Savings**: ~80 LOC

#### ⏳ CertificateForm
- **File**: `src/components/Education/certificate.tsx`
- **Status**: ⏳ NOT STARTED
- **Modals**: 1 (Add/Edit certificate)
- **Priority**: HIGH
- **Estimated Savings**: ~75 LOC

### Priority 2

#### ⏳ SkillsManager
- **File**: `src/components/Profile/SkillsManager.tsx`
- **Status**: ⏳ NOT STARTED
- **Modals**: 1-2 (Add skill, Confirm delete)
- **Priority**: MEDIUM
- **Estimated Savings**: ~90 LOC

#### ⏳ ExperienceForm
- **File**: `src/components/Profile/ExperienceForm.tsx`
- **Status**: ⏳ NOT STARTED
- **Modals**: 1 (Add/Edit experience)
- **Priority**: MEDIUM
- **Estimated Savings**: ~85 LOC

---

## SearchFilter Candidates

### Priority 1

#### ✅ CompanyJobManagement
- **File**: `src/components/forcompany/job/index.tsx`
- **Status**: ✅ COMPLETE
- **Pattern**: Search + 4-option filter (Status)
- **Completed**: July 26, 2026

#### ⏳ JobsPage
- **File**: `src/components/JobsPage/index.tsx`
- **Status**: ⏳ NOT STARTED
- **Pattern**: Search + multi-filter (Category, Type, Salary)
- **Priority**: HIGH
- **Estimated Savings**: ~110 LOC

#### ⏳ TalentSearchPage
- **File**: `src/components/TalentSearch/index.tsx`
- **Status**: ⏳ NOT STARTED
- **Pattern**: Search + skill filters
- **Priority**: HIGH
- **Estimated Savings**: ~100 LOC

### Priority 2

#### ⏳ EducationCourseSearch
- **File**: `src/components/Education/course.tsx`
- **Status**: ⏳ NOT STARTED
- **Pattern**: Search + category filter
- **Priority**: MEDIUM
- **Estimated Savings**: ~70 LOC

#### ⏳ CompanySearch
- **File**: `src/components/forcompany/CompanySearch.tsx`
- **Status**: ⏳ NOT STARTED
- **Pattern**: Search + industry filter
- **Priority**: MEDIUM
- **Estimated Savings**: ~60 LOC

---

## ListRow Candidates (Table/List Patterns)

### Priority 1

#### ⏳ ApplicantsList
- **File**: `src/components/forcompany/ApplicantsList.tsx`
- **Status**: ⏳ NOT STARTED
- **Pattern**: 4 ListRow instances (applicant list)
- **Priority**: HIGH
- **Estimated Savings**: ~150 LOC

#### ⏳ CoursesList
- **File**: `src/components/Education/course.tsx`
- **Status**: ⏳ NOT STARTED
- **Pattern**: 3-5 ListRow instances
- **Priority**: MEDIUM
- **Estimated Savings**: ~140 LOC

### Priority 2

#### ⏳ TalentList
- **File**: `src/components/TalentSearch/TalentList.tsx`
- **Status**: ⏳ NOT STARTED
- **Pattern**: 5-10 ListRow instances
- **Priority**: MEDIUM
- **Estimated Savings**: ~200 LOC

#### ⏳ JobsList
- **File**: `src/components/JobsPage/JobsList.tsx`
- **Status**: ⏳ NOT STARTED
- **Pattern**: 3-8 ListRow instances
- **Priority**: MEDIUM
- **Estimated Savings**: ~180 LOC

---

## DashboardLayout Candidates

### Priority 1

#### ⏳ CompanyDashboard
- **File**: `src/components/forcompany/dashboard.tsx`
- **Status**: ⏳ NOT STARTED
- **Pattern**: Dashboard wrapper with header, stats, tabs
- **Priority**: HIGH
- **Estimated Savings**: ~120 LOC

#### ⏳ EducationDashboard
- **File**: `src/components/Education/dashboard.tsx`
- **Status**: ⏳ NOT STARTED
- **Pattern**: Dashboard wrapper with tabs
- **Integrated With**: StatCard + FormModal migration

### Priority 2

#### ⏳ TalentProfileDashboard
- **File**: `src/components/Profile/index.tsx`
- **Status**: ⏳ NOT STARTED
- **Pattern**: Dashboard layout
- **Priority**: MEDIUM

---

## Summary by Status

### ✅ COMPLETE (1/30)
| Component | File | Pattern | Savings |
|-----------|------|---------|---------|
| CompanyJobManagement | `forcompany/job/index.tsx` | 4xStatCard + FormModal + SearchFilter | 150 LOC |
| | | | **150 LOC** |

### 🔄 IN PROGRESS (0/30)
None currently

### ⏳ NOT STARTED (29/30)

#### High Priority (Immediate)
| Component | File | Patterns | Estimated |
|-----------|------|----------|-----------|
| EducationDashboard | `Education/dashboard.tsx` | 4xStatCard + FormModal | 140 LOC |
| CompanyDashboard | `forcompany/dashboard.tsx` | 3xStatCard + FormModal | 130 LOC |
| JobsPage | `JobsPage/index.tsx` | SearchFilter + ListRow | 210 LOC |
| TalentSearchPage | `TalentSearch/index.tsx` | SearchFilter + ListRow | 200 LOC |
| ApplicantsList | `forcompany/ApplicantsList.tsx` | 4xListRow | 150 LOC |
| | | **SUBTOTAL** | **830 LOC** |

#### Medium Priority (Week 1)
| Component | File | Patterns | Estimated |
|-----------|------|----------|-----------|
| LandingPage Features | `LandingPage/Features.tsx` | 6-8xStatCard | 100 LOC |
| LandingPage Stats | `LandingPage/Stats.tsx` | 4xStatCard | 120 LOC |
| SkillsManager | `Profile/SkillsManager.tsx` | FormModal + SearchFilter | 90 LOC |
| CoursesList | `Education/course.tsx` | 3xListRow + FormModal | 140 LOC |
| CertificateForm | `Education/certificate.tsx` | FormModal | 75 LOC |
| EducationCourseSearch | `Education/course.tsx` | SearchFilter | 70 LOC |
| TalentList | `TalentSearch/TalentList.tsx` | 5-10xListRow | 200 LOC |
| ExperienceForm | `Profile/ExperienceForm.tsx` | FormModal | 85 LOC |
| JobsList | `JobsPage/JobsList.tsx` | 3-8xListRow | 180 LOC |
| | | **SUBTOTAL** | **1,060 LOC** |

#### Low Priority (Later)
| Component | File | Patterns | Estimated |
|-----------|------|----------|-----------|
| TalentProfileDashboard | `Profile/index.tsx` | DashboardLayout + StatCard | 150 LOC |
| CompanySearch | `forcompany/CompanySearch.tsx` | SearchFilter | 60 LOC |
| | | **SUBTOTAL** | **210 LOC** |

---

## Dependency Map

```
Phase 2 Migration Dependencies:

EducationDashboard (blocking for education feature)
  ├── Requires: StatCard, FormModal
  └── Depends on: Mock data fixes

CompanyDashboard (blocking for company feature)
  ├── Requires: StatCard, FormModal, DashboardLayout
  └── Depends on: API integration

JobsPage (core feature)
  ├── Requires: SearchFilter, ListRow
  └── Depends on: API integration

TalentSearchPage (core feature)
  ├── Requires: SearchFilter, ListRow
  └── Depends on: API integration

LandingPage (public feature)
  ├── Requires: StatCard
  └── Can proceed independently
```

---

## Estimated Timeline

### Week 1
- **Days 1-2**: EducationDashboard + CompanyDashboard
- **Days 2-3**: JobsPage + TalentSearchPage  
- **Days 3-4**: ApplicantsList + CoursesList
- **Day 4-5**: LandingPage components + SkillsManager

### Week 2
- **Days 1-2**: ExperienceForm + CertificateForm
- **Days 2-3**: TalentList + JobsList
- **Days 3-4**: Remaining low-priority components
- **Days 4-5**: Testing + documentation

### Total Estimated Savings: **2,100+ LOC**

---

## Quality Checklist

For each migration, verify:

- [ ] Component compiles without errors
- [ ] TypeScript diagnostics: PASS
- [ ] All unused imports removed
- [ ] Shared component props correctly applied
- [ ] Functionality preserved
- [ ] Visual appearance matches original
- [ ] Code review completed
- [ ] Tests updated/created
- [ ] Component size reduced by 20%+

---

## Migration Template

```typescript
// Step 1: Import shared components
import { StatCard, FormModal, SearchFilter } from "@/shared/components/common";
import type { FilterOption } from "@/shared/components/common/SearchFilter";

// Step 2: Replace inline patterns with components
// Before: <div className="...stat pattern...">
// After:  <StatCard ... />

// Step 3: Clean up unused imports
// Remove: Search, Filter, ChevronDown, etc.

// Step 4: Run diagnostics
// Terminal: npm run type-check

// Step 5: Test functionality
// Verify: Click handlers, modals, filters work

// Step 6: Commit changes
// Format: "refactor: migrate [Component] to use shared components"
```

---

## Notes

- Some components may have undefined mock data (e.g., `EducationDashboard`). These need to be fixed during migration.
- API integration should be completed before migration for components that fetch data.
- ListRow patterns may need custom adaptations based on data structure.
- SearchFilter debounce timing may need adjustment per use case (default: 300ms).

---

## References

- Phase 1 Components: `src/shared/components/common/`
- Shared Component Docs: `QUICK_REFERENCE.md`
- Enterprise Architecture: `ENTERPRISE_ARCHITECTURE.md`
- Refactoring Plan: `REFACTORING_PLAN.md`
