# Quick Start: Phase 2 Component Migration

**Goal**: Migrate components to use reusable shared components from Phase 1.  
**Time per Component**: 15-30 minutes  
**Difficulty**: 🟢 Easy to 🟡 Medium

---

## 30-Second Overview

Instead of writing the same UI patterns repeatedly:
```typescript
// ❌ OLD WAY: Duplicate code in 10+ components
<div className="rounded-2xl border border-border/50 bg-card/60 p-5">
  <div className="flex items-center gap-3 mb-2">
    <div className="p-2 rounded-xl bg-primary/10 text-primary">
      <Icon size={18} />
    </div>
    <span className="text-xs text-muted-foreground uppercase">Label</span>
  </div>
  <p className="text-2xl font-black text-foreground">{value}</p>
</div>
```

Use a reusable component:
```typescript
// ✅ NEW WAY: Single import, easy to update globally
<StatCard icon={Icon} label="Label" value={value} color="blue" />
```

---

## The 3 Main Components to Use

### 1️⃣ StatCard - Display statistics

```typescript
import { StatCard } from "@/shared/components/common";
import { Users } from "lucide-react";

<StatCard
  icon={Users}                    // 👈 Pass icon class, not <Users />
  label="Active Users"
  value={1250}
  color="blue"                    // blue | green | purple | orange | red
  trend={{ value: 15, isUp: true }}
  onClick={() => navigate("/users")}
/>
```

**When to use**: Any time you display a metric with an icon and label.

### 2️⃣ FormModal - Modal dialogs

```typescript
import { FormModal } from "@/shared/components/common";

<FormModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Create Job"
  subtitle="Optional subtitle"
  onSubmit={async (data) => {
    await api.createJob(data);
    onClose();  // 👈 Don't forget to close!
  }}
>
  <input type="text" placeholder="Job title" />
  <textarea placeholder="Description" />
</FormModal>
```

**When to use**: Any modal that submits a form.

### 3️⃣ SearchFilter - Search + filters combined

```typescript
import { SearchFilter } from "@/shared/components/common";

<SearchFilter
  searchPlaceholder="Search jobs..."
  onSearch={(query) => setSearchQuery(query)}
  filters={[
    {
      id: "status",
      label: "Status",
      options: [
        { value: "active", label: "Active", count: 42 },
        { value: "draft", label: "Draft", count: 8 },
        { value: "closed", label: "Closed", count: 23 }
      ]
    }
  ]}
  onFilterChange={(filterId, value) => {
    console.log(`Filter ${filterId} changed to ${value}`);
  }}
/>
```

**When to use**: Any page with search + filter controls.

---

## Migration Checklist

Use this for each component you migrate:

### 1. Analyze Component
- [ ] Identify StatCard patterns (repeated stat displays)
- [ ] Identify FormModal patterns (inline modals)
- [ ] Identify SearchFilter patterns (search + filter UI)
- [ ] Note which shared component to use

### 2. Update Imports
```typescript
// Add these imports
import { StatCard, FormModal, SearchFilter } from "@/shared/components/common";

// Remove unused lucide icons
// ❌ Remove: Search, Filter, ChevronDown, MoreVertical, etc.
// ✅ Keep: Only icons used for content, not UI patterns
```

### 3. Replace Patterns
```typescript
// For each StatCard instance:
// 1. Find the div with "rounded-2xl border border-border/50"
// 2. Replace with: <StatCard icon={IconName} label="..." value={value} color="..." />

// For each modal:
// 1. Find the {showModal && (...)}
// 2. Replace with: <FormModal isOpen={showModal} onClose={...} title="...">

// For each search/filter section:
// 1. Find the manual <input /> + <button> pattern
// 2. Replace with: <SearchFilter ... />
```

### 4. Verify & Fix
```bash
# Check for errors
npm run type-check

# Check for console errors (dev mode)
npm run dev

# Visually verify component looks identical
# Click through all interactions (buttons, modals, filters)
```

