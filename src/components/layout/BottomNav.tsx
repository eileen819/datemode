"use client";

import { Bookmark, Home, LucideIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  Icon: LucideIcon;
}

const items: NavItem[] = [
  {
    href: "/",
    label: "홈",
    Icon: Home,
  },
  {
    href: "/saved",
    label: "저장",
    Icon: Bookmark,
  },
  {
    href: "/my",
    label: "내정보",
    Icon: User,
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-10 mx-auto w-full max-w-107.5 border-t border-border bg-background/90 backdrop-blur">
      <div className="flex items-center justify-around h-16 px-4">
        {items.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link href={href} key={label}>
              <Icon
                className={active ? "text-accent" : "text-foreground/60"}
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
