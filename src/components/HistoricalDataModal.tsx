
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { History, TrendingUp, Trophy, Medal, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { sportsService, HistoricalRanking } from "@/services/sportsService";

interface HistoricalDataModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const houseColorMap: Record<string, string> = {
    Parasathu: "bg-house-parasathu text-primary-foreground",
    Madara: "bg-house-madara text-foreground",
    Sewwandi: "bg-house-sewwandi text-foreground",
    Kethaki: "bg-house-kethaki text-foreground",
};

const houseBorderMap: Record<string, string> = {
    Parasathu: "border-house-parasathu",
    Madara: "border-house-madara",
    Sewwandi: "border-house-sewwandi",
    Kethaki: "border-house-kethaki",
};

export function HistoricalDataModal({ isOpen, onClose }: HistoricalDataModalProps) {
    const [history, setHistory] = useState<HistoricalRanking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isOpen) {
            const fetchHistory = async () => {
                setLoading(true);
                try {
                    const data = await sportsService.getHistoricalData();
                    setHistory(data);
                } catch (error) {
                    console.error("Failed to fetch historical data", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchHistory();
        }
    }, [isOpen]);

    const years = Array.from(new Set(history.map((h) => h.year))).sort((a, b) => b - a);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <History className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-2xl font-bold block">Historical Comparison</span>
                            <span className="text-muted-foreground text-sm font-normal">Past years' house performance trends</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-6 space-y-8">
                    {loading ? (
                        <div className="text-center py-12 text-muted-foreground">Loading historical data...</div>
                    ) : history.length > 0 ? (
                        years.map((year) => (
                            <div key={year} className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-xl font-bold text-gradient-gold">{year} Standings</h3>
                                    <div className="h-px flex-1 bg-border/50" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                    {history
                                        .filter((h) => h.year === year)
                                        .map((item) => (
                                            <div
                                                key={`${year}-${item.house_id}`}
                                                className={cn(
                                                    "glass-card rounded-xl p-4 border-l-4 transition-all hover:scale-[1.02]",
                                                    houseBorderMap[item.house_id]
                                                )}
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", houseColorMap[item.house_id])}>
                                                        {item.house_id}
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        {item.rank === 1 ? (
                                                            <Trophy className="w-3 h-3 text-primary" />
                                                        ) : (
                                                            <Medal className="w-3 h-3 text-muted-foreground" />
                                                        )}
                                                        <span className="text-sm font-bold">#{item.rank}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <p className="text-2xl font-bold text-foreground">{item.total_score}</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Points</p>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">No historical records available.</div>
                    )}

                    {/* Trend Insight Section */}
                    <div className="bg-secondary/20 rounded-2xl p-6 border border-border/50">
                        <h4 className="font-semibold flex items-center gap-2 mb-4">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            Performance Insights
                        </h4>
                        <div className="space-y-3">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Over the last three years, <span className="text-foreground font-medium">Parasathu</span> and <span className="text-foreground font-medium">Madara</span> have remained the dominant forces in Gothami Sports.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                        <ChevronRight className="w-4 h-4 text-primary" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Consistent top 2 performance across most athletics events.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                        <ChevronRight className="w-4 h-4 text-primary" />
                                    </div>
                                    <p className="text-xs text-muted-foreground">Emerging strength in Cricket and Volleyball in the recent session.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
