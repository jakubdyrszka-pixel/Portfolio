type TechStackCardProps = {
  label: string;
  items: readonly string[];
};

export function TechStackCard({ label, items }: TechStackCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-background p-5 transition-colors hover:border-ink/20 hover:bg-surface">
      <p className="micro-label">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-md border border-border bg-surface px-3 py-1 text-sm font-medium transition-colors hover:border-ink/20 hover:bg-background"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
