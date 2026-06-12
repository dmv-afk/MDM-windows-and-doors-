import Reveal from "./Reveal";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow, title, intro, align = "left", dark = true, className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "text-center mx-auto", "max-w-2xl", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={cn("display mt-4 text-3xl md:text-5xl", dark ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-5 text-base md:text-lg leading-relaxed", dark ? "text-white/80" : "text-ink/80")}>
          {intro}
        </p>
      )}
    </Reveal>
  );
}
