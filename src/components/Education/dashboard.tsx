import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  Award, 
  Clock, 
  TrendingUp, 
  Target, 
  Calendar,
  PlayCircle,
  CheckCircle2,
  ChevronRight,
  Flame,
  Trophy,
  Zap,
  Star,
  Users,
  Video,
  FileText,
  MessageCircle,
  Loader2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

interface EnrolledCourse {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessed: string;
  nextLesson: string;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  target?: number;
}

interface DashboardStats {
  coursesEnrolled: number;
  coursesCompleted: number;
  totalHoursLearned: number;
  currentStreak: number;
  certificatesEarned: number;
  communityPosts: number;
}

export default function EducationDashboard() {
  const { user, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "achievements">("overview");
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    coursesEnrolled: 0,
    coursesCompleted: 0,
    totalHoursLearned: 0,
    currentStreak: 0,
    certificatesEarned: 0,
    communityPosts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const result = await api.getMyApplications();
        // Transform API data to match component needs
        // This will depend on actual API response structure
      } catch (err) {
        console.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const totalProgress = enrolledCourses.length > 0
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 0;

  const unlockedAchievements = achievements.filter(a => a.unlockedAt).length;

  const tabs = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
    { id: "courses", label: "My Courses", icon: <BookOpen size={16} /> },
    { id: "achievements", label: "Achievements", icon: <Trophy size={16} /> },
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30">
              <LayoutDashboard className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">Learning Dashboard</h1>
              <p className="text-muted-foreground">Track your progress and achievements</p>
            </div>
          </div>

          {/* Welcome Banner */}
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-emerald-500/5 to-yellow-500/10 border border-primary/20 p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground mb-1">
                  Welcome back, {user?.name || "Learner"}
                </h2>
                <p className="text-muted-foreground">
                  You're on a {stats.currentStreak}-day learning streak. Keep it up!
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500/20 border border-orange-500/30">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-orange-500">{stats.currentStreak} days</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/20 border border-yellow-500/30">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-yellow-500">{totalProgress}%</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="rounded-2xl border border-border/50 bg-card/60 p-5 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <BookOpen size={20} />
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Enrolled</span>
            </div>
            <p className="text-3xl font-black text-foreground">{stats.coursesEnrolled}</p>
            <p className="text-xs text-muted-foreground mt-1">courses</p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/60 p-5 hover:border-green-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500">
                <CheckCircle2 size={20} />
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Completed</span>
            </div>
            <p className="text-3xl font-black text-green-500">{stats.coursesCompleted}</p>
            <p className="text-xs text-muted-foreground mt-1">courses</p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/60 p-5 hover:border-yellow-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                <Clock size={20} />
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Hours</span>
            </div>
            <p className="text-3xl font-black text-yellow-500">{stats.totalHoursLearned}</p>
            <p className="text-xs text-muted-foreground mt-1">learned</p>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card/60 p-5 hover:border-purple-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500">
                <Award size={20} />
              </div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Certificates</span>
            </div>
            <p className="text-3xl font-black text-purple-500">{stats.certificatesEarned}</p>
            <p className="text-xs text-muted-foreground mt-1">earned</p>
            <button className="text-xs text-muted-foreground mt-nigus">view</button>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border/40 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
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
            {/* Continue Learning */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Continue Learning</h3>
                <button className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              
              <div className="space-y-4">
                {enrolledCourses.filter(c => c.progress < 100).map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl border border-border/50 bg-card/60 p-5 hover:border-primary/30 transition-all group cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shrink-0`}>
                        <PlayCircle className="w-7 h-7 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">{course.instructor}</p>
                        
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <PlayCircle size={12} /> {course.completedLessons}/{course.totalLessons} lessons
                          </span>
                          <span>•</span>
                          <span>Last accessed {course.lastAccessed}</span>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-bold text-primary">{course.progress}%</span>
                        </div>
                      </div>
                      
                      <button className="shrink-0 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/25 hover:opacity-90 transition-opacity">
                        Continue
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements Preview */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Recent Achievements</h3>
                <button className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ChevronRight size={14} />
                </button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                {achievements.filter(a => a.unlockedAt).slice(0, 3).map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-2xl border border-yellow-500/30 bg-yellow-500/5 p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center text-xl">
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                    <p className="text-xs text-yellow-500/70">
                      Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
                    </p>
                  </motion.div>
                ))}

                {achievements.filter(a => !a.unlockedAt).slice(0, 1).map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl border border-border/50 bg-card/60 p-5"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-xl opacity-50">
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-muted-foreground">{achievement.title}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                    {achievement.target && (
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground font-medium">{achievement.progress}/{achievement.target}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${(achievement.progress! / achievement.target!) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Learning Activity */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-4">This Week's Activity</h3>
              <div className="rounded-2xl border border-border/50 bg-card/60 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-foreground">5 hours learned</span>
                  </div>
                  <span className="text-sm text-green-500 font-medium">+20% vs last week</span>
                </div>
                <div className="flex items-end justify-between h-32 gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                    const heights = [60, 80, 45, 90, 70, 30, 55];
                    return (
                      <div key={day} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-gradient-to-t from-primary to-emerald-500 rounded-t-lg transition-all hover:opacity-80"
                          style={{ height: `${heights[i]}%` }}
                        />
                        <span className="text-xs text-muted-foreground">{day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrolledCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden hover:border-primary/30 transition-all group"
                >
                  <div className={`h-1.5 bg-gradient-to-r ${course.color}`} />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                        course.progress === 100 
                          ? "text-green-500 bg-green-500/10 border-green-500/20" 
                          : "text-primary bg-primary/10 border-primary/20"
                      }`}>
                        {course.progress === 100 ? "Completed" : "In Progress"}
                      </span>
                      <span className="text-xs text-muted-foreground">{course.lastAccessed}</span>
                    </div>
                    
                    <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">{course.instructor}</p>
                    
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium text-foreground">{course.completedLessons}/{course.totalLessons} lessons</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    {course.progress < 100 && (
                      <div className="pt-4 border-t border-border/40">
                        <p className="text-xs text-muted-foreground mb-2">Next: {course.nextLesson}</p>
                        <button className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
                          Continue Learning
                        </button>
                      </div>
                    )}
                    
                    {course.progress === 100 && (
                      <button className="w-full py-2.5 rounded-xl border border-green-500/30 text-green-500 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-500/10 transition-colors">
                        <Award size={16} />
                        View Certificate
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {achievements.map((achievement, index) => {
                const isUnlocked = !!achievement.unlockedAt;
                const progress = achievement.target ? (achievement.progress || 0) / achievement.target : 0;
                
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`rounded-2xl border p-5 transition-all ${
                      isUnlocked
                        ? "border-yellow-500/30 bg-yellow-500/5"
                        : "border-border/50 bg-card/60"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        isUnlocked ? "bg-yellow-500/20" : "bg-secondary"
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold mb-1 ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                        
                        {isUnlocked ? (
                          <span className="text-xs text-yellow-500/70 flex items-center gap-1">
                            <Star size={12} className="fill-yellow-500" />
                            Unlocked {new Date(achievement.unlockedAt!).toLocaleDateString()}
                          </span>
                        ) : achievement.target ? (
                          <div>
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Progress</span>
                              <span className="text-foreground font-medium">{achievement.progress}/{achievement.target}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${progress * 100}%` }}
                              />
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}