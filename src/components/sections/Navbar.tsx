import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Menu, X, LogIn, User, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { name: "Platform", href: "#platform" },
  { name: "For Talent", href: "#talent" },
  { name: "For Companies", href: "#companies" },
  { name: "Jobs", href: "#jobs" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = NAV_LINKS.map((link) => document.querySelector(link.href));
      const scrollPos = window.scrollY + 120;
      let current = "";
      sections.forEach((section) => {
        if (section instanceof HTMLElement) {
          if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
            current = `#${section.id}`;
          }
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/60 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center font-black text-primary-foreground text-base shadow-lg shadow-primary/30">
            E
          </div>
          <div className="leading-tight">
            <div className="text-sm font-black text-foreground tracking-tight">EMSTS</div>
            <div className="text-[10px] text-muted-foreground font-mono hidden sm:block">Ethiopian Talent Platform</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={`text-sm font-medium transition-all relative pb-0.5 ${
                active === link.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.name}
              {active === link.href && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                />
              )}
            </a>
          ))}
          <Link href="/education" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Education
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary border border-border">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                  {user?.name?.[0] || <User size={12} />}
                </div>
                <span className="text-xs font-medium text-foreground">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary border border-border transition-all"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl border border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground transition-all">
                <LogIn size={14} />
                Sign In
              </Link>
              <Link href="/register" className="flex items-center px-4 py-2 text-sm font-bold rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity">
                Join
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-foreground p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/97 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <nav className="flex flex-col items-center py-6 gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => { setActive(link.href); setMobileMenuOpen(false); }}
                  className={`text-base font-medium ${active === link.href ? "text-primary" : "text-muted-foreground"}`}
                >
                  {link.name}
                </a>
              ))}
              <Link href="/education" className="text-base font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                Education
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex items-center gap-2 text-base font-medium text-red-400"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              ) : (
                <div className="flex flex-col gap-3 w-full px-8">
                  <Link href="/login" className="w-full py-2.5 text-center text-base font-medium rounded-xl border border-border/60 text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link href="/register" className="w-full py-2.5 text-center text-base font-bold rounded-xl bg-primary text-primary-foreground" onClick={() => setMobileMenuOpen(false)}>
                    Create Account
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
