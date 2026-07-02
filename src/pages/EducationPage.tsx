import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, BookOpen, GraduationCap, PlayCircle, Clock, Star, Award, Search, Filter, ChevronRight, Users, Loader2, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

const categories = ["All", "Programming", "Web Development", "Data Science", "Networking", "Design", "Backend"];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

// Static featured courses (these are educational content, not DB-backed)
const featuredCourses = [
  {
    id: "c1",
    title: "Introduction to Python Programming",
    instructor: "Dr. Nigusu Minale",
    category: "Programming",
    level: "Beginner",
    duration: "6 weeks",
    lessons: 24,
    students: 1240,
    rating: 4.8,
    description: "Learn Python from scratch. Variables, loops, functions, OOP, and real-world projects tailored for the Ethiopian tech ecosystem.",
    tags: ["Python", "Programming", "Beginner"],
    color: "from-primary to-emerald-600",
  },
  {
    id: "c2",
    title: "React and Modern Frontend Development",
    instructor: "TechAddis Academy",
    category: "Web Development",
    level: "Intermediate",
    duration: "8 weeks",
    lessons: 32,
    students: 856,
    rating: 4.7,
    description: "Build modern web applications with React, TypeScript, Tailwind CSS, and Next.js. Deploy your first Ethiopian startup MVP.",
    tags: ["React", "TypeScript", "Frontend"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "c3",
    title: "Data Science for Ethiopia",
    instructor: "EthioData Labs",
    category: "Data Science",
    level: "Intermediate",
    duration: "10 weeks",
    lessons: 40,
    students: 620,
    rating: 4.9,
    description: "Master data analysis, visualization, and machine learning using Ethiopian datasets. From agriculture to fintech — learn with local context.",
    tags: ["Python", "ML", "Data Analysis"],
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "c4",
    title: "CCNA Network Fundamentals",
    instructor: "Ethio Telecom Academy",
    category: "Networking",
    level: "Beginner",
    duration: "12 weeks",
    lessons: 48,
    students: 2100,
    rating: 4.6,
    description: "Prepare for CCNA certification. Learn networking fundamentals, Cisco configurations, and enterprise network design.",
    tags: ["Networking", "Cisco", "CCNA"],
    color: "from-orange-500 to-amber-500",
  },
  {
    id: "c5",
    title: "UI/UX Design Principles",
    instructor: "CreativeHub ET",
    category: "Design",
    level: "Beginner",
    duration: "5 weeks",
    lessons: 20,
    students: 430,
    rating: 4.8,
    description: "Learn design thinking, user research, wireframing, and prototyping in Figma. Create designs that work for Ethiopian users.",
    tags: ["Figma", "Design", "UX"],
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "c6",
    title: "Backend Development with Node.js",
    instructor: "Dr. Nigusu Minale",
    category: "Backend",
    level: "Advanced",
    duration: "8 weeks",
    lessons: 30,
    students: 380,
    rating: 4.7,
    description: "Build APIs, work with databases, implement authentication, and deploy scalable backends. Perfect for aspiring full-stack developers.",
    tags: ["Node.js", "PostgreSQL", "API"],
    color: "from-emerald-500 to-teal-500",
  },
];

export default function EducationPage() {
  const { isLoggedIn, user } = useAuth();
  const [userEducation, setUserEducation] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [catFilter, setCatFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAddEdu, setShowAddEdu] = useState(false);
  const [eduForm, setEduForm] = useState({ institutionName: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", description: "" });
  const [eduError, setEduError] = useState("");

  useEffect(() => {
    const fetchEducation = async () => {
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }
      const result = await api.getEducation();
      if (result.data?.education) {
        setUserEducation(result.data.education);
      }
      setLoading(false);
    };
    fetchEducation();
  }, [isLoggedIn]);

  const filtered = featuredCourses.filter((c) => {
    const matchCat = catFilter === "All" || c.category === catFilter;
    const matchLevel = levelFilter === "All" || c.level === levelFilter;
    const matchSearch = search === "" || c.title.toLowerCase().includes(search.toLowerCase()) || c.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchLevel && matchSearch;
  });

  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    setEduError("");
    if (!eduForm.institutionName || !eduForm.degree) {
      setEduError("Institution name and degree are required.");
      return;
    }
    const result = await api.addEducation(eduForm);
    if (result.error) {
      setEduError(result.error);
    } else if (result.data) {
      setUserEducation(prev => [...prev, result.data]);
      setEduForm({ institutionName: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", description: "" });
      setShowAddEdu(false);
    }
  };

  const handleDeleteEducation = async (id: string) => {
    const result = await api.deleteEducation(id);
    if (!result.error) {
      setUserEducation(prev => prev.filter(e => e.id !== id));
    }
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pt-8 pb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
          <>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-black text-primary-foreground text-lg shadow-lg shadow-primary/30">
              <GraduationCap size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-foreground">EMSTS Education Hub</h1>
              <p className="text-sm text-muted-foreground">Learn, grow, and get certified — built for Ethiopian learners</p>
            </div>
          </div>

          {/* My Education Records */}
          {isLoggedIn && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-foreground">My Education Records</h2>
                <button
                  onClick={() => setShowAddEdu(!showAddEdu)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
                >
                  <Plus size={14} />
                  Add Education
                </button>
              </div>

              {showAddEdu && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  onSubmit={handleAddEducation}
                  className="rounded-2xl border border-border/50 bg-card/60 p-6 mb-4 space-y-4"
                >
                  {eduError && (
                    <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-2">{eduError}</div>
                  )}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Institution Name *</label>
                      <input
                        value={eduForm.institutionName}
                        onChange={(e) => setEduForm(prev => ({ ...prev, institutionName: e.target.value }))}
                        placeholder="Addis Ababa University"
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/40 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Degree *</label>
                      <input
                        value={eduForm.degree}
                        onChange={(e) => setEduForm(prev => ({ ...prev, degree: e.target.value }))}
                        placeholder="B.Sc. Computer Science"
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/40 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Field of Study</label>
                      <input
                        value={eduForm.fieldOfStudy}
                        onChange={(e) => setEduForm(prev => ({ ...prev, fieldOfStudy: e.target.value }))}
                        placeholder="Software Engineering"
                        className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/40 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Start Date</label>
                        <input
                          type="date"
                          value={eduForm.startDate}
                          onChange={(e) => setEduForm(prev => ({ ...prev, startDate: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">End Date</label>
                        <input
                          type="date"
                          value={eduForm.endDate}
                          onChange={(e) => setEduForm(prev => ({ ...prev, endDate: e.target.value }))}
                          className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-widest font-mono text-muted-foreground">Description</label>
                    <textarea
                      value={eduForm.description}
                      onChange={(e) => setEduForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Additional details about your studies..."
                      rows={2}
                      className="w-full px-4 py-2.5 rounded-xl border border-border/60 bg-secondary/40 text-foreground placeholder:text-muted-foreground/40 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity">
                    Save Education Record
                  </button>
                </motion.form>
              )}

              <div className="space-y-3 mb-8">
                {userEducation.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No education records yet. Click "Add Education" to get started.
                  </div>
                ) : (
                  userEducation.map((edu) => (
                    <div key={edu.id} className="rounded-xl border border-border/50 bg-card/60 p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                        <GraduationCap size={18} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-foreground text-sm">{edu.degree}</h3>
                        <p className="text-sm text-muted-foreground">{edu.institutionName}</p>
                        {edu.fieldOfStudy && <p className="text-xs text-muted-foreground mt-1">{edu.fieldOfStudy}</p>}
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          {edu.startDate && <span>{edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : " - Present"}</span>}
                        </div>
                        {edu.description && <p className="text-xs text-muted-foreground mt-2">{edu.description}</p>}
                      </div>
                      <button
                        onClick={() => handleDeleteEducation(edu.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-all shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Featured banner */}
          <div className="mt-8 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-emerald-500/5 p-8 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-primary/10 rounded-full blur-[80px]" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg">
                <BookOpen size={28} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-black text-foreground mb-1">Free Courses for Ethiopian Talent</h2>
                <p className="text-sm text-muted-foreground max-w-xl">
                  Learn from industry experts, earn certificates, and build your EMSTS profile. All courses are designed with the Ethiopian context in mind.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <div className="flex items-center gap-1.5 text-sm text-primary font-bold">
                  <Award size={16} />
                  <span>6 Courses</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-yellow-400 font-bold">
                  <Users size={16} />
                  <span>5,400+ Students</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search courses, topics, or skills..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCatFilter(c)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                    catFilter === c
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                      : "bg-secondary/40 text-muted-foreground border-border/50 hover:border-primary/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mb-8">
            <Filter size={14} className="text-muted-foreground mt-2" />
            {levels.map((l) => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  levelFilter === l
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/40 text-muted-foreground border-border/50 hover:border-primary/40"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`h-2 bg-gradient-to-r ${course.color}`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${
                      course.level === "Beginner" ? "text-primary bg-primary/10 border-primary/20" :
                      course.level === "Intermediate" ? "text-blue-400 bg-blue-400/10 border-blue-400/20" :
                      "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
                    }`}>
                      {course.level}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-yellow-400 font-bold">
                      <Star size={12} fill="currentColor" /> {course.rating}
                    </div>
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {course.tags.map((t) => (
                      <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/40 text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Clock size={12} />{course.duration}</span>
                      <span className="flex items-center gap-1"><PlayCircle size={12} />{course.lessons} lessons</span>
                    </div>
                    <span className="flex items-center gap-1"><Users size={12} />{course.students}</span>
                  </div>
                  <button
                    onClick={() => setExpanded(expanded === course.id ? null : course.id)}
                    className="w-full mt-4 py-2.5 rounded-xl border border-border/60 text-sm font-semibold text-muted-foreground hover:border-primary/40 hover:text-primary transition-all flex items-center justify-center gap-1"
                  >
                    {expanded === course.id ? "Hide Details" : "View Details"}
                    <ChevronRight size={14} className={`transition-transform ${expanded === course.id ? "rotate-90" : ""}`} />
                  </button>
                  {expanded === course.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-border/40"
                    >
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{course.description}</p>
                      <div className="flex items-center gap-3">
                        {isLoggedIn ? (
                          <Link href="/education" className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold text-center shadow-lg shadow-primary/30 hover:opacity-90">
                            Enroll Now
                          </Link>
                        ) : (
                          <Link href="/login" className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold text-center shadow-lg shadow-primary/30 hover:opacity-90">
                            Sign in to Enroll
                          </Link>
                        )}
                        <button className="px-4 py-2.5 rounded-xl border border-border/60 text-sm text-muted-foreground hover:border-primary/40">
                          Preview
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
