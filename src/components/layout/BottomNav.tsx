"use client";

import { Heart, Home, LucideIcon, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  Icon: LucideIcon;
}

const items: NavItem[] = [
  {
    href: "/",
    label: "home",
    Icon: Home,
  },
  {
    href: "/me?tab=bookmarks",
    label: "bookmark",
    Icon: Heart,
  },
  {
    href: "/me",
    label: "me",
    Icon: UserRound,
  },
];

export default function BottomNav() {
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
    <nav className="md:hidden fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-107.5 border-t border-border bg-background/90 backdrop-blur">
      <div className="grid grid-cols-3 place-items-center h-16 px-4">
        {items.map(({ href, label, Icon }) => {
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
    </nav>
  );
}
