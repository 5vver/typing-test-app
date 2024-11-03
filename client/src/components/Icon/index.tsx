import type { Color } from '@/types/tailwind.ts';
import { iconSvgMap } from '@components/Icon/constants.ts';
import type { IconName } from '@components/Icon/types.ts';
import { type CSSProperties, type FC, useMemo, useState } from 'react';

type Props = {
  name: IconName;
  size?: number;
  color?: Color;
  strokeColor?: Color;
  hover?: boolean;
  className?: string;
};

const Icon: FC<Props> = ({
  name,
  size = 24,
  color,
  strokeColor,
  hover,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hoverColor: Color = 'text';
  const SvgIcon = iconSvgMap[name];

  // tailwind doesn't support dynamic class names
  const style = useMemo(
    (): CSSProperties => ({
      fill: color
        ? `var(--${hover && isHovered ? hoverColor : color})`
        : undefined,
      stroke: strokeColor
        ? `var(--${hover && isHovered ? hoverColor : strokeColor})`
        : undefined,
    }),
    [color, hover, isHovered, strokeColor],
  );

  return (
    <SvgIcon
      width={size}
      height={size}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={style}
    />
  );
};

export { Icon };
