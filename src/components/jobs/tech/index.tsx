import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Clock, 
  DollarSign,
  Filter,
  TrendingUp,
  Users,
  Award,
  CheckCircle2,
  Calendar,
  Loader2,
  Code2
} from "lucide-react";
import { api } from "@/lib/api";
import { Link } from "wouter";

interface Job {
  id: string;
  title: string;
  company: string;
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

const mockTechJobs: Job[] = [
  {
    id: "tech1",
    title: "Software Engineer",
    company: "TechAddis Solutions",
    location: "Addis Ababa",
    type: "Full-time",
    salary: "ETB 45K - 70K",
    postedAt: "3 days ago",
    tags: ["Java", "Spring Boot", "Microservices", "Docker"],
    description: "Build scalable enterprise applications using Java and Spring framework.",
    requirements: ["Java experience", "Spring Boot", "Microservices", "Docker"],
    rating: 4.7,
    applicants: 38
  },
  {
    id: "tech2",
    title: "Frontend Developer",
    company: "CreativeHub ET",
    location: "Hybrid",
    type: "Full-time",
    salary: "ETB 35K - 55K",
    postedAt: "1 week ago",
    tags: ["Vue.js", "Tailwind", "Firebase", "GraphQL"],
    description: "Create beautiful user interfaces using modern frontend technologies.",
    requirements: ["Vue.js or React", "CSS/Tailwind", "API integration", "UI/UX sense"],
    rating: 4.8,
    applicants: 31
  },
  {
    id: "tech3",
    title: "DevOps Engineer",
    company: "CloudTech ET",
    location: "Remote",
    type: "Full-time",
    salary: "ETB 50K - 80K",
    postedAt: "5 days ago",
    tags: ["AWS", "Terraform", "Ansible", "CI/CD"],
    description: "Manage infrastructure as code and automated deployment pipelines.",
    requirements: ["AWS expertise", "Terraform", "CI/CD", "Monitoring"],
    rating: 4.9,
    applicants: 22
  },
  {
    id: "tech4",
    title: "Mobile Developer",
    company: "Addis Tech Hub",
    location: "Addis Ababa",
    type: "Full-time",
    salary: "ETB 40K - 60K",
    postedAt: "2 weeks ago",
    tags: ["Android", "Kotlin", "iOS", "Swift"],
    description: "Build native mobile applications for Android and iOS platforms.",
    requirements: ["Kotlin or Swift", "Mobile UI/UX", "App Store submission"],
    rating: 4.6,
    applicants: 28
  },
  {
    id: "tech5",
    title: "Full Stack Developer",
    company: "FinTech Ethiopia",
    location: "Addis Ababa",
    type: "Contract",
    salary: "ETB 60K - 90K",
    postedAt: "4 days ago",
    tags: ["React", "Node.js", "PostgreSQL", "Redis"],
    description: "Join our fintech team building next-generation financial solutions.",
    requirements: ["Full stack experience", "React", "Node.js", "Database skills"],
    rating: 4.8,
    applicants: 45
  }
];

export default function TechJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await api.getJobs();
        if (result.data?.jobs) {
          setJobs(result.data.jobs.filter(j => j.tags.some(t => ["Java", "Python", "JavaScript", "React", "Node.js", "AWS", "Android", "iOS", "DevOps"].includes(t))));
        } else {
          setJobs(mockTechJobs);
        }
      } catch (err) {
        setJobs(mockTechJobs);
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
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Code2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">Tech Jobs</h1>
              <p className="text-muted-foreground">Technology opportunities in Ethiopia</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                  <Briefcase size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Total Jobs</span>
              </div>
              <p className="text-2xl font-black text-foreground">{jobs.length}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-pink-500/10 text-pink-500">
                  <Users size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Applicants</span>
              </div>
              <p className="text-2xl font-black text-pink-500">{jobs.reduce((acc, j) => acc + j.applicants, 0)}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500">
                  <Award size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Top Skills</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {["Java", "Python", "React", "AWS"].map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                  <TrendingUp size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Avg Salary</span>
              </div>
              <p className="text-2xl font-black text-green-500">ETB 50K</p>
            </div>
          </div>
        </motion.div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search tech jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
          />
        </div>

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
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 flex items-center justify-center font-bold text-purple-500 shrink-0">
                        {job.company[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{job.company} • {job.location}</p>
                          </div>
                          <span className="text-xs text-green-500 font-medium">{job.rating} <Award size={12} className="fill-green-500" /></span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>
                          <span className="flex items-center gap-1"><DollarSign size={12} /> {job.salary}</span>
                          <span className="flex items-center gap-1"><Calendar size={12} /> {job.postedAt}</span>
                          <span className="flex items-center gap-1"><Users size={12} /> {job.applicants} applicants</span>
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