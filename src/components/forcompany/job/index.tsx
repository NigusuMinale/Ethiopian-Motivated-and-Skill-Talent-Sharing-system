import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign,
  Users,
  Edit2,
  Trash2,
  Eye,
  MoreVertical,
  Building2,
  Calendar,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Loader2,
  Send
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "wouter";

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

const mockJobs: Job[] = [
  {
    id: "j1",
    title: "Senior Frontend Developer",
    company: "TechAddis Solutions",
    location: "Addis Ababa",
    type: "Full-time",
    salary: "ETB 50K - 80K",
    applicants: 24,
    status: "active",
    postedAt: "2 days ago",
    views: 156,
    description: "We are looking for an experienced Frontend Developer to join our team.",
    requirements: ["5+ years React experience", "TypeScript proficiency", "Leadership skills"],
    tags: ["React", "TypeScript", "Remote"]
  },
  {
    id: "j2",
    title: "Data Scientist",
    company: "TechAddis Solutions",
    location: "Remote",
    type: "Full-time",
    salary: "ETB 60K - 90K",
    applicants: 18,
    status: "active",
    postedAt: "5 days ago",
    views: 89,
    description: "Join our data science team to build ML models.",
    requirements: ["Python", "Machine Learning", "SQL"],
    tags: ["Python", "ML", "Data"]
  },
  {
    id: "j3",
    title: "UI/UX Designer",
    company: "TechAddis Solutions",
    location: "Addis Ababa",
    type: "Full-time",
    salary: "ETB 35K - 55K",
    applicants: 0,
    status: "draft",
    postedAt: "",
    views: 0,
    description: "Design beautiful interfaces for our products.",
    requirements: ["Figma", "User Research", "Prototyping"],
    tags: ["Figma", "Design"]
  },
  {
    id: "j4",
    title: "Backend Developer",
    company: "TechAddis Solutions",
    location: "Addis Ababa",
    type: "Full-time",
    salary: "ETB 45K - 70K",
    applicants: 31,
    status: "closed",
    postedAt: "30 days ago",
    views: 234,
    description: "Build scalable backend services.",
    requirements: ["Node.js", "PostgreSQL", "AWS"],
    tags: ["Node.js", "API"]
  }
];

export default function CompanyJobManagement() {
  const { user, isLoggedIn } = useAuth();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "draft" | "closed">("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

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
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Briefcase size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Total Jobs</span>
              </div>
              <p className="text-2xl font-black text-foreground">{stats.total}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Active</span>
              </div>
              <p className="text-2xl font-black text-green-500">{stats.active}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <Users size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Applicants</span>
              </div>
              <p className="text-2xl font-black text-blue-500">{stats.totalApplicants}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                  <Eye size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Total Views</span>
              </div>
              <p className="text-2xl font-black text-purple-500">{stats.totalViews}</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "active", "draft", "closed"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize border transition-all ${
                  statusFilter === status
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card/60 text-muted-foreground border-border/60 hover:border-primary/40"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
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
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-2xl rounded-3xl border border-border/60 bg-card shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-2 bg-gradient-to-r from-primary via-emerald-400 to-yellow-400" />
              <div className="p-8">
                <h2 className="text-xl font-black text-foreground mb-6">Post New Job</h2>
                
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

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3.5 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm hover:border-primary/40 transition-all"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90 flex items-center justify-center gap-2">
                    <Send size={16} />
                    Post Job
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Job Detail Modal */}
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-2xl rounded-3xl border border-border/60 bg-card shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-2 bg-gradient-to-r from-primary to-emerald-500" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-emerald-500/20 border border-primary/20 flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-foreground">{selectedJob.title}</h2>
                      <p className="text-muted-foreground">{selectedJob.company}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold uppercase px-3 py-1 rounded-lg border ${getStatusColor(selectedJob.status)}`}>
                    {selectedJob.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
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

                <div className="mb-6">
                  <h3 className="font-bold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedJob.description}</p>
                </div>

                <div className="mb-6">
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

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedJob.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono px-3 py-1.5 rounded-lg bg-secondary border border-border text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="flex-1 py-3.5 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm hover:border-primary/40 transition-all"
                  >
                    Close
                  </button>
                  {selectedJob.status === "active" && (
                    <button className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90">
                      View Applicants
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}