import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, Briefcase, Building2 } from "lucide-react";

const stats = [
  { label: "Talent Profiles", value: "10K+", icon: <Users size={15} /> },
  { label: "Job Listings", value: "500+", icon: <Briefcase size={15} /> },
  { label: "Partner Companies", value: "120+", icon: <Building2 size={15} /> },
];

export default function Hero() {
  return (
    <section id="hero" className="w-full min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-primary/6 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(142,70%,45%) 1px, transparent 1px), linear-gradient(90deg, hsl(142,70%,45%) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
      </div>

      <div className="max-w-5xl w-full mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center gap-7"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium"
          >
            <Sparkles size={14} />
            <span>Ethiopia's Premier Talent and Opportunity Platform</span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.08]">
            Where Ethiopian{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-primary">
              Talent
            </span>{" "}
            Meets{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300">
              Opportunity
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Share your skills, showcase verified certificates, discover jobs, and connect with companies — all in one platform built for Ethiopia's growing professional community.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <a
              href="#contact"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-xl shadow-primary/30 hover:opacity-90 transition-opacity"
            >
              Join the Waitlist
              <ArrowRight size={18} />
            </a>
            <a
              href="#platform"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-border/70 text-foreground font-semibold text-base hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {[
            { icon: "👤", title: "For Individuals", desc: "Build a public profile. Share skills and verified certificates. Get discovered.", color: "border-primary/30 hover:border-primary/60 hover:bg-primary/5" },
            { icon: "🏢", title: "For Companies", desc: "Advertise products, post jobs, and hire from Ethiopia's best talent pool.", color: "border-yellow-400/30 hover:border-yellow-400/60 hover:bg-yellow-400/5" },
            { icon: "🔍", title: "For Job Seekers", desc: "Browse verified opportunities. Apply with your EMSTS profile. Land your dream role.", color: "border-emerald-500/30 hover:border-emerald-500/60 hover:bg-emerald-500/5" },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className={`rounded-2xl border ${card.color} p-6 text-left transition-all duration-300`}
            >
              <div className="text-3xl mb-3">{card.icon}</div>
              <h3 className="font-bold text-foreground mb-1.5">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-12 mt-16 pt-10 border-t border-border/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-1.5 text-muted-foreground text-sm mb-1">
                {stat.icon}
                {stat.label}
              </div>
              <div className="text-3xl font-black text-primary">{stat.value}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
