export type TimelineEntry = {
  label: string;
  note?: string;
  current?: boolean;
};

type TimelineProps = {
  entries: TimelineEntry[];
};

export function Timeline({ entries }: TimelineProps) {
  return (
    <ol className="relative grid gap-0" aria-label="Career timeline">
      {entries.map((entry, i) => {
        const isLast = i === entries.length - 1;
        return (
          <li key={entry.label} className="relative flex gap-6 pb-0">
            {/* Vertical line + dot */}
            <div className="relative flex flex-col items-center">
              <div
                className={`z-10 mt-[3px] h-3 w-3 shrink-0 rounded-full border-2 transition-colors ${
                  entry.current
                    ? "border-ink bg-ink"
                    : "border-border bg-background"
                }`}
              />
              {!isLast && (
                <div className="mt-1 w-px flex-1 bg-border" style={{ minHeight: 40 }} />
              )}
            </div>

            {/* Content */}
            <div className={`pb-10 ${isLast ? "pb-0" : ""}`}>
              <p
                className={`text-sm font-semibold leading-none tracking-tight ${
                  entry.current ? "text-ink" : "text-muted"
                }`}
              >
                {entry.label}
              </p>
              {entry.note && (
                <p className="mt-1.5 text-sm leading-relaxed text-muted/70">
                  {entry.note}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
