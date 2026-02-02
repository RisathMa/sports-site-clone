import { Facebook, Instagram, MessageCircle, Heart, Code } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border/50 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Gothami School Sports 2026</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Official Sports Meet platform for Gothami School Gampaha.
              Tracking live scores, rankings, and celebrating victories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {["Live Scores", "Winning Moments", "Analytics Hub", "Meet Leaders"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold text-foreground mb-3">Connect With Us</h3>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/teambccdc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary" />
              </a>

            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code className="w-4 h-4" />
            <span>Sanjanani Media Unit of Bandaranayake College Gampaha</span>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-accent fill-accent" /> From Gothami
          </p>
        </div>
      </div>
    </footer>
  );
}
