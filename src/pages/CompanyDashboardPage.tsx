import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Building2, Users, Award, Search, CheckCircle2, XCircle, Eye, Shield, Loader2, Briefcase, Clock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (days > 7) return `${Math.floor(days / 7)}w ago`;
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return "Today";
}

const statusColors: Record<string, string> = {
  pending: "bg-yellow-400/10 text-yellow-400 border-yellow-400/25",
  reviewed: "bg-blue-400/10 text-blue-400 border-blue-400/25",
  accepted: "bg-primary/10 text-primary border-primary/25",
  rejected: "bg-red-400/10 text-red-400 border-red-400/25",
};

export default function CompanyDashboardPage() {
  const { user, isLoggedIn } = useAuth();
  const [tab, setTab] = useState<"applicants" | "jobs">("applicants");
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "reviewed" | "accepted" | "rejected">("all");
  const [applicants, setApplicants] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoggedIn || user?.role !== "company") return;
      setLoading(true);
      setError("");
      
      const [appsResult, jobsResult] = await Promise.all([
        api.getCompanyApplications(),
        api.getCompanyJobs(),
      ]);

      if (appsResult.error) {
        setError(appsResult.error);
      } else if (appsResult.data?.applications) {
        setApplicants(appsResult.data.applications);
      }

      if (jobsResult.data?.jobs) {
        setJobs(jobsResult.data.jobs);
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, [isLoggedIn, user?.role]);

  const filteredApplicants = applicants.filter((a) => {
    const matchSearch = searchFilter === "" || 
      (a.applicantName || "").toLowerCase().includes(searchFilter.toLowerCase()) ||
      (a.jobTitle || "").toLowerCase().includes(searchFilter.toLowerCase());
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (applicationId: string, newStatus: string) => {
    const result = await api.updateApplicationStatus(applicationId, newStatus);
    if (!result.error) {
      setApplicants(prev => prev.map(a => 
        a.id === applicationId ? { ...a, status: newStatus } : a
      ));
    }
  };

  if (!isLoggedIn || user?.role !== "company") {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xl font-black text-foreground mb-2">Company Dashboard</h1>
          <p className="text-sm text-muted-foreground mb-6">This area is for verified company accounts. Sign in as a company to view job applicants and manage your listings.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/login" className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30">
              Sign In as Company
            </Link>
            <Link href="/register" className="px-6 py-2.5 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm hover:border-primary/40">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pt-8 pb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-black text-primary-foreground text-xl shadow-lg shadow-primary/30">
            {user?.name?.[0] || "C"}
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">Company Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <Briefcase size={20} />, label: "Active Jobs", value: jobs.filter(j => j.status === "active").length },
            { icon: <Users size={20} />, label: "Total Applicants", value: applicants.length },
            { icon: <Shield size={20} />, label: "Pending Review", value: applicants.filter(a => a.status === "pending").length },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl border border-border/50 bg-card/60 p-5 flex items-center gap-4">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">{s.icon}</div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-xl font-black text-foreground">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "applicants" as const, label: "Job Applicants", icon: <Users size={16} /> },
            { id: "jobs" as const, label: "My Job Posts", icon: <Briefcase size={16} /> },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                tab === t.id
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                  : "bg-secondary/40 text-muted-foreground border-border/50 hover:border-primary/40"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-muted-foreground">{error}</div>
        ) : tab === "applicants" ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search applicants or jobs..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {(["all", "pending", "reviewed", "accepted", "rejected"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border capitalize transition-all ${
                      statusFilter === f
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary/40 text-muted-foreground border-border/50 hover:border-primary/40"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {filteredApplicants.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  {applicants.length === 0 ? "No applications yet." : "No applicants match your filters."}
                </div>
              ) : (
                filteredApplicants.map((app) => (
                  <div key={app.id} className="rounded-2xl border border-border/50 bg-card/60 p-6 hover:border-primary/30 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center font-bold text-white text-lg shrink-0">
                        {(app.applicantName || "?")[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-bold text-foreground">{app.applicantName || "Unknown"}</h3>
                            <p className="text-sm text-muted-foreground">
                              Applied for {app.jobTitle || "a job"} - {timeAgo(app.appliedAt)}
                            </p>
                          </div>
                          <span className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold border capitalize ${statusColors[app.status] || statusColors.pending}`}>
                            {app.status}
                          </span>
                        </div>
                        {app.coverLetter && (
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{app.coverLetter}</p>
                        )}
                      </div>
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className="px-3 py-2 rounded-lg border border-border/60 bg-secondary text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors shrink-0"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="space-y-3">
              {jobs.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">You haven't posted any jobs yet.</div>
              ) : (
                jobs.map((job) => {
                  const salaryStr = job.salaryMin && job.salaryMax 
                    ? `ETB ${job.salaryMin}K-${job.salaryMax}K` 
                    : job.salaryMin 
                    ? `ETB ${job.salaryMin}K+` 
                    : "Negotiable";
                  const applicantCount = applicants.filter(a => a.jobId === job.id).length;
                  return (
                    <div key={job.id} className="rounded-2xl border border-border/50 bg-card/60 p-6 hover:border-primary/30 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-bold text-foreground">{job.title}</h3>
                              <p className="text-sm text-muted-foreground mt-0.5">
                                {job.location} - {job.jobType} - {salaryStr}
                              </p>
                            </div>
                            <span className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold border capitalize ${
                              job.status === "active" 
                                ? "bg-primary/10 text-primary border-primary/25" 
                                : "bg-red-400/10 text-red-400 border-red-400/25"
                            }`}>
                              {job.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Users size={12} /> {applicantCount} applicants</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> Posted {timeAgo(job.createdAt)}</span>
                          </div>
                        </div>
                        <Link href={`/jobs/${job.id}`} className="px-4 py-2 rounded-xl border border-border/60 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-all shrink-0">
                          View
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
