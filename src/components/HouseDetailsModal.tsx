import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trophy, XCircle, Minus, TrendingUp, Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { sportsService } from "@/services/sportsService";

interface SportResult {
  sport: string;
  date: string;
  venue: string;
  score: number;
  position: 1 | 2 | 3 | 4;
  allScores: { house: string; score: number }[];
}

interface HouseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  houseName: string;
  houseColor: "Parasathu" | "Madara" | "Sewwandi" | "Kethaki";
  totalScore: number;
  rank: number;
}

const houseBorderStyles = {
  Parasathu: "border-house-parasathu",
  Madara: "border-house-madara",
  Sewwandi: "border-house-sewwandi",
  Kethaki: "border-house-kethaki",
};

const houseBgStyles = {
  Parasathu: "bg-house-parasathu/20 text-house-parasathu",
  Madara: "bg-house-madara/20 text-house-madara",
  Sewwandi: "bg-house-sewwandi/20 text-house-sewwandi",
  Kethaki: "bg-house-kethaki/20 text-house-kethaki",
};

const positionLabels: Record<number, { label: string; icon: React.ReactNode; className: string }> = {
  1: { label: "1st", icon: <Trophy className="w-4 h-4" />, className: "bg-primary/20 text-primary" },
  2: { label: "2nd", icon: <Medal className="w-4 h-4" />, className: "bg-muted text-muted-foreground" },
  3: { label: "3rd", icon: <Medal className="w-4 h-4" />, className: "bg-muted text-muted-foreground" },
  4: { label: "4th", icon: <XCircle className="w-4 h-4" />, className: "bg-destructive/20 text-destructive" },
};

export function HouseDetailsModal({ isOpen, onClose, houseName, houseColor, totalScore, rank }: HouseDetailsModalProps) {
  const [sportsData, setSportsData] = useState<SportResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen && houseName) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          // Using the specific service method to get detailed breakdown
          const data = await sportsService.getHouseDetailsWithAllScores(houseName);
          setSportsData(data);
        } catch (error) {
          console.error("Failed to fetch house details", error);
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [isOpen, houseName]);

  const wins = sportsData.filter(s => s.position === 1).length;
  const losses = sportsData.filter(s => s.position === 4).length;
  const secondPlace = sportsData.filter(s => s.position === 2).length;
  const thirdPlace = sportsData.filter(s => s.position === 3).length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={cn("w-4 h-4 rounded-full", `bg-house-${houseColor.toLowerCase()}`)} />
            <span className="text-2xl font-bold">{houseName}</span>
            <span className="text-muted-foreground text-lg">House Details</span>
          </DialogTitle>
        </DialogHeader>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className={cn("glass-card rounded-xl p-4 text-center border-l-4", houseBorderStyles[houseColor])}>
            <p className="text-3xl font-bold text-gradient-gold">{totalScore}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Points</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-primary">{wins}</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <Trophy className="w-3 h-3" /> Championships
            </p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-muted-foreground">{secondPlace + thirdPlace}</p>
            <p className="text-xs text-muted-foreground mt-1">Runner-ups</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-destructive">{losses}</p>
            <p className="text-xs text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <XCircle className="w-3 h-3" /> Last Place
            </p>
          </div>
        </div>

        {/* Overall Rank */}
        <div className="glass-card rounded-xl p-4 mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-semibold">Overall Ranking</span>
          </div>
          <div className={cn("px-4 py-2 rounded-full font-bold", houseBgStyles[houseColor])}>
            #{rank} of 4
          </div>
        </div>

        {/* Sports Breakdown */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Medal className="w-5 h-5 text-primary" />
            Sports Performance Breakdown
          </h3>

          {loading ? (
            <div className="text-center py-8 text-muted-foreground">Loading details...</div>
          ) : (
            <div className="space-y-3">
              {sportsData.length > 0 ? (
                sportsData.map((sport, index) => (
                  <div key={index} className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{sport.sport}</h4>
                        <p className="text-xs text-muted-foreground">{sport.date} • {sport.venue}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={cn("px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1", positionLabels[sport.position].className)}>
                          {positionLabels[sport.position].icon}
                          {positionLabels[sport.position].label}
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                          {sport.score}
                          <span className="text-xs text-muted-foreground ml-1">pts</span>
                        </div>
                      </div>
                    </div>

                    {/* All Houses Scores for this sport */}
                    <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border/50">
                      {sport.allScores.map((hs, i) => (
                        <div
                          key={i}
                          className={cn(
                            "text-center p-2 rounded-lg",
                            hs.house === houseName ? "bg-secondary" : "bg-muted/30"
                          )}
                        >
                          <p className={cn(
                            "text-xs font-medium",
                            hs.house === houseName ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {hs.house}
                          </p>
                          <p className={cn(
                            "text-lg font-bold",
                            hs.house === houseName ? "text-primary" : "text-muted-foreground",
                            i === 0 && "text-primary"
                          )}>
                            {hs.score}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">No participation details found.</div>
              )}
            </div>
          )}
        </div>

        {/* Win/Loss Summary */}
        <div className="mt-6 glass-card rounded-xl p-4">
          <h3 className="font-semibold mb-3">Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-2">🏆 Won Championships</p>
              <div className="flex flex-wrap gap-2">
                {sportsData.filter(s => s.position === 1).map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                    {s.sport}
                  </span>
                ))}
                {wins === 0 && <span className="text-xs text-muted-foreground">None yet</span>}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">❌ Last Place Finishes</p>
              <div className="flex flex-wrap gap-2">
                {sportsData.filter(s => s.position === 4).map((s, i) => (
                  <span key={i} className="px-2 py-1 bg-destructive/20 text-destructive text-xs rounded-full">
                    {s.sport}
                  </span>
                ))}
                {losses === 0 && <span className="text-xs text-muted-foreground">None</span>}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
