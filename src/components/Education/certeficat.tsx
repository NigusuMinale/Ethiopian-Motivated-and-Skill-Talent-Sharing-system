import React, { useState } from "react";
import { motion } from "framer-motion";
import { Award, CheckCircle2, XCircle, Download, Eye, Calendar, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

interface Certificate {
  id: string;
  title: string;
  institution: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  verified: boolean;
  skills: string[];
  description: string;
  imageUrl?: string;
}

const mockCertificates: Certificate[] = [
  {
    id: "c1",
    title: "CS50: Introduction to Computer Science",
    institution: "Harvard University",
    issueDate: "2025-03-15",
    credentialId: "CS50-2025-12345",
    verified: true,
    skills: ["C", "Python", "SQL", "JavaScript", "HTML", "CSS"],
    description: "Harvard's legendary introduction to computer science course covering algorithms, data structures, and web development.",
    imageUrl: "https://cs50.harvard.edu/x/images/cs50x.png"
  },
  {
    id: "c2",
    title: "AWS Certified Solutions Architect - Associate",
    institution: "Amazon Web Services",
    issueDate: "2025-01-20",
    expiryDate: "2028-01-20",
    credentialId: "AWS-SAA-C03-789012",
    verified: true,
    skills: ["AWS", "Cloud Architecture", "EC2", "S3", "VPC", "IAM"],
    description: "Validates ability to design distributed systems on AWS infrastructure.",
    imageUrl: "https://aws.amazon.com/certification/media/aws-certified-solutions-architect-associate.png"
  },
  {
    id: "c3",
    title: "Google Data Analytics Professional Certificate",
    institution: "Google / Coursera",
    issueDate: "2024-11-10",
    verified: false,
    skills: ["R", "SQL", "Tableau", "Data Visualization", "Data Cleaning"],
    description: "Foundational data analytics skills including spreadsheets, SQL, and data visualization.",
    imageUrl: "https://storage.googleapis.com/images/google-data-analytics-certificate.png"
  },
  {
    id: "c4",
    title: "Python for Everybody Specialization",
    institution: "University of Michigan",
    issueDate: "2025-05-05",
    credentialId: "PY4E-2025-45678",
    verified: true,
    skills: ["Python", "Web Scraping", "JSON", "SQL", "Database Design"],
    description: "Learn to Program and Analyze Data with Python from the University of Michigan.",
    imageUrl: "https://www.python.org/static/community_logos/python-logo-master-v3-TM.png"
  },
  {
    id: "c5",
    title: "CCNA: Introduction to Networks",
    institution: "Cisco Networking Academy",
    issueDate: "2024-09-12",
    verified: false,
    skills: ["Networking", "Cisco IOS", "Routing", "Switching", "VLAN", "NAT"],
    description: "Introduction to networking fundamentals, routers, and switches configuration.",
    imageUrl: "https://www.cisco.com/c/dam/en_us/training-events/eduskill/cisco-netacad/images/ccna-badge.png"
  },
];

export default function CertificatePage() {
  const { user, isLoggedIn } = useAuth();
  const [certificates, setCertificates] = useState<Certificate[]>(mockCertificates);
  const [filter, setFilter] = useState<"all" | "verified" | "pending">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const filteredCertificates = certificates.filter((cert) => {
    const matchesFilter = filter === "all" || 
      (filter === "verified" && cert.verified) || 
      (filter === "pending" && !cert.verified);
    const matchesSearch = searchQuery === "" || 
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.institution.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleVerify = async (certId: string) => {
    // Simulate verification API call
    setCertificates(prev => prev.map(cert => 
      cert.id === certId ? { ...cert, verified: true } : cert
    ));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-foreground">My Certificates</h1>
              <p className="text-muted-foreground">Showcase your verified credentials and achievements</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <Award size={22} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total</p>
                <p className="text-2xl font-black text-foreground">{certificates.length}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Verified</p>
                <p className="text-2xl font-black text-green-500">{certificates.filter(c => c.verified).length}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                <XCircle size={22} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Pending</p>
                <p className="text-2xl font-black text-yellow-500">{certificates.filter(c => !c.verified).length}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search certificates, skills, or institutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3.5 pl-12 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:border-primary/50 transition-colors"
            />
            <Eye className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
          <div className="flex gap-2">
            {(["all", "verified", "pending"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-5 py-3 rounded-xl text-sm font-semibold border transition-all capitalize ${
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                    : "bg-card/60 text-muted-foreground border-border/60 hover:border-primary/40"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCertificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedCert(cert)}
            >
              {/* Header gradient */}
              <div className={`h-2 bg-gradient-to-r ${
                cert.verified 
                  ? "from-green-400 to-emerald-500" 
                  : "from-yellow-400 to-amber-500"
              }`} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-card border border-border flex items-center justify-center">
                    <Award className={`w-6 h-6 ${cert.verified ? "text-green-500" : "text-yellow-500"}`} />
                  </div>
                  {cert.verified ? (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/25 text-green-500 text-xs font-bold">
                      <CheckCircle2 size={12} /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-yellow-500/10 border border-yellow-500/25 text-yellow-500 text-xs font-bold">
                      <XCircle size={12} /> Pending
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{cert.institution}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {cert.skills.slice(0, 4).map((skill) => (
                    <span 
                      key={skill} 
                      className="text-xs font-mono px-2 py-0.5 rounded-lg bg-secondary border border-border text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 4 && (
                    <span className="text-xs font-mono px-2 py-0.5 rounded-lg bg-secondary border border-border text-muted-foreground">
                      +{cert.skills.length - 4}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border/40">
                  <Calendar size={14} />
                  <span>Issued: {new Date(cert.issueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-16">
            <Award className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">No certificates match your search.</p>
          </div>
        )}

        {/* Certificate Detail Modal */}
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-2xl rounded-3xl border border-border/60 bg-card shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`h-3 bg-gradient-to-r ${
                selectedCert.verified 
                  ? "from-green-400 to-emerald-500" 
                  : "from-yellow-400 to-amber-500"
              }`} />
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-card border border-border flex items-center justify-center">
                      <Award className={`w-8 h-8 ${selectedCert.verified ? "text-green-500" : "text-yellow-500"}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-foreground">{selectedCert.title}</h2>
                      <p className="text-muted-foreground">{selectedCert.institution}</p>
                    </div>
                  </div>
                  {selectedCert.verified ? (
                    <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/25 text-green-500 text-sm font-bold">
                      <CheckCircle2 size={18} /> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/25 text-yellow-500 text-sm font-bold">
                      <XCircle size={18} /> Pending Verification
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {selectedCert.description}
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between py-3 border-b border-border/40">
                    <span className="text-sm text-muted-foreground">Issue Date</span>
                    <span className="text-sm font-medium text-foreground">
                      {new Date(selectedCert.issueDate).toLocaleDateString('en-US', { 
                        year: 'numeric', month: 'long', day: 'numeric' 
                      })}
                    </span>
                  </div>
                  {selectedCert.expiryDate && (
                    <div className="flex items-center justify-between py-3 border-b border-border/40">
                      <span className="text-sm text-muted-foreground">Expiry Date</span>
                      <span className="text-sm font-medium text-foreground">
                        {new Date(selectedCert.expiryDate).toLocaleDateString('en-US', { 
                          year: 'numeric', month: 'long', day: 'numeric' 
                        })}
                      </span>
                    </div>
                  )}
                  {selectedCert.credentialId && (
                    <div className="flex items-center justify-between py-3 border-b border-border/40">
                      <span className="text-sm text-muted-foreground">Credential ID</span>
                      <span className="text-sm font-mono text-foreground">{selectedCert.credentialId}</span>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity">
                    <Download size={16} />
                    Download Certificate
                  </button>
                  <button className="px-5 py-3.5 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm hover:border-primary/40 hover:text-primary transition-all flex items-center gap-2">
                    <ExternalLink size={16} />
                    Verify
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