### 5. Clean Up
- [ ] Remove unused imports
- [ ] Remove inline CSS that's now in shared component
- [ ] Update comments if needed
- [ ] Delete any leftover state/functions no longer used

### 6. Verify Metrics
- [ ] Component size reduced by 20%+
- [ ] No TypeScript errors
- [ ] Visually identical to before
- [ ] All functionality works

---

## Common Mistakes & Fixes

### ❌ Mistake 1: Passing icon instance instead of class
```typescript
// WRONG ❌
<StatCard icon={<Users size={18} />} ... />

// RIGHT ✅
<StatCard icon={Users} ... />
```

### ❌ Mistake 2: FormModal doesn't close after submit
```typescript
// WRONG ❌
<FormModal
  onSubmit={async (data) => {
    await api.save(data);
    // Forgot to close!
  }}
/>

// RIGHT ✅
<FormModal
  onSubmit={async (data) => {
    await api.save(data);
    onClose();  // ← Add this
  }}
/>
```

### ❌ Mistake 3: SearchFilter filter structure wrong
```typescript
// WRONG ❌ (FilterOption needs nested options array)
filters={[
  { id: "status", label: "Status" }
]}

// RIGHT ✅
filters={[
  {
    id: "status",
    label: "Status",
    options: [
      { value: "active", label: "Active" },
      { value: "draft", label: "Draft" }
    ]
  }
]}
```

### ❌ Mistake 4: Forgetting to handle filter changes
```typescript
// WRONG ❌ (Nothing happens when user clicks filter)
<SearchFilter
  filters={myFilters}
  // Missing onFilterChange!
/>

// RIGHT ✅
<SearchFilter
  filters={myFilters}
  onFilterChange={(filterId, value) => {
    setSelectedStatus(value);
  }}
/>
```

---

## Before & After Example

### Complete Migration: CompanyJobManagement

**BEFORE** (650 LOC):
```typescript
// Stat card 1
<div className="rounded-2xl border border-border/50 bg-card/60 p-5">
  <div className="flex items-center gap-3 mb-2">
    <div className="p-2 rounded-xl bg-primary/10 text-primary">
      <Briefcase size={18} />
    </div>
    <span className="text-xs text-muted-foreground uppercase">Total Jobs</span>
  </div>
  <p className="text-2xl font-black text-foreground">{stats.total}</p>
</div>

// Stat card 2
<div className="rounded-2xl border border-border/50 bg-card/60 p-5">
  <div className="flex items-center gap-3 mb-2">
    <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
      <CheckCircle2 size={18} />
    </div>
    <span className="text-xs text-muted-foreground uppercase">Active</span>
  </div>
  <p className="text-2xl font-black text-green-500">{stats.active}</p>
</div>

// ... 2 more stat cards (same pattern)

// Manual search + filter
<div className="relative flex-1">
  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
  <input
    type="text"
    placeholder="Search jobs..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-card/60..."
  />
</div>
<div className="flex gap-2">
  {(["all", "active", "draft", "closed"] as const).map((status) => (
    <button
      onClick={() => setStatusFilter(status)}
      className={`px-4 py-2 rounded-xl text-sm font-medium capitalize border...`}
    >
      {status}
    </button>
  ))}
</div>

// Manual modal
{showCreateModal && (
  <motion.div className="fixed inset-0 z-50...">
    <motion.div className="w-full max-w-2xl...">
      <div className="h-2 bg-gradient-to-r..." />
      <div className="p-8">
        <h2 className="text-xl font-black...">Post New Job</h2>
        <div className="space-y-4">
          {/* 50 lines of form fields */}
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={() => setShowCreateModal(false)}>Cancel</button>
          <button>Post Job</button>
        </div>
      </div>
    </motion.div>
  </motion.div>
)}
```

