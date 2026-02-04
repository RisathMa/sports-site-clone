import { useState, useEffect } from "react";
import {
  Trophy,
  Activity,
  Camera,
  BarChart3,
  Users,
  History,
  FileText,
  Smartphone,
  Download
} from "lucide-react";
import { HouseRankCard } from "@/components/HouseRankCard";
import { ExploreCard } from "@/components/ExploreCard";
import { VisionMission } from "@/components/VisionMission";
import { SportsOath } from "@/components/SportsOath";
import { ScoresTabs } from "@/components/ScoresTabs";
import { AnalyticsHub } from "@/components/AnalyticsHub";
import { Footer } from "@/components/Footer";
import { HouseDetailsModal } from "@/components/HouseDetailsModal";
import { HistoricalDataModal } from "@/components/HistoricalDataModal";
import { sportsService, House } from "@/services/sportsService";

const exploreItems = [
  { title: "Live Scores", description: "View real-time event results", icon: Activity },
  { title: "Analytics Hub", description: "Deep dive into performance", icon: BarChart3 },
  { title: "Historical Comparison", description: "Multi-year performance trends", icon: History },
];

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [houseRankings, setHouseRankings] = useState<any[]>([]);
  const [selectedHouse, setSelectedHouse] = useState<any | null>(null);
  const [isHistoricalModalOpen, setIsHistoricalModalOpen] = useState(false);

  useEffect(() => {
    // Simulate loading progress while fetching data
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          // Wait for data fetch to complete before hitting 100
          return prev;
        }
        return prev + 5;
      });
    }, 50);

    const fetchData = async () => {
      try {
        const houses = await sportsService.getHouses();
        // Transform for UI
        const rankings = houses.map((h, index) => ({
          rank: index + 1, // Assumption: getHouses returns ordered list
          houseName: h.name,
          score: h.total_score,
          houseColor: h.color_key as any
        }));
        setHouseRankings(rankings);
      } catch (error) {
        console.error("Failed to fetch house rankings:", error);
        // Fallback or error state could be handled here
      } finally {
        setProgress(100);
        clearInterval(timer);
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchData();

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl animate-pulse">
            <img src="/school-logo.jpg" alt="School Logo" className="w-full h-full object-cover" />
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gradient-gold mb-2">{progress}%</h1>
            <p className="text-muted-foreground text-sm mb-6">LOADING LIVE DATA...</p>
            <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4 fade-in-up">
        <div className="max-w-4xl mx-auto text-center mb-12 flex flex-col items-center">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl mb-6">
            <img src="/school-logo.jpg" alt="School Logo" className="w-full h-full object-cover" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Trophy className="w-4 h-4" />
            Gothami Kanishta Vidyalaya (GKV) Sportmeet Dashboard
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Overall House Rankings{" "}
            <span className="text-gradient-gold">Gampaha 2026</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Live standings and competitive rankings for Gothami School Sportmeet, Gampaha. Track house performance in real-time.
          </p>
        </div>

        {/* House Rankings */}
        <div id="house-rankings" className="max-w-2xl mx-auto space-y-4 stagger-children scroll-mt-20">
          {houseRankings.length > 0 ? (
            houseRankings.map((house) => (
              <HouseRankCard
                key={house.houseName}
                {...house}
                onClick={() => setSelectedHouse(house)}
              />
            ))
          ) : (
            <div className="text-center text-muted-foreground">No rankings available yet.</div>
          )}
        </div>

        {/* House Details Modal */}
        {selectedHouse && (
          <HouseDetailsModal
            isOpen={!!selectedHouse}
            onClose={() => setSelectedHouse(null)}
            houseName={selectedHouse.houseName}
            houseColor={selectedHouse.houseColor}
            totalScore={selectedHouse.score}
            rank={selectedHouse.rank}
          />
        )}
      </section>

      {/* Explore Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-secondary/10 to-transparent">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-foreground text-center mb-8">
            Explore Section
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
            {exploreItems.map((item) => (
              <ExploreCard
                key={item.title}
                {...item}
                onClick={() => {
                  if (item.title === "Historical Comparison") {
                    setIsHistoricalModalOpen(true);
                  } else if (item.title === "Live Scores") {
                    document.getElementById('house-rankings')?.scrollIntoView({ behavior: 'smooth' });
                  } else if (item.title === "Analytics Hub") {
                    document.getElementById('analytics-hub')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <VisionMission />

      {/* Sports Oath */}
      <SportsOath />

      {/* Install App CTA */}
      <section className="py-12 px-4">
        <div className="max-w-xl mx-auto">
          <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center shrink-0">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-1">
                Live Updates on Your Phone
              </h3>
              <p className="text-muted-foreground text-sm">
                Install the SportMeet app for the best experience.
              </p>
            </div>
            <a
              href="/Gothami.apk"
              download="Gothami.apk"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Install Now
            </a>
          </div>
        </div>
      </section>

      {/* Sports Scores */}
      <section id="sports-scores">
        <ScoresTabs />
      </section>

      {/* Analytics Hub */}
      <AnalyticsHub />

      {/* Historical Data Modal */}
      <HistoricalDataModal
        isOpen={isHistoricalModalOpen}
        onClose={() => setIsHistoricalModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </main>
  );
}
