import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const base =
  "group relative inline-flex items-center justify-center overflow-hidden font-medium tracking-wide transition-all duration-400 ease-luxe disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: "bg-bronze text-ink hover:bg-bronze-soft",
  ghost: "border border-line text-white hover:border-bronze hover:text-bronze",
  light: "bg-white text-ink hover:bg-bone",
};

const sizes = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-base",
};

export default function Button({
  href, onClick, type = "button", variant = "primary", size = "md", className, children, disabled,
}: Props) {
  const cls = cn(base, variants[variant], sizes[size], className);
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {/* sheen sweep on hover */}
      <span className="sheen pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-700 ease-luxe group-hover:translate-x-full" />
    </>
  );
  if (href) return <Link href={href} className={cls}>{inner}</Link>;
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {inner}
    </button>
  );
}
