import React from "react";
import { motion } from "framer-motion";
import { Megaphone, Users, Target, BarChart3 } from "lucide-react";

const perks = [
  { icon: <Megaphone className="w-5 h-5 text-yellow-400" />, title: "Product Advertising", desc: "Reach Ethiopia's professional community with targeted product and service ads." },
  { icon: <Users className="w-5 h-5 text-primary" />, title: "Talent Access", desc: "Search and filter verified talent by skill, location, education, and certificate." },
  { icon: <Target className="w-5 h-5 text-emerald-400" />, title: "Job Posting", desc: "Post job openings and receive applications from verified, profile-ready candidates." },
  { icon: <BarChart3 className="w-5 h-5 text-blue-400" />, title: "Company Page", desc: "Build a company profile page to showcase your brand, culture, and open positions." },
];

const mockJobs = [
  { role: "Frontend Developer", company: "TechAddis", type: "Full-time", location: "Addis Ababa", salary: "ETB 35K–50K" },
  { role: "Data Analyst", company: "EthioBank", type: "Full-time", location: "Remote", salary: "ETB 40K–60K" },
  { role: "Network Engineer", company: "Ethio Telecom", type: "Contract", location: "Addis Ababa", salary: "ETB 45K+" },
];

export default function ForCompanies() {
  return (
    <section id="companies" className="w-full py-28 px-6 relative bg-secondary/20 overflow-hidden">
      <div className="absolute left-0 top-0 w-[400px] h-[400px] bg-yellow-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="order-2 md:order-1"
          >
            <div className="space-y-3">
              {mockJobs.map((job, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-border/60 bg-card/80 p-5 hover:border-yellow-400/40 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{job.role}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">{job.company} · {job.location}</p>
                    </div>
                    <span className="shrink-0 px-2.5 py-1 rounded-lg bg-secondary text-xs font-mono text-muted-foreground border border-border">{job.type}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                    <span className="text-xs font-bold text-yellow-400">{job.salary}</span>
                    <button className="text-xs text-primary font-medium hover:underline">Apply with profile</button>
                  </div>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="rounded-xl border border-yellow-400/30 bg-yellow-400/5 p-5"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-yellow-400/15 border border-yellow-400/25 text-yellow-400">Sponsored</span>
                <p className="font-bold text-foreground text-sm mt-2">Reach 10,000+ Ethiopian professionals</p>
                <p className="text-xs text-muted-foreground mt-1">Advertise your product on EMSTS — targeted, affordable, effective.</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm font-medium mb-6">
              For Companies and Businesses
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              Find Talent. Advertise. Grow.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Access Ethiopia's largest pool of verified, skilled professionals. Post jobs, run ads, and build your brand on the platform Ethiopian talent trusts.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perks.map((perk, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-card/60 hover:border-primary/30 transition-colors">
                  <div className="p-2 rounded-lg bg-secondary border border-border shrink-0">
                    {perk.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm mb-0.5">{perk.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
