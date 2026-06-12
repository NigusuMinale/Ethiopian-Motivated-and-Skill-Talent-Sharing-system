import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

const allJobs = [
  { role: "Frontend Developer", company: "TechAddis Solutions", location: "Addis Ababa", type: "Full-time", field: "Engineering", salary: "ETB 35K–50K", posted: "2 days ago", tags: ["React", "TypeScript", "CSS"] },
  { role: "Data Scientist", company: "EthioData Labs", location: "Remote", type: "Full-time", field: "Data", salary: "ETB 50K–75K", posted: "1 day ago", tags: ["Python", "ML", "SQL"] },
  { role: "Network Engineer", company: "Ethio Telecom", location: "Addis Ababa", type: "Contract", field: "Engineering", salary: "ETB 45K+", posted: "3 days ago", tags: ["Cisco", "Networking", "Linux"] },
  { role: "UI/UX Designer", company: "CreativeHub ET", location: "Hybrid", type: "Full-time", field: "Design", salary: "ETB 30K–45K", posted: "Today", tags: ["Figma", "Prototyping", "Design Systems"] },
  { role: "Backend Developer", company: "FinTech Ethiopia", location: "Addis Ababa", type: "Full-time", field: "Engineering", salary: "ETB 40K–60K", posted: "5 days ago", tags: ["Node.js", "PostgreSQL", "Docker"] },
  { role: "Business Analyst", company: "Commercial Bank of Ethiopia", location: "Addis Ababa", type: "Full-time", field: "Business", salary: "ETB 35K–55K", posted: "1 week ago", tags: ["Excel", "SQL", "Reporting"] },
];

const fields = ["All", "Engineering", "Data", "Design", "Business"];
const fieldColors: Record<string, string> = {
  Engineering: "text-primary bg-primary/10 border-primary/20",
  Data: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Design: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Business: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
};

export default function Jobs() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const visible = allJobs.filter((j) => {
    const matchField = filter === "All" || j.field === filter;
    const matchQuery = query === "" || j.role.toLowerCase().includes(query.toLowerCase()) || j.company.toLowerCase().includes(query.toLowerCase());
    return matchField && matchQuery;
  });

  return (
    <section id="jobs" className="w-full py-28 px-6 relative">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium mb-5">
            Live Job Board
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 leading-tight">
            Your Next Opportunity Is Here
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse verified job listings from Ethiopia's top companies. Apply instantly using your EMSTS profile.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search roles or companies..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {fields.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                    : "bg-secondary/40 text-muted-foreground border-border/50 hover:border-primary/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-4">
          {visible.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No jobs match your search.</div>
          ) : (
            visible.map((job, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border/50 bg-card/60 p-6 hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-secondary to-card border border-border flex items-center justify-center font-bold text-foreground text-lg shrink-0">
                      {job.company[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-base">{job.role}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{job.posted}</span>
                        <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                    <span className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${fieldColors[job.field] || "text-muted-foreground bg-secondary border-border"}`}>
                      {job.field}
                    </span>
                    <span className="text-sm font-bold text-yellow-400">{job.salary}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.map((t) => (
                      <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground">{t}</span>
                    ))}
                  </div>
                  <Link href={`/jobs/${i + 1}`} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
                    View & Apply <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className="px-6 py-3 rounded-xl border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary transition-all text-sm font-medium">
            View All Listings
          </button>
        </motion.div>
      </div>
    </section>
  );
}
