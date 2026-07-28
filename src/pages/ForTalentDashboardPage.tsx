import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  User, 
  Zap, 
  Briefcase,
  GraduationCap,
  FileText,
  Clock,
  Award,
  TrendingUp,
  Star,
  Loader2,
  Edit2,
  Save,
  CheckCircle2,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Globe,
  Link2,
  Camera,
  Eye,
  EyeOff,
  Shield,
  BarChart3
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

// Type definitions
type TabType = "overview" | "profile" | "skills" | "experience" | "applications";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  title: string;
  avatar?: string;
  dateOfBirth?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

interface WorkExperience {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
}

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

export default function ForTalentDashboardPage() {
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!user?.id) {
          setLoading(false);
          return;
        }

        // Fetch talent profile data
        const profileResult = await api.getTalentProfile(user.id);
        
        if (profileResult.data) {
          const data = profileResult.data;
          setProfile({
            name: data.profile?.name || user?.name || "",
            email: data.profile?.email || user?.email || "",
            phone: data.profile?.phone || "",
            location: data.profile?.location || "",
            bio: data.profile?.bio || "",
            title: data.profile?.title || "",
            avatar: data.profile?.avatar,
            website: data.profile?.website,
            linkedin: data.profile?.linkedin,
          });
          
          setSkills(data.skills || []);
          setExperiences(data.experiences || []);
          setEducation(data.education || []);
        } else {
          // Set default profile if API fails
          setProfile({
            name: user?.name || "",
            email: user?.email || "",
            phone: "",
            location: "",
            bio: "Add a bio to tell companies about yourself",
            title: "Add your job title",
          });
        }
      } catch (err) {
        console.error("Failed to load talent dashboard data:", err);
        // Set default profile on error
        setProfile({
          name: user?.name || "",
          email: user?.email || "",
          phone: "",
          location: "",
          bio: "Add a bio to tell companies about yourself",
          title: "Add your job title",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // await api.updateTalentProfile(profile);
    } finally {
      setSaving(false);
      setIsEditing(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground mb-3">Talent Dashboard</h1>
          <p className="text-muted-foreground mb-6">Sign in to view and manage your profile.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="/login" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm">Sign In</a>
            <a href="/register" className="px-6 py-3 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm">Register</a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
    { id: "profile", label: "Profile", icon: <User size={16} /> },
    { id: "skills", label: "Skills", icon: <Zap size={16} /> },
    { id: "experience", label: "Experience", icon: <Briefcase size={16} /> },
    { id: "applications", label: "Applications", icon: <FileText size={16} /> },
  ];

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
              <LayoutDashboard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">Talent Dashboard</h1>
              <p className="text-muted-foreground">Manage your profile, skills, and applications</p>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border/40 pb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Profile Preview Card */}
            <div className="rounded-3xl border border-border/50 bg-card/60 overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-primary via-emerald-500 to-blue-500" />
              <div className="px-8 pb-8">
                <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 mb-6">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-4xl font-black shadow-xl border-4 border-card">
                    {profile?.name?.[0] || user?.name?.[0] || "U"}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-black text-foreground">{profile?.name || user?.name}</h2>
                    <p className="text-lg text-muted-foreground">{profile?.title || "Add your job title"}</p>
                  </div>
                  <button
                    onClick={() => { setActiveTab("profile"); setIsEditing(true); }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
                  >
                    <Edit2 size={16} />
                    Edit Profile
                  </button>
                </div>
                <p className="text-muted-foreground">{profile?.bio || "Add a bio to tell companies about yourself"}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-border/50 bg-card/60 p-5 hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <Zap size={20} />
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Skills</span>
                </div>
                <p className="text-3xl font-black text-foreground">{skills.length}</p>
                <p className="text-xs text-muted-foreground mt-1">{skills.filter(s => s.verified).length} verified</p>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/60 p-5 hover:border-green-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500">
                    <Briefcase size={20} />
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Experience</span>
                </div>
                <p className="text-3xl font-black text-green-500">{experiences.length}</p>
                <p className="text-xs text-muted-foreground mt-1">work positions</p>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/60 p-5 hover:border-yellow-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                    <GraduationCap size={20} />
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Education</span>
                </div>
                <p className="text-3xl font-black text-yellow-500">{education.length}</p>
                <p className="text-xs text-muted-foreground mt-1">degrees</p>
              </div>

              <div className="rounded-2xl border border-border/50 bg-card/60 p-5 hover:border-purple-500/30 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500">
                    <Star size={20} />
                  </div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Endorsements</span>
                </div>
                <p className="text-3xl font-black text-purple-500">{skills.reduce((a, s) => a + s.endorsements, 0)}</p>
                <p className="text-xs text-muted-foreground mt-1">total</p>
              </div>
            </div>

            {/* Top Skills */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Top Skills</h3>
                <button onClick={() => setActiveTab("skills")} className="text-sm text-primary font-medium">View All</button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {skills.slice(0, 4).map((skill) => (
                  <div key={skill.id} className="rounded-2xl border border-border/50 bg-card/60 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-foreground">{skill.name}</h4>
                      {skill.verified && <CheckCircle2 size={14} className="text-green-500" />}
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{skill.level}</span>
                      <span>{skill.endorsements} endorsements</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">Recent Work Experience</h3>
              <div className="space-y-3">
                {experiences.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="rounded-2xl border border-border/50 bg-card/60 p-5 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{exp.title}</h4>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Contact Info */}
                <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <h2 className="font-bold text-foreground mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <input
                          type="email"
                          value={profile?.email || ""}
                          onChange={(e) => setProfile({ ...profile!, email: e.target.value })}
                          className="flex-1 bg-transparent border-b border-border focus:border-primary focus:outline-none text-sm"
                        />
                      ) : (
                        <span className="text-sm text-muted-foreground">{profile?.email || user?.email}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profile?.phone || ""}
                          onChange={(e) => setProfile({ ...profile!, phone: e.target.value })}
                          className="flex-1 bg-transparent border-b border-border focus:border-primary focus:outline-none text-sm"
                          placeholder="Phone number"
                        />
                      ) : (
                        <span className="text-sm text-muted-foreground">{profile?.phone || "Add phone"}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile?.location || ""}
                          onChange={(e) => setProfile({ ...profile!, location: e.target.value })}
                          className="flex-1 bg-transparent border-b border-border focus:border-primary focus:outline-none text-sm"
                          placeholder="Location"
                        />
                      ) : (
                        <span className="text-sm text-muted-foreground">{profile?.location || "Add location"}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="md:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-foreground">Basic Information</h2>
                    <button
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      disabled={saving}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold shadow transition-all ${
                        isEditing 
                          ? "bg-green-500 text-white shadow-green-500/30 hover:opacity-90" 
                          : "bg-primary text-primary-foreground shadow-primary/30 hover:opacity-90"
                      }`}
                    >
                      {saving ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Saving...
                        </>
                      ) : isEditing ? (
                        <>
                          <Save size={12} />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit2 size={12} />
                          Edit
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile?.name || ""}
                          onChange={(e) => setProfile({ ...profile!, name: e.target.value })}
                          className="w-full mt-1 bg-transparent border-b border-border focus:border-primary focus:outline-none text-foreground font-semibold"
                        />
                      ) : (
                        <p className="font-semibold text-foreground">{profile?.name || user?.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground uppercase tracking-wider">Job Title</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile?.title || ""}
                          onChange={(e) => setProfile({ ...profile!, title: e.target.value })}
                          className="w-full mt-1 bg-transparent border-b border-border focus:border-primary focus:outline-none text-foreground"
                          placeholder="Your job title"
                        />
                      ) : (
                        <p className="text-foreground">{profile?.title || "Add your job title"}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <h2 className="font-bold text-foreground mb-4">About Me</h2>
                  {isEditing ? (
                    <textarea
                      value={profile?.bio || ""}
                      onChange={(e) => setProfile({ ...profile!, bio: e.target.value })}
                      rows={4}
                      className="w-full bg-transparent border border-border rounded-xl p-3 text-sm focus:border-primary focus:outline-none resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-muted-foreground">{profile?.bio || "Add a bio to tell companies about yourself"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground">Education</h2>
                <button className="text-sm text-primary font-medium">+ Add</button>
              </div>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="flex gap-4 pb-4 border-b border-border/40 last:border-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-xs text-muted-foreground mt-1">{edu.field} • {edu.startDate} - {edu.endDate || "Present"}</p>
                    </div>
                  </div>
                ))}
                {education.length === 0 && (
                  <p className="text-sm text-muted-foreground">No education added yet</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Skills Header Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Zap size={18} />
                  </div>
                  <span className="text-xs text-muted-foreground uppercase">Total Skills</span>
                </div>
                <p className="text-2xl font-black text-foreground">{skills.length}</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                    <Shield size={18} />
                  </div>
                  <span className="text-xs text-muted-foreground uppercase">Verified</span>
                </div>
                <p className="text-2xl font-black text-green-500">{skills.filter(s => s.verified).length}</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500">
                    <Star size={18} />
                  </div>
                  <span className="text-xs text-muted-foreground uppercase">Endorsements</span>
                </div>
                <p className="text-2xl font-black text-yellow-500">{skills.reduce((a, s) => a + s.endorsements, 0)}</p>
              </div>
              <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                    <TrendingUp size={18} />
                  </div>
                  <span className="text-xs text-muted-foreground uppercase">Avg Experience</span>
                </div>
                <p className="text-2xl font-black text-blue-500">
                  {skills.length > 0 ? Math.round(skills.reduce((a, s) => a + s.yearsOfExperience, 0) / skills.length * 10) / 10 : 0} yrs
                </p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4">
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
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity">
                <Plus size={18} />
                Add Skill
              </button>
            </div>

            {/* Category Filter */}
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

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-5">
              {skills.map((skill, index) => {
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

                return (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-2xl border border-border/50 bg-card/60 p-6 hover:border-primary/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg text-foreground">{skill.name}</h3>
                          {skill.verified && <CheckCircle2 size={16} className="text-green-500" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{skill.category}</p>
                      </div>
                      <span className={`text-xs font-bold uppercase px-3 py-1 rounded-lg border ${getLevelColor(skill.level)}`}>
                        {skill.level}
                      </span>
                    </div>

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
                          <span>{skill.endorsements}</span>
                        </div>
                        {skill.certificates > 0 && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Award size={14} className="text-primary" />
                            <span>{skill.certificates}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{skill.yearsOfExperience} yrs</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {skills.length === 0 && (
              <div className="text-center py-20">
                <Zap className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg text-muted-foreground mb-2">No skills added yet</p>
                <p className="text-sm text-muted-foreground/70">Add your skills to get endorsed by others</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Work Experience</h2>
              <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity">
                <Plus size={18} />
                Add Experience
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-border/50 bg-card/60 p-6 hover:border-primary/30 transition-all"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-lg text-foreground">{exp.title}</h3>
                          <p className="text-muted-foreground">{exp.company}</p>
                        </div>
                        <button className="text-muted-foreground hover:text-foreground transition-colors">
                          <Edit2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                      {exp.description && (
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {experiences.length === 0 && (
              <div className="text-center py-20 rounded-2xl border border-border/50 bg-card/60">
                <Briefcase className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg text-muted-foreground mb-2">No work experience added</p>
                <p className="text-sm text-muted-foreground/70 mb-6">Add your work history to build your profile</p>
                <button className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm">
                  Add Experience
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Applications Tab */}
        {activeTab === "applications" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center py-20 rounded-2xl border border-border/50 bg-card/60">
              <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-lg text-muted-foreground mb-2">No applications yet</p>
              <p className="text-sm text-muted-foreground/70 mb-6">Start applying to jobs to see your applications here</p>
              <a href="/dashboard/jobs" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm">
                Browse Jobs
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
