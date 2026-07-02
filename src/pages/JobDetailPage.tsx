import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ArrowLeft, MapPin, Clock, Briefcase, CheckCircle2, DollarSign, Send, Calendar, Loader2, AlertCircle } from "lucide-react";
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

export default function JobDetailPage() {
  const [match, routeParams] = useRoute("/jobs/:id");
  const params = routeParams as { id: string } | null;
  const { user, isLoggedIn } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [applied, setApplied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [applyForm, setApplyForm] = useState({ coverLetter: "", phone: "" });

  useEffect(() => {
    const fetchJob = async () => {
      if (!params?.id) return;
      setLoading(true);
      setError("");
      
      const result = await api.getJob(params.id);
      
      if (result.error) {
        setError(result.error);
      } else if (result.data) {
        setJob(result.data);
      }
      setLoading(false);
    };
    
    fetchJob();
  }, [params]);

  if (!match || !params) return null;
  
  if (loading) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (error || !job) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">{error || "Job not found."}</p>
          <Link href="/" className="text-primary mt-4 inline-block">Go Home</Link>
        </div>
      </div>
    );
  }

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApplyError("");
    
    const result = await api.applyForJob(job.id, applyForm.coverLetter);
    
    if (result.error) {
      setApplyError(result.error);
      setIsSubmitting(false);
    } else {
      setApplied(true);
      setIsSubmitting(false);
    }
  };

  const salaryStr = job.salaryMin && job.salaryMax 
    ? `ETB ${job.salaryMin}K-${job.salaryMax}K` 
    : job.salaryMin 
    ? `ETB ${job.salaryMin}K+` 
    : "Negotiable";

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto w-full px-6 pt-8 pb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft size={16} />
          Back to Jobs
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl border border-border/50 bg-card/80 overflow-hidden shadow-xl">
            <div className="h-[3px] bg-gradient-to-r from-primary via-emerald-400 to-yellow-400" />

            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary to-card border border-border flex items-center justify-center font-bold text-foreground text-xl shrink-0">
                  {(job.companyName || job.title || "?")[0]}
                </div>
                <div>
                  <h1 className="text-2xl font-black text-foreground">{job.title}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{job.companyName || "Company"}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="text-xs font-mono px-3 py-1.5 rounded-lg border bg-secondary border-border text-muted-foreground">
                  {job.jobType}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary border border-border px-3 py-1.5 rounded-lg">
                  <MapPin size={12} /> {job.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary border border-border px-3 py-1.5 rounded-lg">
                  <Clock size={12} /> {job.jobType}
                </span>
                <span className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1.5 rounded-lg font-bold">
                  <DollarSign size={12} /> {salaryStr}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary border border-border px-3 py-1.5 rounded-lg">
                  <Calendar size={12} /> Posted {timeAgo(job.createdAt)}
                </span>
              </div>

              <div className="border-t border-border/40 pt-6">
                <h3 className="text-sm font-bold text-foreground mb-3">Job Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
              </div>

              {job.requirements && (
                <div className="border-t border-border/40 pt-6 mt-6">
                  <h3 className="text-sm font-bold text-foreground mb-3">Requirements</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{job.requirements}</p>
                </div>
              )}
            </div>
          </div>

          {/* Apply Section */}
          <div className="mt-8 rounded-2xl border border-primary/30 bg-card/80 overflow-hidden shadow-xl">
            <div className="h-[3px] bg-gradient-to-r from-primary to-emerald-400" />
            <div className="p-8">
              {!isLoggedIn ? (
                <div className="text-center py-4">
                  <h3 className="text-lg font-bold text-foreground mb-2">Ready to Apply?</h3>
                  <p className="text-sm text-muted-foreground mb-4">Sign in to apply with your EMSTS profile</p>
                  <div className="flex items-center justify-center gap-3">
                    <Link href="/login" className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30">
                      Sign In
                    </Link>
                    <Link href="/register" className="px-6 py-2.5 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm hover:border-primary/40 hover:text-primary">
                      Create Account
                    </Link>
                  </div>
                </div>
              ) : applied ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-3"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-black text-foreground">Application Sent!</h3>
                  <p className="text-sm text-muted-foreground">{job.companyName || "The company"} will review your application and get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleApply} className="space-y-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">Apply for this Role</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Applying as <span className="text-primary font-medium">{user?.name}</span> with your EMSTS profile
                  </p>
                  {applyError && (
                    <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2">
                      {applyError}
                    </div>
                  )}
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Cover Letter (optional)</label>
                    <textarea
                      value={applyForm.coverLetter}
                      onChange={(e) => setApplyForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                      placeholder="Why are you a great fit for this role?"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/40 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Submit Application
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
