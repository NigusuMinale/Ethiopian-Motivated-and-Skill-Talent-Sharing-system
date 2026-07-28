import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Megaphone, 
  Plus, 
  Search, 
  Eye, 
  MousePointerClick,
  TrendingUp, 
  Calendar,
  DollarSign,
  Image,
  Video,
  FileText,
  Edit2,
  Trash2,
  Loader2,
  Pause,
  Play
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";

interface Advertisement {
  id: string;
  title: string;
  type: "banner" | "video" | "text" | "sponsored";
  status: "active" | "paused" | "draft";
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  ctr: number;
  startDate: string;
  endDate?: string;
  targetAudience: string;
  createdAt: string;
}

export default function ProductAdvertisement() {
  const { user, isLoggedIn } = useAuth();
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        // Replace with actual API endpoint when available
        // const result = await api.getAdvertisements();
      } catch (err) {
        console.error("Failed to load advertisements");
      } finally {
        setLoading(false);
      }
    };
    fetchAds();
  }, []);

  if (!isLoggedIn || user?.role !== "company") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
            <Megaphone className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-black text-foreground mb-3">Advertisement Dashboard</h1>
          <p className="text-muted-foreground mb-6">Sign in as a company to manage your product advertisements.</p>
          <div className="flex items-center justify-center gap-3">
            <a href="/login" className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm">Sign In</a>
            <a href="/register" className="px-6 py-3 rounded-xl border border-border/60 text-muted-foreground font-semibold text-sm">Register</a>
          </div>
        </div>
      </div>
    );
  }

  const totalBudget = ads.reduce((acc, ad) => acc + ad.budget, 0);
  const totalSpent = ads.reduce((acc, ad) => acc + ad.spent, 0);
  const totalImpressions = ads.reduce((acc, ad) => acc + ad.impressions, 0);
  const totalClicks = ads.reduce((acc, ad) => acc + ad.clicks, 0);

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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Megaphone className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-foreground">Advertisements</h1>
                <p className="text-muted-foreground">Promote your products and reach more talent</p>
              </div>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
            >
              <Plus size={18} />
              Create Ad
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
                  <DollarSign size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Total Budget</span>
              </div>
              <p className="text-2xl font-black text-foreground">ETB {totalBudget.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
                  <TrendingUp size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Spent</span>
              </div>
              <p className="text-2xl font-black text-green-500">ETB {totalSpent.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
                  <Eye size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Impressions</span>
              </div>
              <p className="text-2xl font-black text-blue-500">{totalImpressions.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl border border-border/50 bg-card/60 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-xl bg-pink-500/10 text-pink-500">
                  <MousePointerClick size={18} />
                </div>
                <span className="text-xs text-muted-foreground uppercase">Clicks</span>
              </div>
              <p className="text-2xl font-black text-pink-500">{totalClicks.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search advertisements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border/60 bg-card/60 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50"
            />
          </div>
        </div>

        {/* Ad Types */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { type: "banner", icon: Image, label: "Banner Ads", count: 0 },
            { type: "video", icon: Video, label: "Video Ads", count: 0 },
            { type: "text", icon: FileText, label: "Text Ads", count: 0 },
            { type: "sponsored", icon: Megaphone, label: "Sponsored", count: 0 }
          ].map((item) => (
            <button
              key={item.type}
              className="rounded-2xl border border-border/50 bg-card/60 p-5 hover:border-primary/30 transition-all flex items-center gap-3"
            >
              <item.icon className="w-6 h-6 text-primary" />
              <div className="text-left">
                <p className="font-bold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.count} active</p>
              </div>
            </button>
          ))}
        </div>

        {/* Empty State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : ads.length === 0 ? (
          <div className="text-center py-20">
            <Megaphone className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-2">No advertisements yet</p>
            <p className="text-sm text-muted-foreground/70 mb-6">Create your first ad to reach more candidates</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm"
            >
              Create Advertisement
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {ads.map((ad) => (
              <motion.div
                key={ad.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-border/50 bg-card/60 overflow-hidden hover:border-primary/30 transition-all"
              >
                <div className="p-6">
                  {/* Ad content */}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}