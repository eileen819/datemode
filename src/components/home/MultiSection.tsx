"use client";

const chipBase =
  "cursor-pointer border border-border rounded-2xl py-1.5 px-4 text-sm active:scale-[0.98] focus:outline-none focus-visible:ring-2 transition-color duration-300 ease-in-out";

interface IMultiSectionProps<T extends string> {
  title: string;
  tags: readonly T[];
  value: T[];
  onSelect: (tags: T[]) => void;
}

export default function MultiSection<T extends string>({
  title,
  tags,
  value,
  onSelect,
}: IMultiSectionProps<T>) {
  return (
    <section>
      <h2 className="text-sm font-bold mb-2">{title}</h2>
      <div className="flex md:flex-wrap gap-2 overflow-x-auto md:overflow-visible whitespace-nowrap">
        {tags.map((tag) => {
          const selected = value.includes(tag);

          return (
            <button
              key={tag}
              type="button"
              className={`${chipBase} ${selected ? "bg-accent focus-visible:ring-foreground" : "bg-card focus-visible:ring-accent"}`}
              onClick={() => {
                const tags = selected
                  ? value.filter((v) => v !== tag)
                  : [...value, tag];
                onSelect(tags);
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </section>
  );
}
