import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Heart, Globe } from "lucide-react";

const values = [
  { icon: <Lightbulb className="w-5 h-5 text-yellow-400" />, title: "Motivated by Vision", desc: "Ethiopia has extraordinary talent the world hasn't discovered yet. EMSTS changes that." },
  { icon: <Heart className="w-5 h-5 text-rose-400" />, title: "Built for Ethiopians", desc: "Designed with the unique context, language, and professional culture of Ethiopia in mind." },
  { icon: <Globe className="w-5 h-5 text-primary" />, title: "Global Standards", desc: "Local heart, global ambition. We bring world-class platform quality to our community." },
];

export default function About() {
  return (
    <section id="about" className="w-full py-28 px-6 relative bg-secondary/20 overflow-hidden">
      <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-primary/6 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium mb-5">
            About EMSTS
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 leading-tight">
            Built by an Ethiopian,<br />for Ethiopia
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            EMSTS was founded with a clear mission: make it possible for every motivated, skilled Ethiopian to be seen, recognized, and connected with the right opportunity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl border border-primary/30 bg-card/80 p-8 shadow-xl shadow-primary/10">
              <div className="flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-4xl font-black text-white shadow-lg shadow-primary/30">
                  N
                </div>
                <div>
                  <h3 className="text-xl font-black text-foreground">Nigusu Minale</h3>
                  <p className="text-primary text-sm font-medium">Founder and CEO, EMSTS</p>
                  <p className="text-muted-foreground text-xs mt-0.5">Computer Engineering Student, Ethiopia</p>
                </div>
              </div>
              <blockquote className="text-muted-foreground leading-relaxed text-base italic border-l-2 border-primary/50 pl-5">
                "I started EMSTS because I saw brilliant people around me who had no way to prove their skills or find the right opportunities. We're fixing that. Ethiopia's talent is world-class — now the world will know it."
              </blockquote>
              <div className="mt-5 pt-5 border-t border-border/50 flex flex-wrap gap-3">
                {["Computer Engineering", "Addis Ababa", "Class of 2026"].map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-lg bg-secondary border border-border text-muted-foreground font-mono">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <h3 className="text-2xl font-black text-foreground mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ethiopia is home to over 120 million people, a rapidly growing technology sector, and a generation of young professionals hungry for opportunity. Yet the tools that connect talent to employers have always been designed elsewhere, for someone else.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              EMSTS is the platform Ethiopia deserves: built here, designed for the local context, and powered by a community that believes in each other's potential.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you are a fresh graduate looking for your first job, a company searching for reliable talent, or a professional who wants to share what they know — EMSTS is your home.
            </p>
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border/50 bg-card/60 p-7 hover:border-primary/30 transition-all duration-300 text-center"
            >
              <div className="inline-flex p-3 rounded-xl bg-secondary border border-border mb-4">
                {v.icon}
              </div>
              <h4 className="font-bold text-foreground mb-2">{v.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
