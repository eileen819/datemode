"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { navItems } from "./BottomNav";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  let url: string;
  if (tab) {
    url = `${pathname}?${searchParams}`;
  } else {
    url = pathname;
  }
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="text-lg font-bold">
          <span>Date</span>
          <span className="text-accent">Mode</span>
        </div>
        <div className="hidden md:flex md:justify-center md:items-center md:gap-6">
          {navItems.map(({ href, label, Icon }) => {
            const active = url === href;
            return (
              <Link
                href={href}
                key={label}
                className="flex justify-center items-center"
              >
                <Icon
                  className={`${active ? "text-accent" : "text-foreground/60"} transition-colors duration-200 ease-in-out`}
                  size={22}
                  strokeWidth={2.25}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
