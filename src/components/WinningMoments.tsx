import { Trophy, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface WinningMoment {
  id: string;
  title: string;
  description: string;
  house: "Parasathu" | "Madara" | "Sewwandi" | "Kethaki";
  imageUrl: string;
  albumUrl?: string;
  credit?: string;
}

const moments: WinningMoment[] = [
  {
    id: "1",
    title: "Elle Championship Final",
    description: "Elle secures a stunning win in the final moments",
    house: "Parasathu",
    imageUrl: "https://i.ibb.co/KnHJCpJ/image.png",
    albumUrl: "https://www.facebook.com/share/p/18HJE4qbuA/",
    credit: "BCPAS",
  },
  {
    id: "2",
    title: "VolleyBall Championship",
    description: "Parasathu house secures VolleyBall championship with stellar teamwork",
    house: "Parasathu",
    imageUrl: "https://i.ibb.co/hx6YpVyV/image.png",
    albumUrl: "https://web.facebook.com/share/p/1BtwkUg3yv/",
    credit: "BCMU",
  },
  {
    id: "3",
    title: "Hockey Championship",
    description: "Parasathu house claims victory in Hockey championship",
    house: "Parasathu",
    imageUrl: "https://i.ibb.co/0Rfd7xKh/image.png",
    albumUrl: "https://web.facebook.com/share/p/1D7AAvBe8e/",
    credit: "BCMU",
  },
  {
    id: "4",
    title: "HardBall Championship",
    description: "Parasathu house dominates HardBall with outstanding performance",
    house: "Parasathu",
    imageUrl: "https://i.ibb.co/B5R1dtCq/image.png",
    albumUrl: "https://web.facebook.com/share/p/18KQuX9rEy/",
    credit: "BCMU",
  },
];

const houseColors = {
  Parasathu: "bg-house-parasathu text-primary-foreground",
  Madara: "bg-house-madara text-foreground",
  Sewwandi: "bg-house-sewwandi text-foreground",
  Kethaki: "bg-house-kethaki text-foreground",
};

export function WinningMoments() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">Winning Moments</h2>
          <p className="text-muted-foreground">
            Captured memories and highlights from InterHouse Sports Meet 2026
          </p>
        </div>

        {/* Year Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {["2026"].map((year, index) => (
            <button
              key={year}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                index === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {moments.map((moment) => (
            <div
              key={moment.id}
              className="glass-card rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={moment.imageUrl}
                  alt={moment.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className={cn("px-2 py-1 rounded-full text-xs font-semibold", houseColors[moment.house])}>
                    {moment.house}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground text-sm mb-1">{moment.title}</h3>
                <p className="text-muted-foreground text-xs mb-3">{moment.description}</p>
                {moment.albumUrl && (
                  <a
                    href={moment.albumUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                  >
                    View Album <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {moment.credit && (
                  <p className="text-muted-foreground text-[10px] mt-2">© {moment.credit}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
