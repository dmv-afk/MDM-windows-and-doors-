import { cn } from "@/lib/utils";

const fieldCls =
  "w-full bg-transparent border border-line px-4 py-3.5 text-sm text-white placeholder:text-white/35 focus:border-bronze transition-colors duration-300 rounded-none appearance-none";

export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-xs uppercase tracking-eyebrow text-white/60">
      {children}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldCls, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(fieldCls, "min-h-32 resize-y", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select {...props} className={cn(fieldCls, "bg-ink", props.className)}>
      {props.children}
    </select>
  );
}

export function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs text-red-400">{children}</p>;
}
