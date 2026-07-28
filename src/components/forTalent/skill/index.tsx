import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Search, 
  Plus, 
  CheckCircle2, 
  XCircle,
  Award,
  TrendingUp,
  Star,
  Loader2,
  Edit2,
  Trash2,
  Filter,
  BarChart3,
  Shield
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

interface Skill {
  id: string;
  name: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  yearsOfExperience: number;
  verified: boolean;
  endorsements: number;
  certificates: number;
  lastUsed?: string;
}

const skillCategories = [
  "All",
  "Programming Languages",
  "Frontend",
  "Backend",
  "Mobile",
  "Data Science",
  "DevOps",
  "Design",
  "Soft Skills"
];

const mockSkills: Skill[] = [
  { id: "s1", name: "React", category: "Frontend", level: "advanced", yearsOfExperience: 4, verified: true, endorsements: 45, certificates: 2, lastUsed: "2025" },
  { id: "s2", name: "TypeScript", category: "Programming Languages", level: "advanced", yearsOfExperience: 3, verified: true, endorsements: 38, certificates: 1, lastUsed: "2025" },
  { id: "s3", name: "Node.js", category: "Backend", level: "intermediate", yearsOfExperience: 2, verified: false, endorsements: 22, certificates: 0, lastUsed: "2024" },
  { id: "s4", name: "Python", category: "Programming Languages", level: "intermediate", yearsOfExperience: 2, verified: true, endorsements: 30, certificates: 1, lastUsed: "2025" },
  { id: "s5", name: "PostgreSQL", category: "Backend", level: "intermediate", yearsOfExperience: 2, verified: false, endorsements: 15, certificates: 0, lastUsed: "2024" },
  { id: "s6", name: "AWS", category: "DevOps", level: "beginner", yearsOfExperience: 1, verified: false, endorsements: 8, certificates: 1, lastUsed: "2024" },
];

export default function TalentSkills() {
  const { user, isLoggedIn } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // Replace with actual API when available
        // const result = await api.getSkills();
        setSkills(mockSkills);
      } catch (err) {
        console.error("Failed to load skills");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground mb-3">My Skills</h1>
          <p className="text-muted-foreground mb-6">Sign in to manage your skills and certifications.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="/login" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm">Sign In</a>
            <a href="/register" className="px-6 py-3 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm">Register</a>
          </div>
        </div>
      </div>
    );
  }

  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || skill.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "intermediate": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "advanced": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "expert": return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      default: return "text-muted-foreground bg-secondary border-border";
    }
  };

  const getLevelProgress = (level: string) => {
    switch (level) {
      case "beginner": return 25;
      case "intermediate": return 50;
      case "advanced": return 75;
      case "expert": return 100;
      default: return 0;
    }
  };

  // Stats
  const totalSkills = skills.length;
  const verifiedSkills = skills.filter(s => s.verified).length;
  const totalEndorsements = skills.reduce((acc, s) => acc + s.endorsements, 0);
  const avgExperience = skills.length > 0 
    ? Math.round(skills.reduce((acc, s) => acc + s.yearsOfExperience, 0) / skills.length * 10) / 10 
    : 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-foreground">My Skills</h1>
                <p className="text-muted-foreground">Showcase your expertise and get endorsed</p>
              </div>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
            >
              <Plus size={18} />
              Add Skill
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <Zap size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Total Skills</span>
              </div>
              <p className="text-2xl font-black text-foreground">{totalSkills}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                  <Shield size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Verified</span>
              </div>
              <p className="text-2xl font-black text-green-500">{verifiedSkills}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500">
                  <Star size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Endorsements</span>
              </div>
              <p className="text-2xl font-black text-yellow-500">{totalEndorsements}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <TrendingUp size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Avg. Experience</span>
              </div>
              <p className="text-2xl font-black text-blue-500">{avgExperience} yrs</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {skillCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap border transition-all ${
                  categoryFilter === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card/60 text-muted-foreground border-border/60 hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-20">
            <Zap className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-2">No skills found</p>
            <p className="text-sm text-muted-foreground/70 mb-6">Add your skills to get endorsed by others</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm"
            >
              Add Your First Skill
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden hover:border-primary/30 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg text-foreground">{skill.name}</h3>
                        {skill.verified && (
                          <CheckCircle2 size={16} className="text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{skill.category}</p>
                    </div>
                    <span className={`text-xs font-bold uppercase px-3 py-1 rounded-lg border ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>

                  {/* Level Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Proficiency</span>
                      <span className="font-medium text-foreground">{getLevelProgress(skill.level)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-yellow-500 rounded-full transition-all"
                        style={{ width: `${getLevelProgress(skill.level)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star size={14} className="text-yellow-400" />
                        <span>{skill.endorsements} endorsements</span>
                      </div>
                      {skill.certificates > 0 && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Award size={14} className="text-primary" />
                          <span>{skill.certificates} certs</span>
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {skill.yearsOfExperience} yrs exp.
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Add Skill Modal */}
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg rounded-3xl border border-border/60 bg-card shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-2 bg-gradient-to-r from-yellow-400 to-orange-500" />
              <div className="p-8">
                <h2 className="text-xl font-black text-foreground mb-6">Add New Skill</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Skill Name</label>
                    <input
                      type="text"
                      placeholder="e.g. React, Python, AWS"
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Category</label>
                    <select className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground focus:outline-none focus:border-primary/50">
                      {skillCategories.filter(c => c !== "All").map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Proficiency Level</label>
                    <div className="grid grid-cols-4 gap-2">
                      {["beginner", "intermediate", "advanced", "expert"].map((level) => (
                        <button
                          key={level}
                          className="py-2 rounded-xl text-xs font-medium capitalize border border-border/60 hover:border-primary/40 transition-all"
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Years of Experience</label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 3"
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-3.5 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm hover:border-primary/40 transition-all"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90">
                    Add Skill
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}