import { type FC } from "react";
import type { Icons } from "@components/Icon/types.ts";
import { Link } from "@tanstack/react-router";
import { type Icon } from "@components/Icon/icon.tsx";
import type { Color } from "@/types/tailwind.ts";

type Nav = {
  label: string;
  link: string;
  icon: Icons;
  color: Color;
};

const navElements: Nav[] = [
  { label: "Typing", link: "/", icon: "rocket-launch", color: "rosewater" },
  {
    label: "Leaderboard",
    link: "/leaderboard",
    icon: "star",
    color: "rosewater",
  },
  {
    label: "About",
    link: "/about",
    icon: "information-circle",
    color: "rosewater",
  },
];

const NavButtons: FC = () => {
  return (
    <div className="hidden sm:flex gap-x-8 md:gap-x-12">
      {navElements.map(({ label, link, icon, color }) => (
        <Link key={label} to={link} preload="intent">
          <div className="flex gap-x-0.5 items-center">
            <Icon name={icon} size={32} />
            <p className="font-mono text-maroon hidden lg:block">{label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export { NavButtons };
