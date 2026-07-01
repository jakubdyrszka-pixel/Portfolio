import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
};

export function Section({ id, eyebrow, title, children, dark, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "border-t border-border px-4 py-16 sm:px-6 lg:px-10 lg:py-32",
        dark && "bg-inverse text-inverse-ink border-inverse",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl">
        {(eyebrow || title) && (
          <div className="mb-12 grid gap-4 md:grid-cols-[0.25fr_1fr]">
            {eyebrow && <p className="micro-label mt-2 text-muted">{eyebrow}</p>}
            {title && (
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
