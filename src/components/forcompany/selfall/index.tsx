import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Briefcase, 
  Building2,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronRight,
  Star,
  Loader2,
  MessageSquare,
  Download,
  UserCheck,
  UserX
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

interface Talent {
  id: string;
  name: string;
  title: string;
  location: string;
  skills: string[];
  experience: number;
  education: string;
  verified: boolean;
  rating: number;
  avatar?: string;
  bio: string;
  availability: "available" | "interviewing" | "unavailable";
  expectedSalary?: string;
  joinedAt: string;
}

export default function CompanyTalentSearch() {
  const { user, isLoggedIn } = useAuth();
  const [talents, setTalents] = useState<Talent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState("");
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null);

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const result = await api.searchTalents({ 
          skills: skillFilter || undefined,
          name: searchQuery || undefined 
        });
        if (result.data) {
          setTalents(result.data);
        }
      } catch (err) {
        console.error("Failed to load talents");
      } finally {
        setLoading(false);
      }
    };
    fetchTalents();
  }, [searchQuery, skillFilter]);

  if (!isLoggedIn || user?.role !== "company") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground mb-3">Talent Search</h1>
          <p className="text-muted-foreground mb-6">Sign in as a company to search and connect with talented professionals.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="/login" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm">Sign In</a>
            <a href="/register" className="px-6 py-3 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm">Register</a>
          </div>
        </div>
      </div>
    );
  }

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "available": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "interviewing": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "unavailable": return "text-muted-foreground bg-secondary border-border";
      default: return "text-muted-foreground bg-secondary border-border";
    }
  };

  const skills = [...new Set(talents.flatMap(t => t.skills))].slice(0, 10);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/30">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">Find Talent</h1>
              <p className="text-muted-foreground">Search and connect with skilled professionals in Ethiopia</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, title, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 text-base"
            />
          </div>
        </motion.div>

        {/* Skills Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => setSkillFilter(skillFilter === skill ? "" : skill)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                skillFilter === skill
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card/60 text-muted-foreground border-border/60 hover:border-primary/40"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : talents.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-2">No talents found</p>
            <p className="text-sm text-muted-foreground/70">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {talents.map((talent, index) => (
              <motion.div
                key={talent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden hover:border-primary/30 transition-all cursor-pointer"
                onClick={() => setSelectedTalent(talent)}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-blue-500/20 border border-primary/20 flex items-center justify-center font-bold text-primary text-lg">
                      {talent.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-foreground">{talent.name}</h3>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getAvailabilityColor(talent.availability)}`}>
                          {talent.availability}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{talent.title}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <MapPin size={12} />
                    <span>{talent.location}</span>
                    <span>•</span>
                    <Briefcase size={12} />
                    <span>{talent.experience} years exp.</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {talent.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="text-xs font-mono px-2 py-0.5 rounded-lg bg-secondary border border-border text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                    {talent.skills.length > 4 && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-secondary border border-border text-muted-foreground">
                        +{talent.skills.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="flex items-center gap-1 text-xs text-yellow-400 font-medium">
                      <Star size={12} fill="currentColor" />
                      <span>{talent.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {talent.verified && <CheckCircle2 size={12} className="text-green-500" />}
                      <span>{talent.verified ? "Verified" : "Unverified"}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Talent Detail Modal */}
        {selectedTalent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedTalent(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-2xl rounded-3xl border border-border/60 bg-card shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-2 bg-gradient-to-r from-primary via-blue-400 to-purple-500" />
              <div className="p-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 border border-primary/20 flex items-center justify-center font-bold text-primary text-2xl">
                    {selectedTalent.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-black text-foreground">{selectedTalent.name}</h2>
                      <span className={`text-xs font-bold uppercase px-3 py-1 rounded-lg border ${getAvailabilityColor(selectedTalent.availability)}`}>
                        {selectedTalent.availability}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-2">{selectedTalent.title}</p>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin size={14} /> {selectedTalent.location}</span>
                      <span className="flex items-center gap-1"><Briefcase size={14} /> {selectedTalent.experience} years</span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-foreground mb-2">About</h3>
                  <p className="text-muted-foreground">{selectedTalent.bio}</p>
                </div>

                <div className="mb-6">
                  <h3 className="font-bold text-foreground mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTalent.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-secondary/40 border border-border/40">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Award size={14} />
                      <span className="text-xs">Education</span>
                    </div>
                    <p className="font-semibold text-foreground">{selectedTalent.education}</p>
                  </div>
                  {selectedTalent.expectedSalary && (
                    <div className="p-4 rounded-xl bg-secondary/40 border border-border/40">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <span className="text-xs">Expected Salary</span>
                      </div>
                      <p className="font-semibold text-foreground">{selectedTalent.expectedSalary}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90 flex items-center justify-center gap-2">
                    <MessageSquare size={16} />
                    Contact
                  </button>
                  <button className="px-5 py-3.5 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm hover:border-primary/40 flex items-center justify-center gap-2">
                    <Download size={16} />
                    Download CV
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