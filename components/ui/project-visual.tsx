import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  title: string;
  index?: string;
  dark?: boolean;
  className?: string;
};

export function ProjectVisual({ title, index = "001", dark, className }: ProjectVisualProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[16rem] flex-col justify-between overflow-hidden bg-surface p-6 sm:p-8 lg:border-r lg:border-border",
        dark && "bg-inverse text-inverse-ink lg:border-inverse",
        className,
      )}
      aria-label={`${title} interface preview`}
    >
      <div className="flex items-start justify-between opacity-50">
        <span className="micro-label">CASE / {index}</span>
      </div>
      
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,oklch(var(--ink))_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--ink))_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="relative mt-auto">
        <h3 className="max-w-[12ch] text-3xl font-semibold tracking-tight opacity-80 sm:text-4xl">{title}</h3>
      </div>
    </div>
  );
}
