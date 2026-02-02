import { cn } from "@/lib/utils";
import { Calendar, MapPin } from "lucide-react";

interface HouseScore {
  house: string;
  score: number;
  color: "Parasathu" | "Madara" | "Sewwandi" | "Kethaki";
}

interface SportsScoreCardProps {
  sportName: string;
  date: string;
  venue: string;
  scores: HouseScore[];
}

const houseColors = {
  Parasathu: "bg-house-parasathu",
  Madara: "bg-house-madara",
  Sewwandi: "bg-house-sewwandi",
  Kethaki: "bg-house-kethaki",
};

const houseBgColors = {
  Parasathu: "bg-house-parasathu/20 text-house-parasathu",
  Madara: "bg-house-madara/20 text-house-madara",
  Sewwandi: "bg-house-sewwandi/20 text-house-sewwandi",
  Kethaki: "bg-house-kethaki/20 text-house-kethaki",
};

export function SportsScoreCard({ sportName, date, venue, scores }: SportsScoreCardProps) {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  const winner = sortedScores[0];

  return (
    <div className="glass-card rounded-xl p-5 transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">{sportName}</h3>
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {venue}
            </span>
          </div>
        </div>
        <div className={cn("px-3 py-1 rounded-full text-xs font-semibold", houseBgColors[winner.color])}>
          {winner.house} Wins
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {scores.map((score, index) => (
          <div
            key={score.house}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg bg-muted/50",
              index === 0 && score === winner && "ring-1 ring-primary/50"
            )}
          >
            <div className="flex items-center gap-2">
              <div className={cn("w-3 h-3 rounded-full", houseColors[score.color])} />
              <span className="text-sm font-medium text-foreground">{score.house}</span>
            </div>
            <span className={cn("text-lg font-bold", score === winner ? "text-primary" : "text-muted-foreground")}>
              {score.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
