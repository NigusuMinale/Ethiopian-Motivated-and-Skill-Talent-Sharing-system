import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Building2, Users, Award, Search, CheckCircle2, XCircle, Eye, Shield, Filter } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const mockCertificates = [
  { id: "c1", name: "Abebe Kebede", title: "CS50 — Harvard University", issuer: "Harvard / edX", date: "2025-03-15", verified: true, skills: ["C", "Python", "Algorithms"], image: "HK" },
  { id: "c2", name: "Meron Tesfaye", title: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2025-01-20", verified: true, skills: ["AWS", "Cloud", "Architecture"], image: "AW" },
  { id: "c3", name: "Yonas Alemu", title: "Google Data Analytics Certificate", issuer: "Google / Coursera", date: "2024-11-10", verified: false, skills: ["R", "SQL", "Tableau"], image: "GD" },
  { id: "c4", name: "Hirut Bekele", title: "Python for Everybody", issuer: "University of Michigan", date: "2025-05-05", verified: true, skills: ["Python", "Web Scraping", "Databases"], image: "UM" },
  { id: "c5", name: "Dawit Mesfin", title: "CCNA Networking", issuer: "Cisco", date: "2024-09-12", verified: false, skills: ["Networking", "Cisco", "Security"], image: "CI" },
];

const mockApplicants = [
  { id: "a1", name: "Abebe Kebede", role: "Frontend Developer", status: "pending", applied: "2 hours ago", skills: ["React", "TypeScript", "CSS"], experience: "3 years" },
  { id: "a2", name: "Meron Tesfaye", role: "Data Scientist", status: "reviewed", applied: "1 day ago", skills: ["Python", "ML", "SQL"], experience: "2 years" },
  { id: "a3", name: "Yonas Alemu", role: "Network Engineer", status: "accepted", applied: "3 days ago", skills: ["Cisco", "Linux", "Networking"], experience: "4 years" },
];

export default function CompanyDashboardPage() {
  const { user, isLoggedIn } = useAuth();
  const [tab, setTab] = useState<"certificates" | "applicants">("certificates");
  const [certFilter, setCertFilter] = useState("");
  const [verifyFilter, setVerifyFilter] = useState<"all" | "verified" | "pending">("all");

  const filteredCerts = mockCertificates.filter((c) => {
    const matchSearch = certFilter === "" || c.name.toLowerCase().includes(certFilter.toLowerCase()) || c.title.toLowerCase().includes(certFilter.toLowerCase());
    const matchVerify = verifyFilter === "all" || (verifyFilter === "verified" && c.verified) || (verifyFilter === "pending" && !c.verified);
    return matchSearch && matchVerify;
  });

  if (!isLoggedIn || user?.role !== "company") {
    return (
      <div className="min-h-[100dvh] bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-xl font-black text-foreground mb-2">Company Dashboard</h1>
          <p className="text-sm text-muted-foreground mb-6">This area is for verified company accounts. Sign in as a company to view talent certificates and applicants.</p>
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
            { icon: <Award size={20} />, label: "Certificates Viewed", value: "142" },
            { icon: <Users size={20} />, label: "Total Applicants", value: "23" },
            { icon: <Shield size={20} />, label: "Verified Profiles", value: "18" },
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
            { id: "certificates" as const, label: "Talent Certificates", icon: <Award size={16} /> },
            { id: "applicants" as const, label: "Job Applicants", icon: <Users size={16} /> },
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

        {tab === "certificates" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={certFilter}
                  onChange={(e) => setCertFilter(e.target.value)}
                  placeholder="Search certificates or talent..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                {(["all", "verified", "pending"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setVerifyFilter(f)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium border capitalize transition-all ${
                      verifyFilter === f
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
              {filteredCerts.map((cert) => (
                <div key={cert.id} className="rounded-2xl border border-border/50 bg-card/60 p-6 hover:border-primary/30 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-card border border-border flex items-center justify-center font-bold text-foreground text-lg shrink-0">
                      {cert.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-foreground">{cert.title}</h3>
                          <p className="text-sm text-muted-foreground mt-0.5">{cert.name} · {cert.issuer}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {cert.verified ? (
                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/25 text-primary text-xs font-bold">
                              <CheckCircle2 size={12} /> Verified
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-yellow-400/10 border border-yellow-400/25 text-yellow-400 text-xs font-bold">
                              <XCircle size={12} /> Pending
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {cert.skills.map((s) => (
                          <span key={s} className="text-xs font-mono px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground">{s}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                        <span>Issued: {cert.date}</span>
                        <button className="flex items-center gap-1 text-primary hover:underline">
                          <Eye size={12} /> View Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredCerts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">No certificates match your filters.</div>
              )}
            </div>
          </motion.div>
        )}

        {tab === "applicants" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="space-y-3">
              {mockApplicants.map((app) => (
                <div key={app.id} className="rounded-2xl border border-border/50 bg-card/60 p-6 hover:border-primary/30 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center font-bold text-white text-lg shrink-0">
                      {app.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-foreground">{app.name}</h3>
                          <p className="text-sm text-muted-foreground">Applied for {app.role} · {app.experience} experience</p>
                        </div>
                        <span className={`shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold border ${
                          app.status === "accepted" ? "bg-primary/10 text-primary border-primary/25" :
                          app.status === "reviewed" ? "bg-blue-400/10 text-blue-400 border-blue-400/25" :
                          "bg-yellow-400/10 text-yellow-400 border-yellow-400/25"
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {app.skills.map((s) => (
                          <span key={s} className="text-xs font-mono px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="p-2 rounded-lg bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/40 transition-all">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
