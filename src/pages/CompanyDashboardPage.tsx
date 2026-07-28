import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  Plus,
  MapPin,
  Clock,
  DollarSign,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  Search,
  Filter,
  Calendar,
  Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "wouter";
import { api } from "@/lib/api";
import { StatCard, FormModal, SearchFilter } from "@/shared/components/common";

type TabType = "overview" | "jobs" | "talent" | "groups" | "ads" | "applications";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  salary: string;
  applicants: number;
  status: "active" | "draft" | "closed";
  postedAt: string;
  views: number;
  description: string;
  requirements: string[];
  tags: string[];
}

interface Talent {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: number;
  rating: number;
  reviews: number;
  avatar?: string;
  status: "active" | "open";
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  createdAt: string;
  status: "active" | "archived";
}

interface Advertisement {
  id: string;
  title: string;
  type: string;
  budget: number;
  spent: number;
  reach: number;
  clicks: number;
  status: "active" | "paused" | "completed";
  startDate: string;
  endDate: string;
}

export default function CompanyDashboardPage() {
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [talents, setTalents] = useState<Talent[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "draft" | "closed" | "paused" | "completed">("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn || user?.role !== "company") {
        setLoading(false);
        return;
      }
      try {
        // Fetch all company data in parallel
        const [jobsRes, talentRes] = await Promise.all([
          api.getJobs(),
          api.searchTalents?.() || Promise.resolve({ data: { talents: [] } })
        ]);
        
        if (jobsRes.data?.jobs) {
          setJobs(jobsRes.data.jobs);
        }
        
        if (talentRes.data?.talents) {
          setTalents(talentRes.data.talents);
        }
        
        // TODO: Add API calls for groups and ads when available
        // For now using empty arrays
        setGroups([]);
        setAds([]);
        
      } catch (err) {
        console.error("Failed to load company dashboard data:", err);
        // Continue with empty arrays on error
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [isLoggedIn, user?.role]);

  if (!isLoggedIn || user?.role !== "company") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground mb-3">Company Dashboard</h1>
          <p className="text-muted-foreground mb-6">Sign in as a company to manage jobs, talent, and campaigns.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/login" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm">
              Sign In
            </Link>
            <Link href="/register" className="px-6 py-3 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const stats = {
    activeJobs: jobs.filter(j => j.status === "active").length,
    totalApplicants: jobs.reduce((acc, j) => acc + j.applicants, 0),
    totalTalent: talents.length,
    totalGroups: groups.length,
    adSpent: ads.reduce((acc, a) => acc + a.spent, 0),
    adReach: ads.reduce((acc, a) => acc + a.reach, 0)
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
    { id: "jobs", label: "Job Listings", icon: <Briefcase size={16} /> },
    { id: "talent", label: "Talent Search", icon: <Users size={16} /> },
    { id: "groups", label: "Talent Groups", icon: <Users size={16} /> },
    { id: "ads", label: "Advertisements", icon: <TrendingUp size={16} /> },
    { id: "applications", label: "Applications", icon: <Calendar size={16} /> },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "draft": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "closed": return "text-muted-foreground bg-secondary border-border";
      case "paused": return "text-orange-500 bg-orange-500/10 border-orange-500/20";
      case "completed": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      default: return "text-muted-foreground bg-secondary border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">Company Dashboard</h1>
              <p className="text-muted-foreground">Manage jobs, talent, and campaigns in one place</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard icon={Briefcase} label="Active Jobs" value={stats.activeJobs} color="blue" />
            <StatCard icon={Users} label="Applicants" value={stats.totalApplicants} color="green" />
            <StatCard icon={Users} label="Saved Talent" value={stats.totalTalent} color="purple" />
            <StatCard icon={TrendingUp} label="Ad Reach" value={stats.adReach > 0 ? (stats.adReach / 1000).toFixed(0) + "K" : "0"} color="orange" />
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border/40 pb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Jobs */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">Recent Job Listings</h3>
                  <button className="text-sm text-primary font-medium">View All</button>
                </div>
                <div className="space-y-3">
                  {jobs.slice(0, 3).map((job) => (
                    <div key={job.id} className="rounded-2xl border border-border/50 bg-card/60 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{job.title}</h4>
                          <p className="text-xs text-muted-foreground">{job.location}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                        <span>{job.applicants} applicants</span>
                        <span>{job.views} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved Talent */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">Saved Talent</h3>
                  <button className="text-sm text-primary font-medium">View All</button>
                </div>
                <div className="space-y-3">
                  {talents.slice(0, 3).map((talent) => (
                    <div key={talent.id} className="rounded-2xl border border-border/50 bg-card/60 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground">{talent.name}</h4>
                          <p className="text-xs text-muted-foreground">{talent.title}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-yellow-400">{talent.rating} ★</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        {talent.skills.slice(0, 2).map((skill) => (
                          <span key={skill} className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Jobs Tab */}
        {activeTab === "jobs" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Job Listings</h2>
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90"
              >
                <Plus size={18} />
                Post New Job
              </button>
            </div>

            <SearchFilter
              searchPlaceholder="Search jobs..."
              onSearch={(value) => setSearchQuery(value)}
              filters={[
                {
                  id: "status",
                  label: "Filter by Status",
                  options: [
                    { value: "all", label: "All" },
                    { value: "active", label: "Active" },
                    { value: "draft", label: "Draft" },
                    { value: "closed", label: "Closed" }
                  ]
                }
              ]}
              onFilterChange={(filterId, value) => {
                if (filterId === "status") setStatusFilter(value as any);
              }}
            />

            <div className="space-y-4">
              {jobs
                .filter(job => statusFilter === "all" || job.status === statusFilter)
                .map((job) => (
                  <div key={job.id} className="rounded-2xl border border-border/50 bg-card/60 p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg text-foreground">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>
                          <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="p-2.5 rounded-xl border border-border/60 text-muted-foreground hover:border-primary/40">
                          <Eye size={16} />
                        </button>
                        <button className="p-2.5 rounded-xl border border-border/60 text-muted-foreground hover:border-primary/40">
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Talent Tab */}
        {activeTab === "talent" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Saved Talent</h2>
              <Link href="/dashboard/jobs" className="text-sm text-primary font-medium">Browse More</Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {talents.map((talent, index) => (
                <motion.div
                  key={talent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-border/50 bg-card/60 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-foreground">{talent.name}</h3>
                      <p className="text-sm text-muted-foreground">{talent.title}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-yellow-400 flex items-center gap-1">
                        <span>★</span> {talent.rating}
                      </p>
                      <p className="text-xs text-muted-foreground">{talent.reviews} reviews</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {talent.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-xs px-2 py-1 rounded-lg bg-secondary border border-border text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{talent.experience} years experience • {talent.location}</p>
                  <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90">
                    Contact
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Groups Tab */}
        {activeTab === "groups" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-foreground">Talent Groups</h2>
            <div className="space-y-4">
              {groups.map((group) => (
                <div key={group.id} className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-foreground">{group.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getStatusColor(group.status)}`}>
                      {group.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span>{group.members} members</span>
                    <span>Created {group.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Ads Tab */}
        {activeTab === "ads" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-foreground">Advertisements</h2>
            <div className="space-y-4">
              {ads.map((ad) => (
                <div key={ad.id} className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-foreground">{ad.title}</h3>
                      <p className="text-sm text-muted-foreground">{ad.type}</p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getStatusColor(ad.status)}`}>
                      {ad.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Reach</p>
                      <p className="text-lg font-bold text-foreground">{(ad.reach / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                      <p className="text-lg font-bold text-foreground">{ad.clicks}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-lg font-bold text-foreground">ETB {ad.budget}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Spent</p>
                      <p className="text-lg font-bold text-green-500">ETB {ad.spent}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Briefcase className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">No new applications</p>
            <p className="text-sm text-muted-foreground/70">Applications will appear here</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
