import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  GraduationCap, 
  Award, 
  BookOpen, 
  User, 
  Settings,
  ArrowRight,
  Zap,
  Users,
  Award as AwardIcon,
  Star,
  CheckCircle2
} from "lucide-react";

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">EMSTS Education Hub</h1>
              <p className="text-muted-foreground">Learn, grow, and get certified — built for Ethiopian learners</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <BookOpen size={20} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Courses</span>
              </div>
              <p className="text-2xl font-black text-foreground">6+</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500">
                  <Star size={20} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Rating</span>
              </div>
              <p className="text-2xl font-black text-yellow-500">4.8</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <Users size={20} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Students</span>
              </div>
              <p className="text-2xl font-black text-blue-500">5,400+</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                  <CheckCircle2 size={20} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Certificates</span>
              </div>
              <p className="text-2xl font-black text-green-500">142</p>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <Link href="/education/courses" className="group rounded-2xl border border-border/50 bg-card/60 p-6 hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Browse Courses</h3>
            <p className="text-sm text-muted-foreground mb-4">Explore our library of expert-led courses tailored for the Ethiopian tech ecosystem.</p>
            <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Start Learning <ArrowRight size={14} />
            </span>
          </Link>

          <Link href="/education/certificates" className="group rounded-2xl border border-border/50 bg-card/60 p-6 hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-2">My Certificates</h3>
            <p className="text-sm text-muted-foreground mb-4">View and showcase your verified credentials and professional achievements.</p>
            <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              View Certificates <ArrowRight size={14} />
            </span>
          </Link>

          <Link href="/education/settings" className="group rounded-2xl border border-border/50 bg-card/60 p-6 hover:border-primary/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-foreground mb-2">Settings</h3>
            <p className="text-sm text-muted-foreground mb-4">Manage your learning preferences, notifications, and account settings.</p>
            <span className="text-primary text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
              Configure <ArrowRight size={14} />
            </span>
          </Link>
        </motion.div>

        {/* Featured Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-10 rounded-3xl bg-gradient-to-br from-primary/10 via-emerald-500/5 to-yellow-500/10 border border-primary/20 p-8 overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="text-2xl font-black text-foreground mb-3">Start Your Learning Journey Today</h2>
              <p className="text-muted-foreground mb-6 max-w-xl">
                Join thousands of Ethiopian professionals enhancing their skills with our industry-leading courses. 
                Earn verified certificates and boost your career.
              </p>
              <div className="flex gap-3">
                <Link href="/education/courses" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90">
                  Browse Courses
                </Link>
                <Link href="/education/certificates" className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-foreground font-semibold text-sm hover:bg-white/20">
                  View Certificates
                </Link>
              </div>
            </div>
            <div className="flex gap-4 shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-yellow-400/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <span className="text-xs font-bold text-foreground">Fast Learning</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-xs font-bold text-foreground">Verified Certs</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-bold text-foreground">Community</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}