import { cn } from "@/lib/utils";
import { Trophy, ChevronRight } from "lucide-react";

interface HouseRankCardProps {
  rank: number;
  houseName: string;
  score: number;
  houseColor: "Parasathu" | "Madara" | "Sewwandi" | "Kethaki";
  maxScore?: number;
  onClick?: () => void;
}

const rankStyles = {
  1: "rank-badge-gold",
  2: "rank-badge-silver",
  3: "rank-badge-bronze",
  4: "bg-muted text-foreground",
};

const houseColorClasses = {
  Parasathu: "house-parasathu border-l-4",
  Madara: "house-madara border-l-4",
  Sewwandi: "house-sewwandi border-l-4",
  Kethaki: "house-kethaki border-l-4",
};

const progressColors = {
  Parasathu: "bg-house-parasathu",
  Madara: "bg-house-madara",
  Sewwandi: "bg-house-sewwandi",
  Kethaki: "bg-house-kethaki",
};

export function HouseRankCard({ rank, houseName, score, houseColor, maxScore = 100, onClick }: HouseRankCardProps) {
  const progressPercent = Math.min((score / maxScore) * 100, 100);

  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card rounded-xl p-5 transition-all duration-300 hover:scale-[1.02] cursor-pointer group",
        houseColorClasses[houseColor]
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Rank Badge */}
          <div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg",
              rankStyles[rank as keyof typeof rankStyles] || rankStyles[4]
            )}
          >
            {rank === 1 && <Trophy className="w-6 h-6" />}
            {rank !== 1 && `#${rank}`}
          </div>

          {/* House Info */}
          <div>
            <p className="text-muted-foreground text-sm">Rank #{rank}</p>
            <h3 className="text-xl font-bold text-foreground">{houseName}</h3>
          </div>
        </div>

        {/* Score */}
        <div className="text-right flex items-center gap-3">
          <div>
            <p className="text-3xl font-bold text-gradient-gold">{score}</p>
            <p className="text-muted-foreground text-xs">points</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full progress-fill", progressColors[houseColor])}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <p className="text-muted-foreground text-sm mt-3 group-hover:text-foreground transition-colors">
        Tap to view sports →
      </p>
    </div>
  );
}
