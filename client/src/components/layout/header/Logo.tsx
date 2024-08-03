import { type FC } from "react";
import { Icon } from "@components/Icon/icon.tsx";
import {Typography} from "@components/Typography.tsx";

export const Logo: FC = () => {
  return (
    <div className="flex gap-x-1 p-1 items-center justify-center select-none">
      <Icon name="keyboard-solid" size={36} color='mauve' />
      <Typography size='h2' className="font-mono text-teal hidden md:block">
        TypingTest
      </Typography>
    </div>
  );
};
