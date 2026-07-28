import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MessageCircle,
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
  MoreHorizontal,
  Trash2,
  Edit2,
  UserMinus,
  Shield,
  Award,
  Briefcase
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

interface TalentGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  skills: string[];
  createdAt: string;
  isPublic: boolean;
}

interface GroupMember {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  role: "admin" | "member";
  joinedAt: string;
}

export default function CompanyTalentGroup() {
  const { user, isLoggedIn } = useAuth();
  const [groups, setGroups] = useState<TalentGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<TalentGroup | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        // Replace with actual API
        // const result = await api.getTalentGroups();
      } catch (err) {
        console.error("Failed to load groups");
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  if (!isLoggedIn || user?.role !== "company") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground mb-3">Talent Groups</h1>
          <p className="text-muted-foreground mb-6">Sign in as a company to manage talent groups.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="/login" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm">Sign In</a>
            <a href="/register" className="px-6 py-3 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm">Register</a>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center shadow-lg shadow-primary/30">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-foreground">Talent Groups</h1>
                <p className="text-muted-foreground">Create and manage groups of talented professionals</p>
              </div>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
            >
              <UserPlus size={18} />
              Create Group
            </button>
          </div>
        </motion.div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        {/* Empty State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : groups.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-2">No talent groups yet</p>
            <p className="text-sm text-muted-foreground/70 mb-6">Create a group to organize and manage talented professionals</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm"
            >
              Create Your First Group
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {groups.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden hover:border-primary/30 transition-all cursor-pointer"
                onClick={() => setSelectedGroup(group)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-teal-500/20 border border-primary/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${
                      group.isPublic 
                        ? "text-green-500 bg-green-500/10 border-green-500/20" 
                        : "text-muted-foreground bg-secondary border-border"
                    }`}>
                      {group.isPublic ? "Public" : "Private"}
                    </span>
                  </div>

                  <h3 className="font-bold text-foreground text-lg mb-2">{group.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{group.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {group.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="text-xs font-mono px-2 py-0.5 rounded-lg bg-secondary border border-border text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users size={14} />
                      <span>{group.members} members</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Created {new Date(group.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-lg rounded-3xl border border-border/60 bg-card shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-2 bg-gradient-to-r from-primary to-teal-500" />
              <div className="p-8">
                <h2 className="text-xl font-black text-foreground mb-6">Create Talent Group</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Group Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Frontend Developers Ethiopia"
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Describe this talent group..."
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-muted-foreground">Skills (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. React, TypeScript, Node.js"
                      className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
                    />
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-3.5 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm hover:border-primary/40 transition-all"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90">
                    Create Group
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