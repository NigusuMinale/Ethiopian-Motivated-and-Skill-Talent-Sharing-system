import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Star, Upload, Globe } from "lucide-react";

const steps = [
  { icon: <Upload className="w-5 h-5 text-primary" />, title: "Create Your Profile", desc: "Sign up and build your public talent profile with skills, education, work history, and a personal bio." },
  { icon: <Star className="w-5 h-5 text-yellow-400" />, title: "Add Your Skills", desc: "List what you know — programming languages, tools, soft skills, languages. Show the world what you bring." },
  { icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />, title: "Verify Certificates", desc: "Upload your professional certificates. Our verification system adds trusted badges visible to all viewers." },
  { icon: <Globe className="w-5 h-5 text-blue-400" />, title: "Get Discovered", desc: "Your profile becomes searchable. Recruiters and companies find you based on your verified skills and certificates." },
];

export default function ForTalent() {
  return (
    <section id="talent" className="w-full py-28 px-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium mb-6">
              For Individuals and Talent
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">
              Your Skills Deserve to Be Seen
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Stop sending CVs into the void. Build a verified talent profile that speaks for itself — trusted by companies, respected by peers, visible to the world.
            </p>
            <div className="space-y-5">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="p-2.5 rounded-xl bg-secondary border border-border shrink-0 mt-0.5">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="rounded-2xl border border-primary/30 bg-card/80 p-7 shadow-2xl shadow-primary/10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-2xl font-black text-white shadow-lg">
                  N
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-foreground text-lg">Nigusu Minale</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-primary/15 text-primary text-[10px] font-bold border border-primary/25">VERIFIED</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Computer Engineering Student</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="mb-5">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-2.5">Top Skills</p>
                <div className="flex flex-wrap gap-2">
                  {["Python", "React", "C/C++", "Linux", "Networking", "Algorithms"].map(s => (
                    <span key={s} className="text-xs px-2.5 py-1 rounded-lg bg-secondary border border-border text-foreground font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mb-2.5">Certificates</p>
                <div className="space-y-2">
                  {["CS50 — Harvard University", "Python for Everybody — Coursera"].map(c => (
                    <div key={c} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-foreground">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-5 border-t border-border flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-mono">Profile views this week</span>
                <span className="text-primary font-bold text-lg">248</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
