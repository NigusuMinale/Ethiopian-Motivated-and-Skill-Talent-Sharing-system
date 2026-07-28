# Phase 2: Company Dashboard Consolidation - NEXT STEPS

**Previous Phase**: Phase 1 ForTalent Dashboard - ✅ COMPLETE  
**Current Phase**: Phase 2 Company Dashboard  
**Estimated Time**: 2-3 hours  

---

## What This Phase Does

Consolidates 4 separate company management pages into a single unified dashboard with tab navigation, just like Phase 1.

### Before (Fragmented)
```
/company/dashboard  → Overview page
/company/jobs       → Manage jobs (separate page load)
/company/talent     → Search talent (separate page load)
/company/talent-groups → Manage groups (separate page load)
/company/advertisements → Manage ads (separate page load)
```

### After (Unified)
```
/dashboard/company  → Unified dashboard with tabs:
                       ├─ Overview
                       ├─ Job Listings
                       ├─ Talent Search
                       ├─ Talent Groups
                       ├─ Advertisements
                       └─ Applications
```

---

## Implementation Plan

### Step 1: Consolidate Components

**Create new file**: `src/pages/CompanyDashboardPage.tsx`

**Base structure** (follow ForTalentDashboardPage pattern):
```typescript
type TabType = "overview" | "jobs" | "talent" | "groups" | "ads" | "applications";

export default function CompanyDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  
  // Merge these component states:
  // - CompanyJobManagement state/logic → Jobs tab
  // - CompanyTalentSearch state/logic → Talent tab
  // - CompanyTalentGroup state/logic → Groups tab
  // - ProductAdvertisement state/logic → Ads tab
  
  return (
    <div>
      {/* Tabs */}
      {/* Overview Tab */}
      {activeTab === "overview" && <OverviewSection />}
      
      {/* Jobs Tab - extract from CompanyJobManagement */}
      {activeTab === "jobs" && <JobsManagementSection />}
      
      {/* Talent Tab - extract from CompanyTalentSearch */}
      {activeTab === "talent" && <TalentSearchSection />}
      
      {/* Groups Tab - extract from CompanyTalentGroup */}
      {activeTab === "groups" && <TalentGroupsSection />}
      
      {/* Ads Tab - extract from ProductAdvertisement */}
      {activeTab === "ads" && <AdvertisementsSection />}
      
      {/* Applications Tab */}
      {activeTab === "applications" && <ApplicationsSection />}
    </div>
  );
}
```

### Step 2: Extract Tab Content

For each component being consolidated:

1. **Read** the component file
2. **Copy** the JSX/logic into appropriate tab section
3. **Update** state references (merge into single dashboard state)
4. **Adjust** styles if needed (should be consistent)
5. **Test** that tab content works

### Step 3: Update Routes in App.tsx

```typescript
// Add new route
<Route path="/dashboard/company" component={CompanyDashboardPage} />

// Keep old routes for backward compatibility
<Route path="/company/dashboard" component={CompanyDashboardPage} />
<Route path="/company/jobs" component={CompanyJobManagement} /> // deprecated
<Route path="/company/talent" component={CompanyTalentSearch} /> // deprecated
// etc...
```

### Step 4: Update Navigation

Update navbar/sidebar links from:
- `/company/jobs` → `/dashboard/company?tab=jobs`
- `/company/talent` → `/dashboard/company?tab=talent`
- etc.

---

## Components to Consolidate

### 1️⃣ CompanyJobManagement
**Source**: `src/components/forcompany/job/index.tsx`  
**Destination**: Jobs Tab in `CompanyDashboardPage`  
**Key Elements**:
- StatCards (already refactored with Phase 1)
- SearchFilter component (already using shared component)
- Job listing table/cards
- FormModal for creating jobs

**Expected Lines**: 150-200 LOC for tab section

### 2️⃣ CompanyTalentSearch  
**Source**: `src/components/forcompany/selfall/index.tsx`  
**Destination**: Talent Tab  
**Key Elements**:
- Talent search/filter functionality
- Talent cards
- Connection/hire actions

**Expected Lines**: 100-150 LOC for tab section

### 3️⃣ CompanyTalentGroup
**Source**: `src/components/forcompany/Talentgroup/index.tsx`  
**Destination**: Groups Tab  
**Key Elements**:
- Group management UI
- Group listings
- Add/edit group forms

