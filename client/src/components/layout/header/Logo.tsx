import { useIsScreenSmall } from '@/hooks/isScreenSmall.ts';
import { Icon } from '@components/Icon';
import { NavButtons } from '@components/layout/header/NavButtons.tsx';
import { Typography } from '@components/Typography.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu.tsx';
import { type FC } from 'react';

type Props = {
  className?: string;
};

export const Logo: FC<Props> = ({ className }) => {
  const isScreenSmall = useIsScreenSmall();

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger disabled={!isScreenSmall}>
          <div className="flex gap-x-2 p-1 items-center justify-center select-none">
            <Icon name="keyboard-solid" size={32} color="mauve" />
            <Typography
              size="h2"
              className="font-mono text-teal hidden lg:block"
            >
              TypingTest
            </Typography>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-10">
          <NavButtons
            className="flex flex-col gap-y-2"
            tooltipContentProps={{ side: 'right', sideOffset: 12 }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
