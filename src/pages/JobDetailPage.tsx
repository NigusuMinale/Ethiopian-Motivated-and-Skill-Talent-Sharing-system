import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useRoute } from "wouter";
import { ArrowLeft, MapPin, Clock, Briefcase, CheckCircle2, DollarSign, Send, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const allJobs = [
  { id: "1", role: "Frontend Developer", company: "TechAddis Solutions", location: "Addis Ababa", type: "Full-time", field: "Engineering", salary: "ETB 35K–50K", posted: "2 days ago", tags: ["React", "TypeScript", "CSS"], description: "We are looking for a talented frontend developer to join our growing team. You'll work on modern React applications for Ethiopian and international clients. Experience with responsive design and performance optimization is a plus." },
  { id: "2", role: "Data Scientist", company: "EthioData Labs", location: "Remote", type: "Full-time", field: "Data", salary: "ETB 50K–75K", posted: "1 day ago", tags: ["Python", "ML", "SQL"], description: "Join our data science team to build predictive models and analytics dashboards. We work with healthcare, finance, and agriculture sectors across Ethiopia." },
  { id: "3", role: "Network Engineer", company: "Ethio Telecom", location: "Addis Ababa", type: "Contract", field: "Engineering", salary: "ETB 45K+", posted: "3 days ago", tags: ["Cisco", "Networking", "Linux"], description: "Support and maintain network infrastructure for Ethiopia's largest telecom provider. CCNA or equivalent certification preferred." },
  { id: "4", role: "UI/UX Designer", company: "CreativeHub ET", location: "Hybrid", type: "Full-time", field: "Design", salary: "ETB 30K–45K", posted: "Today", tags: ["Figma", "Prototyping", "Design Systems"], description: "Design beautiful, intuitive user experiences for Ethiopian startups and enterprises. Portfolio required." },
  { id: "5", role: "Backend Developer", company: "FinTech Ethiopia", location: "Addis Ababa", type: "Full-time", field: "Engineering", salary: "ETB 40K–60K", posted: "5 days ago", tags: ["Node.js", "PostgreSQL", "Docker"], description: "Build scalable APIs and backend systems for our financial services platform. Experience with microservices and AWS preferred." },
  { id: "6", role: "Business Analyst", company: "Commercial Bank of Ethiopia", location: "Addis Ababa", type: "Full-time", field: "Business", salary: "ETB 35K–55K", posted: "1 week ago", tags: ["Excel", "SQL", "Reporting"], description: "Analyze business processes and provide data-driven insights. Work with cross-functional teams to improve operations." },
];

const fieldColors: Record<string, string> = {
  Engineering: "text-primary bg-primary/10 border-primary/20",
  Data: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Design: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Business: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

export default function JobDetailPage() {
  const [match, params] = useRoute("/jobs/:id");
  const { user, isLoggedIn } = useAuth();
  const [applied, setApplied] = useState(false);
  const [applyForm, setApplyForm] = useState({ coverLetter: "", phone: "" });

  if (!match || !params) return null;
  const job = allJobs.find((j) => j.id === params.id);
  if (!job) {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Job not found.</p>
          <Link href="/" className="text-primary mt-4 inline-block">Go Home</Link>
        </div>
      </div>
    );
  }

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
  };

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
                  {job.company[0]}
                </div>
                <div>
                  <h1 className="text-2xl font-black text-foreground">{job.role}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{job.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`text-xs font-mono px-3 py-1.5 rounded-lg border ${fieldColors[job.field]}`}>
                  {job.field}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary border border-border px-3 py-1.5 rounded-lg">
                  <MapPin size={12} /> {job.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary border border-border px-3 py-1.5 rounded-lg">
                  <Clock size={12} /> {job.type}
                </span>
                <span className="flex items-center gap-1 text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-3 py-1.5 rounded-lg font-bold">
                  <DollarSign size={12} /> {job.salary}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary border border-border px-3 py-1.5 rounded-lg">
                  <Calendar size={12} /> Posted {job.posted}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map((t) => (
                  <span key={t} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-secondary border border-border text-muted-foreground">{t}</span>
                ))}
              </div>

              <div className="border-t border-border/40 pt-6">
                <h3 className="text-sm font-bold text-foreground mb-3">Job Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.description}</p>
              </div>
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
                  <p className="text-sm text-muted-foreground">{job.company} will review your EMSTS profile and get back to you soon.</p>
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
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Phone Number</label>
                    <input
                      value={applyForm.phone}
                      onChange={(e) => setApplyForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+251 9XX XXX XXX"
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/40 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
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
                    className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
                  >
                    <Send size={16} />
                    Submit Application
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
