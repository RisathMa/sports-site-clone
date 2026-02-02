import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ExploreCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export function ExploreCard({ title, description, icon: Icon, onClick }: ExploreCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "glass-card rounded-xl p-5 cursor-pointer transition-all duration-300",
        "hover:scale-[1.02] hover:bg-secondary/50 group"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}
