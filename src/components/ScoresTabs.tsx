
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SportsScoreCard } from "@/components/SportsScoreCard";
import { useEffect, useState } from "react";
import { sportsService } from "@/services/sportsService";
import { cn } from "@/lib/utils";

export function ScoresTabs() {
  const [completedEvents, setCompletedEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("completed");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await sportsService.getEvents();

        // Transform API data to match UI component expectations
        const transformedEvents = events
          .filter(e => e.status === 'completed')
          .map(e => ({
            sportName: e.name,
            date: e.date,
            venue: e.venue,
            scores: e.results
              .sort((a, b) => b.score - a.score)
              .map(r => ({
                house: r.house_id,
                score: r.score,
                color: r.house_id as any // Matches the "Parasathu" | "Madara" etc.
              }))
          }));

        setCompletedEvents(transformedEvents);
      } catch (error) {
        console.error("Failed to load scores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div className="py-12 text-center text-muted-foreground">Loading scores...</div>;
  }

  const sportsScores = {
    completed: completedEvents,
    live: [],
    upcoming: []
  };

  const tabs = [
    { id: "completed", label: "Completed", count: sportsScores.completed.length },
    { id: "ongoing", label: "Live Now", count: sportsScores.live.length },
    { id: "upcoming", label: "Upcoming", count: sportsScores.upcoming.length },
  ];

  const currentScores = sportsScores[activeTab as keyof typeof sportsScores] || [];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">Sports Scores 2026</h2>
          <p className="text-muted-foreground">
            Complete scores and results from all sporting events and competitions
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  className={cn(
                    "w-5 h-5 rounded-full text-xs flex items-center justify-center",
                    activeTab === tab.id ? "bg-primary-foreground/20" : "bg-foreground/10"
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Scores Grid */}
        <div className="grid md:grid-cols-2 gap-4 stagger-children">
          {currentScores.length > 0 ? (
            currentScores.map((score, index) => (
              <SportsScoreCard key={index} {...score} />
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground">No {activeTab} events at the moment</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
