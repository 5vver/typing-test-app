import { type ComponentProps, type FC } from "react";
import type { Icons } from "@components/Icon/types.ts";
import { Link } from "@tanstack/react-router";
import { Icon } from "@components/Icon";
import type { Color } from "@/types/tailwind.ts";
import { Typography } from "@components/Typography.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@components/ui/tooltip.tsx";
import { cn } from "@/lib/utils.ts";

type Nav = {
  label: string;
  link: string;
  icon: Icons;
  color: Color;
};

const navElements: Nav[] = [
  {
    label: "Typing",
    link: "/",
    icon: "rocket-launch-solid",
    color: "maroon",
  },
  {
    label: "Leaderboard",
    link: "/leaderboard",
    icon: "star-solid",
    color: "yellow",
  },
  {
    label: "Settings",
    link: "/settings",
    icon: "cog-6-tooth-solid",
    color: "blue",
  },
  {
    label: "About",
    link: "/about",
    icon: "information-circle-solid",
    color: "teal",
  },
];

type Props = {
  className?: string;
  tooltipContentProps?: ComponentProps<typeof TooltipContent>;
};

const NavButtons: FC<Props> = ({ className, tooltipContentProps }) => {
  return (
    <TooltipProvider delayDuration={150}>
      <div className={cn("hidden sm:flex gap-x-8 md:gap-x-12", className)}>
        {navElements.map(({ label, link, icon, color }) => (
          <Tooltip key={label}>
            <TooltipTrigger>
              <Link to={link} preload="intent">
                <div className="flex gap-x-1 items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-surface2 transition-colors duration-150 ease-in-out">
                  <Icon name={icon} size={24} color={color} />
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom" {...tooltipContentProps}>
              <Typography size="small" className="font-medium">
                {label}
              </Typography>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export { NavButtons };