**AFTER** (500 LOC):
```typescript
// Import once at top
import { StatCard, FormModal, SearchFilter } from "@/shared/components/common";

// Stat cards - clean and consistent
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <StatCard icon={Briefcase} label="Total Jobs" value={stats.total} color="blue" />
  <StatCard icon={CheckCircle2} label="Active" value={stats.active} color="green" />
  <StatCard icon={Users} label="Applicants" value={stats.totalApplicants} color="blue" />
  <StatCard icon={Eye} label="Total Views" value={stats.totalViews} color="purple" />
</div>

// Search + filter - one component
<SearchFilter
  searchPlaceholder="Search jobs by title or location..."
  onSearch={(value) => setSearchQuery(value)}
  filters={[
    {
      id: "status",
      label: "Filter by Status",
      options: [
        { value: "all", label: "All Status" },
        { value: "active", label: "Active" },
        { value: "draft", label: "Draft" },
        { value: "closed", label: "Closed" }
      ]
    }
  ]}
  onFilterChange={(filterId, value) => {
    setStatusFilter(value as any);
  }}
/>

// Modals - clean and reusable
<FormModal
  isOpen={showCreateModal}
  onClose={() => setShowCreateModal(false)}
  title="Post New Job"
  onSubmit={async (formData) => {
    console.log("Creating job:", formData);
    setShowCreateModal(false);
  }}
>
  {/* Same form fields, but much cleaner structure */}
</FormModal>

<FormModal
  isOpen={selectedJob !== null}
  onClose={() => setSelectedJob(null)}
  title={selectedJob?.title || "Job Details"}
  subtitle={selectedJob?.company}
  onSubmit={async () => {
    console.log("Viewing job applicants:", selectedJob?.id);
  }}
>
  {/* Job details content */}
</FormModal>
```

**Result**:
- ✅ 150 LOC removed
- ✅ 4 StatCard duplicates eliminated
- ✅ 2 modal boilerplate patterns eliminated
- ✅ 1 manual search/filter replaced with reusable component
- ✅ 5 unused imports removed
- ✅ Easier to maintain and modify

---

## Estimated Time by Complexity

| Component Type | Time | Example |
|---|---|---|
| 1x StatCard | 5 min | Simple stat replacement |
| 1x SearchFilter | 10 min | Replace manual search + buttons |
| 1x FormModal | 10 min | Replace inline modal |
| Multiple patterns | 20-30 min | Dashboard with all 3 patterns |
| Complex integration | 40-60 min | Component with API calls + state management |

---

## Quality Checklist

Before you commit your migration:

- [ ] TypeScript compiles with no errors: `npm run type-check`
- [ ] Component renders correctly in browser
- [ ] All user interactions work (clicks, modals, filters)
- [ ] Component size reduced by minimum 20%
- [ ] Unused imports removed
- [ ] No console errors or warnings
- [ ] Visual appearance matches original
- [ ] Added comment explaining migration (optional but helpful)

---

## Resources

| Document | Purpose |
|----------|---------|
| PHASE_2_MIGRATION.md | Complete migration guide with examples |
| MIGRATION_CHECKLIST.md | List of 30 components with priority |
| ENTERPRISE_ARCHITECTURE.md | Overall architecture design |
| REFACTORING_PLAN.md | 6-phase refactoring roadmap |
| src/shared/components/common/ | Actual component source files |

---

## Need Help?

1. **Component not found?** Check: `src/shared/components/common/`
2. **API types unclear?** Read the component's TypeScript interface at the top of each file
3. **Stuck on issue?** Check "Common Mistakes & Fixes" section above
4. **Component too different?** Document it and create an issue for discussion

---

## Success = Cleaner Code 🎉

When you migrate a component:
- ✅ Developers work faster (less boilerplate to write)
- ✅ Code is easier to maintain (bug fixes apply everywhere)
- ✅ Styles are consistent (same look across app)
- ✅ Bundle size is smaller (less duplicate code)
- ✅ Type safety is better (centralized component contract)

**Every migration = Win for the whole team!**

---

Ready to migrate your first component? Pick one from MIGRATION_CHECKLIST.md and follow the steps above! 🚀
