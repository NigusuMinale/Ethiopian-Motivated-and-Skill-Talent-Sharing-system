import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  User, 
  Bell, 
  Lock, 
  Palette, 
  Globe, 
  CreditCard,
  Shield,
  Eye,
  EyeOff,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ChevronRight,
  Check,
  X,
  Loader2,
  LogOut,
  Trash2,
  Download
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  avatar?: string;
  dateOfBirth?: string;
  website?: string;
  linkedin?: string;
}

interface NotificationSettings {
  emailUpdates: boolean;
  pushNotifications: boolean;
  courseUpdates: boolean;
  newJobs: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}

interface PrivacySettings {
  profileVisibility: "public" | "connections" | "private";
  showEmail: boolean;
  showLocation: boolean;
  showCertificates: boolean;
  allowMessaging: boolean;
}

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<"profile" | "notifications" | "privacy" | "account">("profile");
  const [loading, setLoading] = useState(false);
  
  const [profile, setProfile] = useState<ProfileData>({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    location: "",
    bio: ""
  });
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailUpdates: true,
    pushNotifications: true,
    courseUpdates: true,
    newJobs: false,
    weeklyDigest: true,
    marketingEmails: false
  });
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "public",
    showEmail: false,
    showLocation: true,
    showCertificates: true,
    allowMessaging: true
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Password change state
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const sections = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "privacy", label: "Privacy & Security", icon: <Shield size={18} /> },
    { id: "account", label: "Account", icon: <Settings size={18} /> },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handlePasswordChange = async () => {
    if (passwords.new !== passwords.confirm) {
      alert("Passwords don't match");
      return;
    }
    if (passwords.new.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setPasswords({ current: "", new: "", confirm: "" });
    alert("Password changed successfully!");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground">Settings</h1>
              <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-64 shrink-0"
          >
            <div className="rounded-2xl border border-border/50 bg-card/60 p-2 lg:sticky lg:top-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeSection === section.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {section.icon}
                  {section.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1"
          >
            {/* Profile Section */}
            {activeSection === "profile" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <h2 className="text-lg font-bold text-foreground mb-6">Profile Information</h2>
                  
                  {/* Avatar */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-primary/30">
                        {profile.name[0]}
                      </div>
                      <button className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
                        <Camera size={14} />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{profile.name}</h3>
                      <p className="text-sm text-muted-foreground">{profile.email}</p>
                      <button className="text-sm text-primary font-medium mt-1 hover:underline">
                        Change avatar
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          value={profile.location}
                          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Bio</label>
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Website</label>
                      <input
                        type="url"
                        value={profile.website || ""}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                        placeholder="https://yourwebsite.com"
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">LinkedIn</label>
                      <input
                        type="text"
                        value={profile.linkedin || ""}
                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                        placeholder="linkedin.com/in/yourprofile"
                        className="w-full px-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Saving...
                        </>
                      ) : saveSuccess ? (
                        <>
                          <Check size={16} />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === "notifications" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <h2 className="text-lg font-bold text-foreground mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    {[
                      { key: "emailUpdates", label: "Email Updates", description: "Receive updates about your account via email" },
                      { key: "pushNotifications", label: "Push Notifications", description: "Get push notifications on your devices" },
                      { key: "courseUpdates", label: "Course Updates", description: "Notifications when courses you're enrolled in are updated" },
                      { key: "newJobs", label: "New Job Alerts", description: "Get notified about new jobs matching your profile" },
                      { key: "weeklyDigest", label: "Weekly Digest", description: "Receive a weekly summary of your learning progress" },
                      { key: "marketingEmails", label: "Marketing Emails", description: "Receive promotional emails about new courses and features" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
                        <div>
                          <h3 className="font-medium text-foreground">{item.label}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <button
                          onClick={() => setNotifications({ 
                            ...notifications, 
                            [item.key]: !notifications[item.key as keyof NotificationSettings] 
                          })}
                          className={`relative w-12 h-7 rounded-full transition-colors ${
                            notifications[item.key as keyof NotificationSettings]
                              ? "bg-primary"
                              : "bg-secondary"
                          }`}
                        >
                          <span 
                            className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                              notifications[item.key as keyof NotificationSettings]
                                ? "translate-x-7"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Section */}
            {activeSection === "privacy" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <h2 className="text-lg font-bold text-foreground mb-6">Privacy Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted-foreground mb-3 block">Profile Visibility</label>
                      <div className="flex gap-3">
                        {(["public", "connections", "private"] as const).map((option) => (
                          <button
                            key={option}
                            onClick={() => setPrivacy({ ...privacy, profileVisibility: option })}
                            className={`flex-1 py-3 px-4 rounded-xl border text-sm font-medium capitalize transition-all ${
                              privacy.profileVisibility === option
                                ? "bg-primary text-primary-foreground border-primary"
                                : "border-border/60 text-muted-foreground hover:border-primary/40"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {privacy.profileVisibility === "public" && "Everyone can see your profile"}
                        {privacy.profileVisibility === "connections" && "Only your connections can see your profile"}
                        {privacy.profileVisibility === "private" && "Only you can see your profile"}
                      </p>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-border/40">
                      {[
                        { key: "showEmail", label: "Show Email", description: "Allow others to see your email address" },
                        { key: "showLocation", label: "Show Location", description: "Display your location on your profile" },
                        { key: "showCertificates", label: "Show Certificates", description: "Make your certificates visible to others" },
                        { key: "allowMessaging", label: "Allow Messaging", description: "Let others send you messages" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground">{item.label}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <button
                            onClick={() => setPrivacy({ 
                              ...privacy, 
                              [item.key]: !privacy[item.key as keyof PrivacySettings] 
                            })}
                            className={`relative w-12 h-7 rounded-full transition-colors ${
                              privacy[item.key as keyof PrivacySettings]
                                ? "bg-primary"
                                : "bg-secondary"
                            }`}
                          >
                            <span 
                              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                                privacy[item.key as keyof PrivacySettings]
                                  ? "translate-x-7"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Change Password */}
                <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <h2 className="text-lg font-bold text-foreground mb-6">Change Password</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwords.current}
                          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                          className="w-full pl-11 pr-12 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwords.new}
                          onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-muted-foreground">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwords.confirm}
                          onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-secondary/40 text-foreground focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handlePasswordChange}
                      disabled={isSaving || !passwords.current || !passwords.new || !passwords.confirm}
                      className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account Section */}
            {activeSection === "account" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <h2 className="text-lg font-bold text-foreground mb-6">Account Actions</h2>
                  
                  <div className="space-y-4">
                    <button className="w-full flex items-center justify-between p-4 rounded-xl border border-border/60 hover:border-primary/40 transition-colors group">
                      <div className="flex items-center gap-4">
                        <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <div className="text-left">
                          <h3 className="font-medium text-foreground">Download My Data</h3>
                          <p className="text-sm text-muted-foreground">Export all your profile and learning data</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>

                    <button 
                      onClick={logout}
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-red-500/30 hover:bg-red-500/10 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <LogOut className="w-5 h-5 text-red-500" />
                        <div className="text-left">
                          <h3 className="font-medium text-red-500">Sign Out</h3>
                          <p className="text-sm text-muted-foreground">Sign out of your account on this device</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-red-500" />
                    </button>

                    <button className="w-full flex items-center justify-between p-4 rounded-xl border border-red-500/30 hover:bg-red-500/10 transition-colors group">
                      <div className="flex items-center gap-4">
                        <Trash2 className="w-5 h-5 text-red-500" />
                        <div className="text-left">
                          <h3 className="font-medium text-red-500">Delete Account</h3>
                          <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Account Info */}
                <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                  <h2 className="text-lg font-bold text-foreground mb-4">Account Information</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-border/40">
                      <span className="text-muted-foreground">Account ID</span>
                      <span className="font-mono text-foreground">{user?.id || "usr_123456"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/40">
                      <span className="text-muted-foreground">Account Type</span>
                      <span className="text-foreground capitalize">{user?.role || "Job Seeker"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/40">
                      <span className="text-muted-foreground">Member Since</span>
                      <span className="text-foreground">January 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}