# Unified Dashboard Refactoring Plan

**Objective**: Consolidate all feature pages into unified dashboard pages with tab-based navigation (like Education Dashboard).

**Current Status**: Multiple separate routes for each feature  
**Target Status**: Consolidated dashboard routes with tab navigation

---

## Current Architecture (Fragmented)

### Education Feature (Current - Correct Pattern ✅)
```
Routes:
  /education → EducationDashboard (with tabs for Overview/Courses/Achievements)
  /education/courses → CoursePage (separate page)
  /education/certificates → CertificatePage (separate page)
  /education/settings → SettingsPage (separate page)

Problem: Some features still have separate routes
Solution: Move everything to tabbed dashboard
```

### ForTalent Feature (Current - Fragmented ❌)
```
Routes:
  /forTalent → ForTalentPage (landing, not dashboard)
  /talent/profile → TalentProfile (separate page)
  /talent/skills → TalentSkills (separate page)

Problem: No unified dashboard, multiple routes
Solution: Create unified TalentDashboard with tabs
```

### Company Feature (Current - Fragmented ❌)
```
Routes:
  /company/dashboard → CompanyDashboardPage (exists but needs consolidation)
  /company/jobs → CompanyJobManagement (separate page)
  /company/talent → CompanyTalentSearch (separate page)
  /company/talent-groups → CompanyTalentGroup (separate page)
  /company/advertisements → ProductAdvertisement (separate page)

Problem: Multiple routes, not unified
Solution: Create unified CompanyDashboard with tabs
```

### Jobs Feature (Current - Fragmented ❌)
```
Routes:
  /jobs/engineering → EngineeringJobs
  /jobs/finance → FinanceJobs
  /jobs/tech → TechJobs
  /jobs/:id → JobDetailPage

Problem: Multiple category routes
Solution: Unified JobsPage with category tabs
```

---

## Target Architecture (Unified)

### 1. ForTalent Dashboard
**Route**: `/dashboard/talent`
**Component**: `src/pages/ForTalentDashboardPage.tsx` (refactored)

```typescript
Tabs:
├─ Overview
├─ Profile
├─ Skills
├─ Experience
└─ Applications
```

**Components to Merge**:
- `src/components/forTalent/profile/index.tsx`
- `src/components/forTalent/skill/index.tsx`
- Talent profile components

**New File**: `src/pages/ForTalentDashboardPage.tsx`

---

### 2. Company Dashboard
**Route**: `/dashboard/company`
**Component**: `src/pages/CompanyDashboardPage.tsx` (refactored)

```typescript
Tabs:
├─ Overview
├─ Job Listings
├─ Talent Search
├─ Talent Groups
├─ Advertisements
└─ Applications
```

**Components to Merge**:
- `src/components/forcompany/job/index.tsx`
- `src/components/forcompany/selfall/index.tsx`
- `src/components/forcompany/Talentgroup/index.tsx`
- `src/components/forcompany/productadvit/index.tsx`

**Updates**: `src/pages/CompanyDashboardPage.tsx`

---

### 3. Education Dashboard
**Route**: `/dashboard/education` (consolidate from /education)
**Component**: `src/components/Education/dashboard.tsx` (already unified ✅)

```typescript
Tabs:
├─ Overview
├─ My Courses
└─ Achievements
```

**Components Already Merged**:
- Courses, Certificates, Settings as sub-tabs

**Status**: Already follows the pattern correctly!

---

### 4. Jobs Dashboard
**Route**: `/dashboard/jobs`
**Component**: `src/pages/JobsPage.tsx` (new)

```typescript
Tabs:
├─ All Jobs (with search/filter)
├─ Engineering
├─ Finance
├─ Tech
└─ My Applications
```

**Components to Merge**:
- `src/components/jobs/engineering/index.tsx`
- `src/components/jobs/finance/index.tsx`
- `src/components/jobs/tech/index.tsx`

**Updates**: New unified jobs page with tab navigation

---

## Refactoring Steps

### Phase 1: ForTalent Dashboard Consolidation

**Step 1.1: Create Unified ForTalent Dashboard**
```
File: src/pages/ForTalentDashboardPage.tsx
Logic:
  - Combine TalentProfile + TalentSkills into one page
  - Add tab navigation (Overview, Profile, Skills, Experience, Applications)
  - Use same pattern as Education Dashboard
```

