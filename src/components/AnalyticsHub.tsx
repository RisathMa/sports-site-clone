
import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    LineChart,
    Line,
    Legend
} from "recharts";
import { sportsService, House, HistoricalRanking } from "@/services/sportsService";
import { BarChart3, TrendingUp, Info } from "lucide-react";

const HOUSE_COLORS: Record<string, string> = {
    Parasathu: "#22C55E", // green-500
    Madara: "#EAB308",    // yellow-500
    Sewwandi: "#EF4444",  // red-500
    Kethaki: "#3B82F6",   // blue-500
};

export function AnalyticsHub() {
    const [houses, setHouses] = useState<House[]>([]);
    const [history, setHistory] = useState<HistoricalRanking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [housesData, historyData] = await Promise.all([
                    sportsService.getHouses(),
                    sportsService.getHistoricalData()
                ]);
                setHouses(housesData);
                setHistory(historyData);
            } catch (error) {
                console.error("Failed to fetch analytics data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Prepare line chart data (Year vs Score per House)
    const years = Array.from(new Set(history.map(h => h.year))).sort();
    const lineData = years.map(year => {
        const dataPoint: any = { year };
        history.filter(h => h.year === year).forEach(h => {
            dataPoint[h.house_id] = h.total_score;
        });
        // Add current 2026 data
        if (year === 2026 || years.length > 0) {
            // current year logic if not in history yet
        }
        return dataPoint;
    });

    // Adding 2026 current data to trend
    const currentYearData: any = { year: 2026 };
    houses.forEach(h => {
        currentYearData[h.name] = h.total_score;
    });

    const fullTrendData = [...lineData, currentYearData].sort((a, b) => a.year - b.year);

    if (loading) {
        return (
            <div className="py-16 text-center text-muted-foreground">
                Loading analytics...
            </div>
        );
    }

    return (
        <section id="analytics-hub" className="py-16 px-4 bg-secondary/5">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-foreground mb-3 flex items-center justify-center gap-2">
                        <BarChart3 className="w-8 h-8 text-primary" />
                        Analytics Hub
                    </h2>
                    <p className="text-muted-foreground">
                        Data insights and performance trends for Inter-House Sports Meet
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Current Rankings Bar Chart */}
                    <div className="glass-card p-6 rounded-2xl border border-border/50">
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <BarChart3 className="w-5 h-5 text-primary" />
                            Current Standings (2026)
                        </h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={houses}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            borderColor: 'hsl(var(--border))',
                                            borderRadius: '12px',
                                        }}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ color: '#fff', fontWeight: '600' }}
                                    />
                                    <Bar dataKey="total_score" radius={[8, 8, 0, 0]} barSize={50}>
                                        {houses.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={HOUSE_COLORS[entry.name] || '#666'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Historical Trend Line Chart */}
                    <div className="glass-card p-6 rounded-2xl border border-border/50">
                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Performance Trends (Last 3 Years)
                        </h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={fullTrendData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                                    <XAxis
                                        dataKey="year"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            borderColor: 'hsl(var(--border))',
                                            borderRadius: '12px',
                                        }}
                                        itemStyle={{ color: '#fff' }}
                                        labelStyle={{ color: '#fff', fontWeight: '600' }}
                                    />
                                    <Legend iconType="circle" />
                                    {Object.keys(HOUSE_COLORS).map(house => (
                                        <Line
                                            key={house}
                                            type="monotone"
                                            dataKey={house}
                                            stroke={HOUSE_COLORS[house]}
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: HOUSE_COLORS[house], strokeWidth: 2, stroke: 'hsl(var(--background))' }}
                                            activeDot={{ r: 6, strokeWidth: 0 }}
                                        />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Key Statistics Summary */}
                <div className="mt-8 grid md:grid-cols-3 gap-6">
                    <div className="glass-card p-5 rounded-xl border border-border/40 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Top Performer</p>
                            <p className="text-xl font-bold">{houses[0]?.name || 'N/A'}</p>
                        </div>
                    </div>
                    <div className="glass-card p-5 rounded-xl border border-border/40 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Growth Leader</p>
                            <p className="text-xl font-bold">Parasathu</p>
                        </div>
                    </div>
                    <div className="glass-card p-5 rounded-xl border border-border/40 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                            <Info className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Total House Points</p>
                            <p className="text-xl font-bold">{houses.reduce((acc, h) => acc + h.total_score, 0)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Minimal icons for local use in stats
function Trophy({ className }: { className?: string }) {
    return <BarChart3 className={className} />; // Fallback or import from lucide-react if available in scope
}
