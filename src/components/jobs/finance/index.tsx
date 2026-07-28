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
  Loader2
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

const mockFinanceJobs: Job[] = [
  {
    id: "fin1",
    title: "Financial Analyst",
    company: "Commercial Bank of Ethiopia",
    location: "Addis Ababa",
    type: "Full-time",
    salary: "ETB 35K - 55K",
    postedAt: "1 week ago",
    tags: ["Excel", "SQL", "Financial Modeling", "Reporting"],
    description: "Analyze financial data and provide insights for decision making.",
    requirements: ["Strong Excel skills", "SQL proficiency", "Financial analysis experience"],
    rating: 4.6,
    applicants: 56
  },
  {
    id: "fin2",
    title: "Business Analyst",
    company: "Commercial Bank of Ethiopia",
    location: "Addis Ababa",
    type: "Full-time",
    salary: "ETB 40K - 60K",
    postedAt: "5 days ago",
    tags: ["Business Analysis", "Requirements", "Stakeholder Management"],
    description: "Bridge between business and IT to improve processes.",
    requirements: ["Business analysis experience", "Requirements gathering", "Communication skills"],
    rating: 4.7,
    applicants: 42
  },
  {
    id: "fin3",
    title: "Accountant",
    company: "EthioData Labs",
    location: "Addis Ababa",
    type: "Full-time",
    salary: "ETB 30K - 45K",
    postedAt: "3 days ago",
    tags: ["Accounting", "Tax", "Excel", "QuickBooks"],
    description: "Manage financial records and ensure compliance.",
    requirements: ["Accounting degree", "Tax knowledge", "QuickBooks experience"],
    rating: 4.5,
    applicants: 38
  },
  {
    id: "fin4",
    title: "Data Analyst",
    company: "EthioData Labs",
    location: "Remote",
    type: "Contract",
    salary: "ETB 50K - 75K",
    postedAt: "2 weeks ago",
    tags: ["Python", "SQL", "Data Visualization", "Tableau"],
    description: "Analyze business data and create visual dashboards.",
    requirements: ["Python or SQL", "Data visualization skills", "Business acumen"],
    rating: 4.8,
    applicants: 28
  },
  {
    id: "fin5",
    title: "Audit Associate",
    company: "Deloitte Ethiopia",
    location: "Addis Ababa",
    type: "Full-time",
    salary: "ETB 35K - 50K",
    postedAt: "4 days ago",
    tags: ["Audit", "Compliance", "Risk Management", "Financial Controls"],
    description: "Perform financial audits and risk assessments.",
    requirements: ["Audit experience", "Compliance knowledge", "Analytical skills"],
    rating: 4.9,
    applicants: 31
  }
];

export default function FinanceJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const result = await api.getJobs();
        if (result.data?.jobs) {
          setJobs(result.data.jobs.filter(j => j.tags.some(t => ["Excel", "SQL", "Financial", "Accounting", "Audit", "Business Analysis"].includes(t))));
        } else {
          setJobs(mockFinanceJobs);
        }
      } catch (err) {
        setJobs(mockFinanceJobs);
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">Finance Jobs</h1>
              <p className="text-muted-foreground">Financial opportunities in Ethiopia</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-500">
                  <Briefcase size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Total Jobs</span>
              </div>
              <p className="text-2xl font-black text-foreground">{jobs.length}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <Users size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Applicants</span>
              </div>
              <p className="text-2xl font-black text-blue-500">{jobs.reduce((acc, j) => acc + j.applicants, 0)}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                  <Award size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Top Skills</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {["Excel", "SQL", "Financial", "Analysis"].map(tag => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                  <Clock size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Avg Experience</span>
              </div>
              <p className="text-2xl font-black text-purple-500">3+ yrs</p>
            </div>
          </div>
        </motion.div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search finance jobs..."
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
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-500 shrink-0">
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