**Expected Lines**: 80-120 LOC for tab section

### 4️⃣ ProductAdvertisement
**Source**: `src/components/forcompany/productadvit/index.tsx`  
**Destination**: Ads Tab  
**Key Elements**:
- Advertisement listings
- Ad creation/management
- Analytics (if available)

**Expected Lines**: 100-150 LOC for tab section

---

## Tab Details

### Overview Tab
```typescript
// Combined stats from all other tabs
- Active job listings (from Jobs tab)
- Pending applications (new)
- Total talent searches (from Talent tab)
- Active groups (from Groups tab)
- Active advertisements (from Ads tab)
- Recent activity timeline
- Quick action buttons for each section
```

### Jobs Tab
Take existing `CompanyJobManagement` JSX and logic directly.  
Should work as-is when placed inside tab conditional.

### Talent Tab
Take existing `CompanyTalentSearch` JSX and logic directly.  
May need minor adjustments for tab container.

### Groups Tab
Take existing `CompanyTalentGroup` JSX and logic directly.

### Ads Tab
Take existing `ProductAdvertisement` JSX and logic directly.

### Applications Tab
Placeholder for now - shows company applications across all jobs.

---

## Testing Checklist

- [ ] Navigate to `/dashboard/company` - displays dashboard
- [ ] All 6 tabs appear in tab navigation bar
- [ ] Click each tab - content changes smoothly
- [ ] Overview tab shows summary stats
- [ ] Jobs tab shows job management (same as before)
- [ ] Talent tab shows talent search (same as before)
- [ ] Groups tab shows group management (same as before)
- [ ] Ads tab shows advertisements (same as before)
- [ ] Applications tab placeholder appears
- [ ] Mobile responsive - tabs are scrollable on small screens
- [ ] Tab selection persists when switching between tabs
- [ ] Forms in each tab work properly
- [ ] Modal dialogs still appear correctly within tabs
- [ ] Old routes still work (backward compatibility):
  - `/company/dashboard`
  - `/company/jobs`
  - `/company/talent`
  - `/company/talent-groups`
  - `/company/advertisements`

---

## Code Quality Standards

✅ Must have:
- TypeScript with 0 errors
- No prop drilling (use context if needed)
- Consistent with ForTalentDashboardPage pattern
- Responsive on mobile/tablet/desktop
- Proper error handling and loading states
- Accessibility (semantic HTML, contrast ratios)

---

## Files to Modify

| File | Action |
|------|--------|
| `src/pages/CompanyDashboardPage.tsx` | CREATE/UPDATE |
| `src/App.tsx` | UPDATE routes |
| `src/components/forcompany/job/index.tsx` | Keep (for now) |
| `src/components/forcompany/selfall/index.tsx` | Keep (for now) |
| `src/components/forcompany/Talentgroup/index.tsx` | Keep (for now) |
| `src/components/forcompany/productadvit/index.tsx` | Keep (for now) |

---

## Before You Start

1. ✅ Read this guide
2. ✅ Review Phase 1 completion (ForTalentDashboardPage)
3. ✅ Examine each component file to understand structure
4. ✅ Plan which state goes where in unified dashboard
5. ✅ Consider shared context for company-wide state

---

## Quick Tips

1. **Copy-Paste Strategy**: Copy entire component content into tab sections first, then refactor
2. **State Management**: Move all 4 components' state into single dashboard component
3. **Styling**: Check that all margin/padding is consistent when merged
4. **TypeScript**: Define `type TabType` at top with all 6 tab IDs
5. **Testing**: Test each tab individually before moving to next phase

---

## After Phase 2

Once complete:
- Move to Phase 3: Education Dashboard consolidation (1 hour)
- Then Phase 4: Jobs Dashboard creation (2-3 hours)
- All pages will follow unified dashboard pattern
- Update documentation with new URL structure

---

## Questions?

Refer to:
- `UNIFIED_DASHBOARD_REFACTORING.md` - Comprehensive overview
- `PHASE_1_COMPLETION_SUMMARY.md` - Phase 1 implementation details
- `src/pages/ForTalentDashboardPage.tsx` - Working example to copy pattern from

---

**Status**: Ready to implement Phase 2  
**Next Command**: "Continue with Phase 2: Company Dashboard"
