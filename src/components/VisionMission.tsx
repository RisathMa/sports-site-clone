import { Target, Compass } from "lucide-react";

export function VisionMission() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-foreground mb-10">
          Gothami Kanishta Vidyalaya Sports Vision & Mission
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
              To empower every student through the spirit of sport, building a legacy of athletic excellence, unshakable discipline, and collaborative leadership that prepares them to win in every arena of life.
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
              Our mission is to ignite a passion for physical and mental mastery. By hosting high-standard competitions and diverse athletic programs, we forge resilient athletes who lead with integrity, embrace challenges with perseverance, and honor the true essence of sportsmanship.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
