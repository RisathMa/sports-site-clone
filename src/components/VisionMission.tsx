import { Target, Compass } from "lucide-react";

export function VisionMission() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-foreground mb-10">
          Sports Vision & Mission
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Vision Card */}
          <div className="glass-card rounded-xl p-6 border-l-4 border-primary">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground">SPORTS VISION</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To cultivate excellence in sports and athletics, fostering a culture of teamwork, 
              discipline, and competitive spirit that develops well-rounded individuals who excel 
              both on and off the field.
            </p>
          </div>

          {/* Mission Card */}
          <div className="glass-card rounded-xl p-6 border-l-4 border-accent">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Compass className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground">SPORTS MISSION</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              To provide comprehensive sports programs that promote physical fitness, mental 
              resilience, and fair play. Through inter-house competitions and athletic events, 
              we develop champions who embody integrity, perseverance, and sportsmanship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
