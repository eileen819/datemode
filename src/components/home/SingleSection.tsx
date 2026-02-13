import { ReactNode } from "react";

const chipBase =
  "cursor-pointer border border-border rounded-2xl py-1.5 px-4 text-sm active:scale-[0.98] focus:outline-none focus-visible:ring-2 transition-color duration-200";

export default function SigleSection({
  title,
  tags,
  value,
  onSelect,
  children,
  allowDeselect = false,
}: {
  title: string;
  tags: string[];
  value: string;
  onSelect: (tag: string) => void;
  allowDeselect: boolean;
  children?: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-sm font-bold mb-2">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const selected = value === tag;
          return (
            <button
              key={tag}
              className={`${chipBase} ${selected ? "bg-accent focus-visible:ring-foreground" : "bg-card focus-visible:ring-accent"}`}
              onClick={() => {
                if (allowDeselect && selected) {
                  onSelect("");
                } else {
                  onSelect(tag);
                }
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>
      {children}
    </section>
  );
}