**Step 1.2: Update Routes**
```typescript
// OLD
Route path="/talent/profile" → TalentProfile
Route path="/talent/skills" → TalentSkills

// NEW
Route path="/dashboard/talent" → ForTalentDashboardPage
```

**Step 1.3: Update Navigation Links**
- Update navbar/sidebar links to point to `/dashboard/talent`
- Remove individual links to `/talent/profile` and `/talent/skills`

---

### Phase 2: Company Dashboard Consolidation

**Step 2.1: Refactor CompanyDashboardPage**
```
File: src/pages/CompanyDashboardPage.tsx (update)
Logic:
  - Merge all company sub-pages into tabs
  - Create tab structure (Overview, Jobs, Talent, Groups, Ads, Applications)
  - Keep existing dashboard data
```

**Step 2.2: Update Routes**
```typescript
// OLD
Route path="/company/dashboard" → CompanyDashboardPage
Route path="/company/jobs" → CompanyJobManagement
Route path="/company/talent" → CompanyTalentSearch
Route path="/company/talent-groups" → CompanyTalentGroup
Route path="/company/advertisements" → ProductAdvertisement

// NEW
Route path="/dashboard/company" → CompanyDashboardPage (with tabs)
```

**Step 2.3: Update Navigation**
- Update all company section links to `/dashboard/company?tab=jobs`, `/dashboard/company?tab=talent`, etc.

---

### Phase 3: Education Dashboard Consolidation

**Step 3.1: Consolidate Routes**
```typescript
// CURRENT (partially consolidated)
Route path="/education" → EducationDashboard (has some tabs)
Route path="/education/courses" → CoursePage (separate)
Route path="/education/certificates" → CertificatePage (separate)
Route path="/education/settings" → SettingsPage (separate)

// TARGET (fully consolidated)
Route path="/dashboard/education" → EducationDashboard (all in tabs)
```

**Step 3.2: Move all education sections to tabs in main dashboard**

---

### Phase 4: Jobs Dashboard Creation

**Step 4.1: Create Unified Jobs Page**
```
File: src/pages/JobsPage.tsx (new)
Logic:
  - Create tab navigation for job categories
  - Merge EngineeringJobs, FinanceJobs, TechJobs
  - Add "All Jobs" tab with search/filter
  - Add "My Applications" tab
```

**Step 4.2: Update Routes**
```typescript
// OLD
Route path="/jobs/engineering" → EngineeringJobs
Route path="/jobs/finance" → FinanceJobs
Route path="/jobs/tech" → TechJobs
Route path="/jobs/:id" → JobDetailPage

// NEW
Route path="/dashboard/jobs" → JobsPage (with category tabs)
Route path="/jobs/:id" → JobDetailPage (keep for detail view)
```

---

## Implementation Pattern (Use Education Dashboard as Template)

### Template Code Structure
```typescript
// File: src/pages/UnifiedDashboard.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";

type TabType = "overview" | "section1" | "section2" | "section3";

export default function UnifiedDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  
  const tabs = [
    { id: "overview", label: "Overview", icon: <Icon /> },
    { id: "section1", label: "Section 1", icon: <Icon /> },
    { id: "section2", label: "Section 2", icon: <Icon /> },
    { id: "section3", label: "Section 3", icon: <Icon /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <HeaderSection />

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border/40 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "section1" && <Section1Tab />}
      {activeTab === "section2" && <Section2Tab />}
      {activeTab === "section3" && <Section3Tab />}
    </div>
  );
}
```

---

## Benefits of Unified Dashboard Approach

| Aspect | Before | After |
|--------|--------|-------|
| **Navigation** | Multiple routes, user confusion | Single unified dashboard |
| **State Management** | Separate states per page | Centralized dashboard state |
| **Code Duplication** | Repeated header/layout code | Shared dashboard layout |
| **User Experience** | Click-redirect, page reload | Smooth tab switching |
| **Performance** | Multiple component mounts | Single mount, fast switching |
| **Consistency** | Inconsistent patterns | Unified pattern across all features |

---

## URL Structure

### Current (Problematic)
```
/forTalent → Landing page
/talent/profile → Profile page
/talent/skills → Skills page
/education → Dashboard
/education/courses → Courses page
/company/dashboard → Company dashboard
/company/jobs → Jobs page
```

