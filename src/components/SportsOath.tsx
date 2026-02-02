import { Quote } from "lucide-react";

export function SportsOath() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-foreground mb-8">Sports Oath</h2>

        <div className="glass-card rounded-2xl p-8 relative">
          <Quote className="w-10 h-10 text-primary/30 absolute top-4 left-4" />

          <blockquote className="text-muted-foreground leading-relaxed text-lg italic mb-6">
            "We, the students of Gothami School Gampaha, standing before the National and School flags, do hereby pledge with honor and integrity. As we compete representing the houses of Sewwandi, Madara, Parasathu, and Kethaki, we vow to uphold the true spirit of sportsmanship. We commit to competing with discipline, respecting all rules and regulations, and fostering a bond of brotherhood, accepting both victory and defeat with a balanced mind for the glory of our school."
          </blockquote>

          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" />

          <p className="text-muted-foreground text-sm leading-relaxed">
            "ගම්පහ ගොතමි විද්‍යාලීය ක්‍රීඩා පිටියට පිවිසි සිසු දරුවන් වන අපි; සෙව්වන්දි, මදාරා, පරසතු සහ කේතකී යන සිවු නිවාස නියෝජනය කරමින්, ජාතික ධජයත් පාසල් ධජයත් ඉදිරියේ මහත් අභිමානයෙන් යුතුව ප්‍රතිඥා දෙමු. ක්‍රීඩාවේ සැබෑ විනය හා උදාරත්වය විදහා පාමින්, සහෝදරත්වයේ දෑත් එකිනෙක පටලවමින්, සම්මත නීති රීතිවලට ගරු කරමින්, ජය පරාජයෙහි නොසැලෙන මැදහත් සිතින් යුතුව තරග බිමට පිවිසෙන බවට අපි මෙසේ සපථ කර සිටිමු."
          </p>
        </div>
      </div>
    </section>
  );
}
