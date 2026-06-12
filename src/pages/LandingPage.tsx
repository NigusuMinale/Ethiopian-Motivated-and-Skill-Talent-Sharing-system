import React from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Platform from "@/components/sections/Platform";
import ForTalent from "@/components/sections/ForTalent";
import ForCompanies from "@/components/sections/ForCompanies";
import Jobs from "@/components/sections/Jobs";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function LandingPage() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Platform />
        <ForTalent />
        <ForCompanies />
        <Jobs />
        <About />
        <Contact />
      </main>
      <footer className="w-full py-10 border-t border-border/40">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-black text-primary-foreground text-sm">E</div>
            <div>
              <div className="text-sm font-black text-foreground">EMSTS</div>
              <div className="text-[10px] text-muted-foreground font-mono">Ethiopian Motivated and Skill Talent Sharing System</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} EMSTS. Founded by Nigusu Minale. Built in Ethiopia.
          </p>
          <div className="flex gap-5 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Home</a>
            <a href="/education" className="hover:text-primary transition-colors">Education</a>
            <a href="/company/dashboard" className="hover:text-primary transition-colors">Company</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
