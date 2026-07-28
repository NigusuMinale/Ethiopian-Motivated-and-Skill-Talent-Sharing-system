import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Award,
  GraduationCap,
  Edit2,
  Save,
  Camera,
  Star,
  CheckCircle2,
  Globe,
  Link2,
  Github,
  Loader2,
  Eye,
  EyeOff,
  Link,
  Clock
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

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
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  verified: boolean;
}

export default function TalentProfile() {
  const { user, isLoggedIn } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<WorkExperience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (user) {
          const result = await api.getTalentProfile(user.id);
          if (result.data) {
            setProfile(result.data.profile);
            setSkills(result.data.skills || []);
            setExperiences(result.data.experiences || []);
            setEducation(result.data.education || []);
          }
        }
      } catch (err) {
        console.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
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
            <User className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground mb-3">My Profile</h1>
          <p className="text-muted-foreground mb-6">Sign in to view and edit your profile.</p>
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

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case "beginner": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "intermediate": return "text-green-400 bg-green-400/10 border-green-400/20";
      case "advanced": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "expert": return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      default: return "text-muted-foreground bg-secondary border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="rounded-3xl border border-border/50 bg-card/60 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary via-emerald-500 to-blue-500" />
            <div className="px-8 pb-8">
              <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-4xl font-black shadow-xl border-4 border-card">
                    {profile?.name?.[0] || user?.name?.[0] || "U"}
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary">
                      <Camera size={14} />
                    </button>
                  )}
                </div>

                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile?.name || ""}
                      onChange={(e) => setProfile({ ...profile!, name: e.target.value })}
                      className="text-2xl font-black text-foreground bg-transparent border-b border-primary focus:outline-none w-full"
                    />
                  ) : (
                    <h1 className="text-2xl font-black text-foreground">{profile?.name || user?.name}</h1>
                  )}
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile?.title || ""}
                      onChange={(e) => setProfile({ ...profile!, title: e.target.value })}
                      className="text-lg text-muted-foreground bg-transparent border-b border-border focus:border-primary focus:outline-none w-full mt-1"
                      placeholder="Your job title"
                    />
                  ) : (
                    <p className="text-lg text-muted-foreground">{profile?.title || "Add your job title"}</p>
                  )}
                </div>

                <button
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  disabled={saving}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-lg transition-all ${
                    isEditing 
                      ? "bg-green-500 text-white shadow-green-500/30 hover:opacity-90" 
                      : "bg-primary text-primary-foreground shadow-primary/30 hover:opacity-90"
                  }`}
                >
                  {saving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : isEditing ? (
                    <>
                      <Save size={16} />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit2 size={16} />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border/50 bg-card/60 p-6"
            >
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
                {profile?.website && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <a href={profile.website} className="text-sm text-primary hover:underline">{profile.website}</a>
                  </div>
                )}
                {profile?.linkedin && (
                  <div className="flex items-center gap-3">
                    <Link2 className="w-4 h-4 text-muted-foreground" />
                    <a href={`https://${profile.linkedin}`} className="text-sm text-primary hover:underline">{profile.linkedin}</a>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border/50 bg-card/60 p-6"
            >
              <h2 className="font-bold text-foreground mb-4">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill.name} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{skill.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${getSkillLevelColor(skill.level)}`}>
                        {skill.level}
                      </span>
                      {skill.verified && <CheckCircle2 size={12} className="text-green-500" />}
                    </div>
                  </div>
                ))}
                {skills.length === 0 && (
                  <p className="text-sm text-muted-foreground">No skills added yet</p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-border/50 bg-card/60 p-6"
            >
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
            </motion.div>

            {/* Work Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="rounded-2xl border border-border/50 bg-card/60 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground">Work Experience</h2>
                {isEditing && (
                  <button className="text-sm text-primary font-medium">+ Add</button>
                )}
              </div>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </p>
                    </div>
                  </div>
                ))}
                {experiences.length === 0 && (
                  <p className="text-sm text-muted-foreground">No work experience added yet</p>
                )}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-border/50 bg-card/60 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-foreground">Education</h2>
                {isEditing && (
                  <button className="text-sm text-primary font-medium">+ Add</button>
                )}
              </div>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {edu.field} • {edu.startDate} - {edu.endDate || "Present"}
                      </p>
                    </div>
                  </div>
                ))}
                {education.length === 0 && (
                  <p className="text-sm text-muted-foreground">No education added yet</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}