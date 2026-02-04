import { Facebook, Instagram, MessageCircle, Heart, Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border/50 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-primary/20">
                <img src="/school-logo.jpg" alt="Gothami School" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-foreground">Gothami School Sports 2026</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Official Sportmeet platform for Gothami Kanishta Vidyalaya (GKV), Gampaha.
              Tracking live GKV sports scores, house rankings, and celebrating student victories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {["Live Scores", "Analytics Hub"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const id = link === "Live Scores" ? "house-rankings" : "analytics-hub";
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Connect With Us</h3>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61550895933868"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>

            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col items-center justify-between gap-4">
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code className="w-4 h-4" />
              <span>Sanjanani Media Unit of Gothami School Gampaha</span>
            </div>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-accent fill-accent" /> From Gothami
            </p>
          </div>

          <div className="flex flex-col items-center gap-2 mt-6 pt-6 border-t border-border/30 w-full">
            <p className="text-lg text-muted-foreground font-medium flex items-center gap-2">
              Developed By <span className="text-primary font-bold text-xl">Risath Manvidu</span>
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Assistant Developer <span className="text-foreground/80 font-semibold text-base">Pemidu Dissanayake</span>
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Database Control <span className="text-foreground/80 font-semibold text-base">Risath Manvidu & Mindula Sanvidu</span>
            </p>
            <a
              href="https://portfolio.companyrm.lk"
              target="_blank"
              rel="noopener noreferrer"
              className="w-24 h-24 opacity-90 mt-4 block hover:opacity-100 transition-opacity cursor-pointer"
            >
              <img src="/developer-logo.png" alt="Developer Logo" className="w-full h-full object-contain" />
            </a>
            <p className="text-xs text-muted-foreground mt-4 opacity-70">
              © 2026 Gothami School & CompanyRM. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
