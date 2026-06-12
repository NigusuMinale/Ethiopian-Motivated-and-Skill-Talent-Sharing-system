import React from "react";
import { motion } from "framer-motion";
import { Award, Megaphone, Search, UserCircle, ShieldCheck, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <UserCircle className="w-6 h-6" />,
    title: "Smart Talent Profiles",
    desc: "Every user gets a public profile to showcase their skills, experience, education, and personality — a living CV the world can discover.",
    color: "text-primary bg-primary/10 border-primary/20",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Verified Certificates",
    desc: "Upload and verify your professional certificates. Trusted badges on your profile signal real credibility to employers and collaborators.",
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Job Board and Discovery",
    desc: "Companies post jobs directly on EMSTS. Job seekers apply with their verified profile — no CV attachment needed.",
    color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  },
  {
    icon: <Megaphone className="w-6 h-6" />,
    title: "Company Advertising",
    desc: "Businesses advertise products and services to Ethiopia's growing professional community with targeted, affordable ads.",
    color: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Skill Sharing Hub",
    desc: "Share your knowledge, write skill guides, teach what you know. Build authority in your field within the Ethiopian ecosystem.",
    color: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Career Growth Tools",
    desc: "Get personalized job recommendations, career path insights, and mentorship connections based on your verified skill profile.",
    color: "text-rose-400 bg-rose-400/10 border-rose-400/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 280, damping: 22 } },
};

export default function Platform() {
  return (
    <section id="platform" className="w-full py-28 px-6 relative bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium mb-5">
            Platform Features
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 leading-tight">
            Everything in One Place
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            EMSTS combines talent profiles, certificate verification, job discovery, and company advertising into a single unified platform built for Ethiopia.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((feat, i) => (
            <motion.div key={i} variants={itemVariants}>
              <div className="h-full rounded-2xl border border-border/50 bg-card/60 p-7 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group">
                <div className={`inline-flex p-3 rounded-xl border mb-5 ${feat.color}`}>
                  {feat.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors">
                  {feat.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
