import type { LucideIcon } from "lucide-react";

type ApproachCardProps = {
  icon: LucideIcon;
  title: string;
  body: string;
  index: number;
};

export function ApproachCard({ icon: Icon, title, body, index }: ApproachCardProps) {
  return (
    <div className="group relative flex flex-col gap-5 rounded-xl border border-border bg-background p-7 transition-colors hover:border-ink/30 hover:bg-surface">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface transition-colors group-hover:border-ink/20 group-hover:bg-background">
          <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
        </div>
        <span
          className="micro-label select-none tabular-nums"
          aria-hidden="true"
        >
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <div className="grid gap-2">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </div>
  );
}
