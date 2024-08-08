import { type FC } from "react";
import { Icon } from "@components/Icon";
import { Typography } from "@components/Typography.tsx";
import { useIsScreenSmall } from "@/hooks/isScreenSmall.ts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu.tsx";
import { NavButtons } from "@components/layout/header/NavButtons.tsx";

export const Logo: FC = () => {
  const isScreenSmall = useIsScreenSmall();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={!isScreenSmall}>
        <div className="flex gap-x-1 p-1 items-center justify-center select-none">
          <Icon name="keyboard-solid" size={36} color="mauve" />
          <Typography size="h2" className="font-mono text-teal hidden md:block">
            TypingTest
          </Typography>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-10">
        <NavButtons
          className="flex flex-col"
          tooltipContentProps={{ side: "right", sideOffset: 12 }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
