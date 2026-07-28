import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign,
  Filter,
  ChevronRight,
  Star,
  Briefcase as BriefcaseIcon,
  Calendar,
  Loader2,
  TrendingUp,
  Users,
  Award,
  CheckCircle2
} from "lucide-react";
import { api } from "@/lib/api";
import { Link } from "wouter";

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  salary: string;
  postedAt: string;
  tags: string[];
  description: string;
  requirements: string[];
  rating: number;
  applicants: number;
}

const mockEngineeringJobs: Job[] = [
  {
    id: "eng1",
    title: "Senior React Developer",
    company: "TechAddis Solutions",
    companyLogo: "TA",
    location: "Addis Ababa",
    type: "Full-time",
    salary: "ETB 50K - 80K",
    postedAt: "2 days ago",
    tags: ["React", "TypeScript", "Node.js", "AWS"],
    description: "We are looking for an experienced React developer to lead our frontend team.",
    requirements: ["5+ years React experience", "TypeScript expertise", "REST API integration"],
    rating: 4.8,
    applicants: 45
  },
  {
    id: "eng2",
    title: "Backend Engineer",
    company: "FinTech Ethiopia",
    companyLogo: "FE",
    location: "Addis Ababa",
    type: "Full-time",
    salary: "ETB 60K - 90K",
    postedAt: "5 days ago",
    tags: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    description: "Build scalable backend systems for our financial services platform.",
    requirements: ["Node.js experience", "Database design", "Microservices architecture"],
    rating: 4.7,
    applicants: 32
  },
  {
    id: "eng3",
    title: "Full Stack Developer",
    company: "CreativeHub ET",
    companyLogo: "CH",
    location: "Hybrid",
    type: "Full-time",
    salary: "ETB 45K - 70K",
    postedAt: "1 week ago",
    tags: ["React", "Node.js", "GraphQL", "MongoDB"],
    description: "Join our innovative team building cutting-edge web applications.",
    requirements: ["Full stack experience", "Problem-solving skills", "Team collaboration"],
    rating: 4.9,
    applicants: 28
  },
  {
    id: "eng4",
    title: "DevOps Engineer",
    company: "CloudTech ET",
    companyLogo: "CT",
    location: "Remote",
    type: "Full-time",
    salary: "ETB 55K - 85K",
    postedAt: "3 days ago",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    description: "Manage our cloud infrastructure and deployment pipelines.",
    requirements: ["AWS experience", "Container orchestration", "Automated testing"],
    rating: 4.6,
    applicants: 19
  },
  {
    id: "eng5",
    title: "Mobile Developer",
    company: "Addis Tech Hub",
    companyLogo: "ATH",
    location: "Addis Ababa",
    type: "Full-time",
    salary: "ETB 40K - 65K",
    postedAt: "4 days ago",
    tags: ["Flutter", "React Native", "Firebase"],
    description: "Build cross-platform mobile applications for Ethiopian market.",
    requirements: ["Flutter or React Native", "Mobile UI/UX", "API integration"],
    rating: 4.5,
    applicants: 24
  }
];

export default function EngineeringJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await api.getJobs();
        if (result.data?.jobs) {
          setJobs(result.data.jobs.filter(j => j.tags.some(t => ["React", "Node.js", "AWS", "Docker", "Flutter", "Kubernetes"].includes(t))));
        } else {
          setJobs(mockEngineeringJobs);
        }
      } catch (err) {
        setJobs(mockEngineeringJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = locationFilter === "" || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    return matchesSearch && matchesLocation;
  });

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
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <BriefcaseIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">Engineering Jobs</h1>
              <p className="text-muted-foreground">Find your next tech opportunity in Ethiopia</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <Briefcase size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Total Jobs</span>
              </div>
              <p className="text-2xl font-black text-foreground">{jobs.length}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                  <Users size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Applicants</span>
              </div>
              <p className="text-2xl font-black text-green-500">{jobs.reduce((acc, j) => acc + j.applicants, 0)}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500">
                  <Star size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Avg Rating</span>
              </div>
              <p className="text-2xl font-black text-yellow-500">{(jobs.reduce((acc, j) => acc + j.rating, 0) / jobs.length || 0).toFixed(1)}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                  <TrendingUp size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Top Skills</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {["React", "Node.js", "AWS", "Docker"].map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search engineering jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-2">
            {["All", "Addis Ababa", "Remote", "Hybrid"].map((loc) => (
              <button
                key={loc}
                onClick={() => setLocationFilter(loc === "All" ? "" : loc.toLowerCase())}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  locationFilter === loc.toLowerCase() || (loc === "All" && locationFilter === "")
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card/60 text-muted-foreground border-border/60 hover:border-primary/40"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden hover:border-primary/30 transition-all cursor-pointer group"
              >
                <Link href={`/jobs/${job.id}`} className="block">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center font-bold text-blue-500 shrink-0">
                        {job.companyLogo}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{job.company} • {job.location}</p>
                          </div>
                          <span className="text-xs text-green-500 font-medium">{job.rating} <Star size={12} className="fill-green-500" /></span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign size={12} /> {job.salary}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {job.postedAt}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={12} /> {job.applicants} applicants
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {job.tags.map((tag) => (
                            <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-lg bg-secondary border border-border text-muted-foreground">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}