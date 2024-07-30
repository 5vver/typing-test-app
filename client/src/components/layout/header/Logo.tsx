import { type FC } from "react";
import { Icon } from "@components/Icon/icon.tsx";

export const Logo: FC = () => {
  return (
    <div className="flex gap-x-0.5 p-0.5 items-center select-none">
      <Icon name="keyboard-solid" size={36} color='mauve' />
      <p className="font-mono font-bold text-teal text-4xl hidden md:block">
        TypingTest
      </p>
    </div>
  );
};
