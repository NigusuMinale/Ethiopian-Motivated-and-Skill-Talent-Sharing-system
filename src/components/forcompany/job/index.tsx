import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Plus, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  Edit2,
  Trash2,
  Eye,
  Building2,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "wouter";
import { api } from "@/lib/api";
import { StatCard, FormModal, SearchFilter } from "@/shared/components/common";

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

export default function CompanyJobManagement() {
  const { user, isLoggedIn } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "draft" | "closed">("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!isLoggedIn || user?.role !== "company") {
        setLoading(false);
        return;
      }
      try {
        const result = await api.getJobs();
        if (result.data?.jobs) {
          setJobs(result.data.jobs);
        }
      } catch (err) {
        console.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [isLoggedIn, user?.role]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: jobs.length,
    active: jobs.filter(j => j.status === "active").length,
    totalApplicants: jobs.reduce((acc, j) => acc + j.applicants, 0),
    totalViews: jobs.reduce((acc, j) => acc + j.views, 0)
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "draft": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "closed": return "text-muted-foreground bg-secondary border-border";
      default: return "text-muted-foreground bg-secondary border-border";
    }
  };

  if (!isLoggedIn || user?.role !== "company") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground mb-3">Company Dashboard</h1>
          <p className="text-muted-foreground mb-6">Sign in as a company to post jobs and manage applicants.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/login" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30">
              Sign In
            </Link>
            <Link href="/register" className="px-6 py-3 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm hover:border-primary/40">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-foreground">Job Management</h1>
                <p className="text-muted-foreground">Post and manage your job listings</p>
              </div>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
            >
              <Plus size={18} />
              Post New Job
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={Briefcase}
              label="Total Jobs"
              value={stats.total}
              color="blue"
            />
            <StatCard
              icon={CheckCircle2}
              label="Active"
              value={stats.active}
              color="green"
            />
            <StatCard
              icon={Users}
              label="Applicants"
              value={stats.totalApplicants}
              color="blue"
            />
            <StatCard
              icon={Eye}
              label="Total Views"
              value={stats.totalViews}
              color="purple"
            />
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
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
              if (filterId === "status") {
                setStatusFilter(value as any);
              }
            }}
          />
        </motion.div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden hover:border-primary/30 transition-all"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-500/20 border border-primary/20 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg text-foreground">{job.title}</h3>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign size={12} /> {job.salary}
                        </span>
                        {job.postedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {job.postedAt}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right mr-4">
                      <p className="text-lg font-black text-foreground">{job.applicants}</p>
                      <p className="text-xs text-muted-foreground">applicants</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedJob(job)}
                        className="p-2.5 rounded-xl border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary transition-all"
                      >
                        <Eye size={16} />
                      </button>
                      {job.status === "active" && (
                        <>
                          <button className="p-2.5 rounded-xl border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary transition-all">
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all">
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/40">
                  {job.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-secondary border border-border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">No jobs found</p>
          </div>
        )}

        {/* Create Job Modal */}
        <FormModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Post New Job"
          onSubmit={async (formData) => {
            // Handle job creation
            console.log("Creating job:", formData);
            // TODO: Implement job creation API call
            setShowCreateModal(false);
          }}
        >
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Developer"
                  className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Location</label>
                <input
                  type="text"
                  placeholder="e.g. Addis Ababa"
                  className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Job Type</label>
                <select className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground focus:outline-none focus:border-primary/50">
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">Salary Range</label>
                <input
                  type="text"
                  placeholder="e.g. ETB 50K - 80K"
                  className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Description</label>
              <textarea
                rows={4}
                placeholder="Describe the job role and responsibilities..."
                className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">Requirements (comma separated)</label>
              <input
                type="text"
                placeholder="e.g. React, TypeScript, 5+ years experience"
                className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>
        </FormModal>

        {/* Job Detail Modal */}
        <FormModal
          isOpen={selectedJob !== null}
          onClose={() => setSelectedJob(null)}
          title={selectedJob?.title || "Job Details"}
          subtitle={selectedJob?.company}
          onSubmit={async () => {
            // Handle job details
            console.log("Viewing job applicants:", selectedJob?.id);
          }}
        >
          {selectedJob && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-secondary/40 border border-border/40">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MapPin size={14} />
                    <span className="text-xs">Location</span>
                  </div>
                  <p className="font-semibold text-foreground">{selectedJob.location}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/40 border border-border/40">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Clock size={14} />
                    <span className="text-xs">Type</span>
                  </div>
                  <p className="font-semibold text-foreground">{selectedJob.type}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/40 border border-border/40">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <DollarSign size={14} />
                    <span className="text-xs">Salary</span>
                  </div>
                  <p className="font-semibold text-foreground">{selectedJob.salary}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/40 border border-border/40">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Users size={14} />
                    <span className="text-xs">Applicants</span>
                  </div>
                  <p className="font-semibold text-foreground">{selectedJob.applicants}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Description</h3>
                <p className="text-muted-foreground">{selectedJob.description}</p>
              </div>

              <div>
                <h3 className="font-bold text-foreground mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle2 size={14} className="text-primary" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedJob.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-secondary border border-border text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </FormModal>
      </div>
    </div>
  );
}