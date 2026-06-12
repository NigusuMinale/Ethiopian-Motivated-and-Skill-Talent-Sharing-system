import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, GitBranch, Link2, Send, ExternalLink } from "lucide-react";

const links = [
  { label: "Email", value: "nigusu@emsts.et", href: "mailto:nigusu@emsts.et", icon: <Mail className="w-5 h-5" /> },
  { label: "GitHub", value: "github.com/nigusuminale", href: "https://github.com", icon: <GitBranch className="w-5 h-5" /> },
  { label: "LinkedIn", value: "linkedin.com/in/nigusuminale", href: "https://linkedin.com", icon: <Link2 className="w-5 h-5" /> },
  { label: "Twitter / X", value: "@emsts_et", href: "https://twitter.com", icon: <ExternalLink className="w-5 h-5" /> },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", role: "individual", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[140px]" />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-sm font-medium mb-5">
            Join the Movement
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-5 leading-tight">
            Be Part of EMSTS From Day One
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            We're building Ethiopia's talent platform. Join our waitlist and be among the first to shape this community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h3 className="font-bold text-foreground text-lg mb-1.5">Get in touch</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Have a partnership idea, press inquiry, or just want to say hello? Reach out through any channel below.
              </p>
            </div>
            <div className="space-y-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:border-primary/40 hover:bg-primary/5 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-secondary border border-border group-hover:bg-primary/10 group-hover:border-primary/25 transition-colors">
                    <span className="text-muted-foreground group-hover:text-primary transition-colors">{link.icon}</span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">{link.label}</p>
                    <p className="text-foreground font-medium text-sm">{link.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="rounded-2xl border border-primary/30 bg-card/80 overflow-hidden shadow-xl shadow-primary/10">
              <div className="h-[3px] bg-gradient-to-r from-primary via-emerald-400 to-yellow-400" />
              <div className="p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto">
                      <Send className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-black text-foreground">You're on the list!</h3>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                      Welcome to EMSTS. We'll reach out as soon as we launch. Thank you for believing in this mission.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <h3 className="font-black text-foreground text-lg mb-1">Join the Waitlist</h3>
                      <p className="text-muted-foreground text-xs">Be first when we launch.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Full Name</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/40 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Email</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@email.com"
                          required
                          className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/40 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">I am joining as</label>
                      <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none"
                      >
                        <option value="individual">An individual / talent</option>
                        <option value="company">A company / business</option>
                        <option value="jobseeker">A job seeker</option>
                        <option value="partner">A potential partner</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Message (optional)</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us what you're hoping to do on EMSTS..."
                        rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/40 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
                    >
                      Join Waitlist
                      <Send size={16} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
