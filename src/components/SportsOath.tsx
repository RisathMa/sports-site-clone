import { Quote } from "lucide-react";

export function SportsOath() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-foreground mb-8">Sports Oath</h2>

        <div className="glass-card rounded-2xl p-8 relative">
          <Quote className="w-10 h-10 text-primary/30 absolute top-4 left-4" />

          <blockquote className="text-muted-foreground leading-relaxed text-lg italic mb-6">
            "We, the students of Gothami School Gampaha, take the oath with great pride
            and honour, in front of the National Flag and the School Flag that we will compete
            in co-operation and brotherhood in accordance with the accepted rules and regulations
            of sports, by dividing into four houses as Sewwandi, Madara, Parasathu and Kethaki to
            uplift the mobility and the greatness of the Sports."
          </blockquote>

          <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" />

          <p className="text-muted-foreground text-sm leading-relaxed">
            "ගම්පහ ගොතමි විද්‍යාලයේ සිසු දරුවන් වන අපි; සෙව්වන්දි, මදාරා, පරසතු හා කේතකී
            යන නිවාස හතරට බෙදී ක්‍රීඩාවේ ශ්‍රේෂ්ඨත්වය හා උත්තරීතර බව සනාථ කරමින්, එහි කීර්ති
            නාමය ආරක්ෂා වන පරිදි, සහෝදරත්වයෙන් හා සහයෝගයෙන් යුතුව සම්මත ක්‍රීඩා නීති රීතිවලට
            අවනතව තරග වදින බවටත්, ජය පරාජය සම සිතින් භුක්ති විඳින බවටත් ජාතික ධජය ඉදිරිපිට
            ගෞරව බහුමානයෙන් යුතුව ප්‍රතිඥා දෙමු."
          </p>
        </div>
      </div>
    </section>
  );
}