### Target (Clean & Unified)
```
/dashboard/talent → Unified talent dashboard (tabs: overview, profile, skills, etc.)
/dashboard/education → Unified education dashboard (tabs: overview, courses, achievements)
/dashboard/company → Unified company dashboard (tabs: overview, jobs, talent, etc.)
/dashboard/jobs → Unified jobs dashboard (tabs: all, engineering, finance, tech, my-apps)
```

---

## Migration Checklist

### Phase 1: ForTalent
- [ ] Create `src/pages/ForTalentDashboardPage.tsx`
- [ ] Extract components into tabs
- [ ] Implement tab state management
- [ ] Update routes in App.tsx
- [ ] Update navbar/sidebar links
- [ ] Test tab switching
- [ ] Verify no broken links
- [ ] Update URL references in components

### Phase 2: Company
- [ ] Refactor `src/pages/CompanyDashboardPage.tsx`
- [ ] Add tab navigation for sub-sections
- [ ] Merge job, talent, group, ad components
- [ ] Update routes in App.tsx
- [ ] Update navigation links
- [ ] Test all tabs
- [ ] Verify data persistence between tabs

### Phase 3: Education
- [ ] Move `/education/*` routes to `/dashboard/education`
- [ ] Consolidate all education sub-pages into dashboard tabs
- [ ] Update routes
- [ ] Update navigation links

### Phase 4: Jobs
- [ ] Create `src/pages/JobsPage.tsx`
- [ ] Implement category tabs
- [ ] Merge job category components
- [ ] Update routes
- [ ] Keep job detail page separate
- [ ] Update navigation

---

## Code Examples

### Example 1: ForTalent Dashboard with Tabs
```typescript
// src/pages/ForTalentDashboardPage.tsx
export default function ForTalentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8">
        <button onClick={() => setActiveTab("overview")}>Overview</button>
        <button onClick={() => setActiveTab("profile")}>Profile</button>
        <button onClick={() => setActiveTab("skills")}>Skills</button>
        <button onClick={() => setActiveTab("experience")}>Experience</button>
        <button onClick={() => setActiveTab("applications")}>Applications</button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <TalentOverview />}
      {activeTab === "profile" && <TalentProfile />}
      {activeTab === "skills" && <TalentSkills />}
      {activeTab === "experience" && <TalentExperience />}
      {activeTab === "applications" && <TalentApplications />}
    </div>
  );
}
```

### Example 2: Updated Routes
```typescript
// src/App.tsx
<Switch>
  {/* Old fragmented routes - REMOVE */}
  {/* Route path="/talent/profile" component={TalentProfile} /> */}
  {/* Route path="/talent/skills" component={TalentSkills} /> */}

  {/* New unified routes - ADD */}
  <Route path="/dashboard/talent" component={ForTalentDashboardPage} />
  <Route path="/dashboard/education" component={EducationDashboard} />
  <Route path="/dashboard/company" component={CompanyDashboardPage} />
  <Route path="/dashboard/jobs" component={JobsPage} />
</Switch>
```

---

## Timeline Estimate

- **Phase 1 (ForTalent)**: 2-3 hours
- **Phase 2 (Company)**: 2-3 hours
- **Phase 3 (Education)**: 1 hour
- **Phase 4 (Jobs)**: 2-3 hours
- **Testing & Cleanup**: 1-2 hours

**Total**: ~10-15 hours for full refactoring

---

## Success Metrics

After implementing unified dashboards:
- ✅ Single route per feature area
- ✅ Tab-based navigation within each dashboard
- ✅ Smooth transition between tabs (no page reload)
- ✅ All data accessible from one page
- ✅ Reduced duplicate code (~200+ LOC saved)
- ✅ Better UX with consistent patterns

---

## Next Steps

1. **Read** this entire plan
2. **Choose** which phase to start with (recommend starting with ForTalent)
3. **Create** new dashboard file based on Education Dashboard pattern
4. **Extract** components into tab content areas
5. **Update** routes in App.tsx
6. **Test** thoroughly before moving to next phase

---

**Start with Phase 1: ForTalent Dashboard** - It's the simplest and will establish the pattern for other dashboards.

Would you like me to proceed with implementing Phase 1 (ForTalent Dashboard refactoring)?
