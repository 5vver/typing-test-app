import { type FC } from "react";
import type { Icons } from "@components/Icon/types.ts";
import { Link } from "@tanstack/react-router";
import { Icon } from "@components/Icon";
import type { Color } from "@/types/tailwind.ts";

type Nav = {
  label: string;
  link: string;
  icon: Icons;
  color: Color;
};

const navElements: Nav[] = [
  {
    label: "typing",
    link: "/",
    icon: "rocket-launch-solid",
    color: "maroon",
  },
  {
    label: "leaderboard",
    link: "/leaderboard",
    icon: "star-solid",
    color: "yellow",
  },
  {
    label: "settings",
    link: "/settings",
    icon: "cog-6-tooth-solid",
    color: "blue",
  },
  {
    label: "about",
    link: "/about",
    icon: "information-circle-solid",
    color: "teal",
  },
];

const NavButtons: FC = () => {
  return (
    <div className="hidden sm:flex gap-x-8 md:gap-x-12">
      {navElements.map(({ label, link, icon, color }) => (
        <Link key={label} to={link} preload="intent" title={label}>
          <div className="flex gap-x-0.5 items-center">
            <Icon name={icon} size={28} color={color} className="transition-colors duration-150 ease-in-out" hover />
          </div>
        </Link>
      ))}
    </div>
  );
};

export { NavButtons };
