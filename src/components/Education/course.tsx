import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, PlayCircle, Clock, Users, Star, ChevronRight, Search, Filter, Calendar, Award, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { api } from "@/lib/api";

interface Course {
  id: string;
  title: string;
  instructor: string;
  institution: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  reviews: number;
  price: number;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  thumbnail?: string;
  enrolled?: boolean;
  progress?: number;
}

const categories = [
  "All",
  "Programming",
  "Web Development",
  "Data Science",
  "Networking",
  "Design",
  "Backend",
  "Mobile Development",
  "Cloud Computing"
];

const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "newest">("popular");
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await api.getLandingContent();
        if (result.data?.courses) {
          setCourses(result.data.courses);
        }
      } catch (err) {
        console.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses
    .filter((course) => {
      const matchCategory = categoryFilter === "All" || course.category === categoryFilter;
      const matchLevel = levelFilter === "All Levels" || course.level === levelFilter;
      const matchSearch = searchQuery === "" || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchLevel && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.students - a.students;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner": return "text-primary bg-primary/10 border-primary/20";
      case "Intermediate": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "Advanced": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      default: return "text-muted-foreground bg-secondary border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center shadow-lg shadow-primary/30">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">Course Library</h1>
              <p className="text-muted-foreground">Expand your skills with expert-led courses</p>
            </div>
          </div>

          {/* Featured Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="rounded-2xl border border-border/50 bg-card/60 p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Courses</p>
              <p className="text-2xl font-black text-foreground">{courses.length}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Students</p>
              <p className="text-2xl font-black text-primary">{courses.reduce((acc, c) => acc + c.students, 0).toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Average Rating</p>
              <p className="text-2xl font-black text-yellow-400">{(courses.reduce((acc, c) => acc + c.rating, 0) / courses.length).toFixed(1)}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Free Courses</p>
              <p className="text-2xl font-black text-green-500">{courses.filter(c => c.price === 0).length}</p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses, topics, or instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pl-12 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 transition-colors text-base"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap border transition-all ${
                    categoryFilter === cat
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                      : "bg-card/60 text-muted-foreground border-border/60 hover:border-primary/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Filter size={16} className="text-muted-foreground" />
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setLevelFilter(level)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    levelFilter === level
                      ? "bg-secondary text-foreground border-primary/40"
                      : "bg-transparent text-muted-foreground border-border/50 hover:border-primary/30"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Sort and Results */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span> courses
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            {(["popular", "rating", "newest"] as const).map((sort) => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  sortBy === sort
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {sort}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Color bar */}
              <div className={`h-1.5 bg-gradient-to-r ${course.color}`} />

              {/* Thumbnail placeholder */}
              <div className={`h-32 bg-gradient-to-br ${course.color} opacity-20 relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white/50" />
                </div>
                {course.enrolled && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-black/50 text-white text-xs font-medium backdrop-blur-sm">
                    Enrolled
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{course.category}</span>
                </div>

                <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                  {course.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{course.instructor}</p>

                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <PlayCircle size={12} /> {course.lessons}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs mb-4">
                  <div className="flex items-center gap-1 text-yellow-400 font-medium">
                    <Star size={12} fill="currentColor" />
                    <span>{course.rating}</span>
                    <span className="text-muted-foreground">({course.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users size={12} />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                </div>

                {course.enrolled && course.progress !== undefined && course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="text-primary font-medium">{course.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/40">
                  <span className={`text-lg font-black ${course.price === 0 ? "text-green-500" : "text-foreground"}`}>
                    {course.price === 0 ? "Free" : `ETB ${course.price}`}
                  </span>
                  <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    {course.enrolled ? "Continue" : "Enroll"}
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-2">No courses found</p>
            <p className="text-sm text-muted-foreground/70">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}