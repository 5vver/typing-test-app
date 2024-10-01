import {
  CSSProperties,
  type FC,
  type SVGProps,
  useMemo,
  useState,
} from 'react';

/* import svg icons */
import AdjustmentsHorizontal from '@assets/icons/common/adjustments-horizontal.svg?react';
import ArrowLeftEndOnRectangle from '@assets/icons/common/arrow-left-end-on-rectangle.svg?react';
import ArrowPath from '@assets/icons/common/arrow-path.svg?react';
import ArrowRightStartOnRectangle from '@assets/icons/common/arrow-right-start-on-rectangle.svg?react';
import CheckCircle from '@assets/icons/common/check-circle.svg?react';
import ChevronUpDown from '@assets/icons/common/chevron-up-down.svg?react';
import Clock from '@assets/icons/common/clock.svg?react';
import Cog6ToothSolid from '@assets/icons/common/cog-6-tooth-solid.svg?react';
import Cog6Tooth from '@assets/icons/common/cog-6-tooth.svg?react';
import CursorArrowMicro from '@assets/icons/common/cursor-arrow-micro.svg?react';
import EllipsisVertical from '@assets/icons/common/ellipsis-vertical.svg?react';
import ExclamationCircleOutline from '@assets/icons/common/exclamation-circle-outline.svg?react';
import InformationCircleSolid from '@assets/icons/common/information-circle-solid.svg?react';
import InformationCircle from '@assets/icons/common/information-circle.svg?react';
import LanguageMini from '@assets/icons/common/language-mini.svg?react';
import RocketLaunchSolid from '@assets/icons/common/rocket-launch-solid.svg?react';
import RocketLaunch from '@assets/icons/common/rocket-launch.svg?react';
import StarSolid from '@assets/icons/common/star-solid.svg?react';
import Star from '@assets/icons/common/star.svg?react';
import UserCircleMini from '@assets/icons/common/user-circle-mini.svg?react';
import UserCircleOutline from '@assets/icons/common/user-circle-outline.svg?react';
import UserCircleSolid from '@assets/icons/common/user-circle-solid.svg?react';
import UserPlusMini from '@assets/icons/common/user-plus-mini.svg?react';
import XCircle from '@assets/icons/common/x-circle.svg?react';
import GitHub from '@assets/icons/github.svg?react';
import KeyboardOutline from '@assets/icons/keyboard-outline.svg?react';
import KeyboardSolid from '@assets/icons/keyboard-solid.svg?react';
import Telegram from '@assets/icons/telegram.svg?react';
import Word from '@assets/icons/word.svg?react';

/* other imports */
import type { Color } from '@/types/tailwind.ts';
import type { Icons } from '@components/Icon/types.ts';

const iconSvgMap: Record<Icons, FC<SVGProps<SVGSVGElement>>> = {
  'user-circle-mini': UserCircleMini,
  'user-circle-outline': UserCircleOutline,
  'user-circle-solid': UserCircleSolid,
  'keyboard-outline': KeyboardOutline,
  'keyboard-solid': KeyboardSolid,
  star: Star,
  'star-solid': StarSolid,
  'rocket-launch': RocketLaunch,
  'rocket-launch-solid': RocketLaunchSolid,
  'cog-6-tooth': Cog6Tooth,
  'cog-6-tooth-solid': Cog6ToothSolid,
  'information-circle': InformationCircle,
  'information-circle-solid': InformationCircleSolid,
  'arrow-right-start-on-rectangle': ArrowRightStartOnRectangle,
  'user-plus-mini': UserPlusMini,
  'arrow-left-end-on-rectangle': ArrowLeftEndOnRectangle,
  telegram: Telegram,
  github: GitHub,
  'exclamation-circle-outline': ExclamationCircleOutline,
  'arrow-path': ArrowPath,
  'cursor-arrow-micro': CursorArrowMicro,
  clock: Clock,
  'check-circle': CheckCircle,
  'x-circle': XCircle,
  'chevron-up-down': ChevronUpDown,
  word: Word,
  'language-mini': LanguageMini,
  'adjustments-horizontal': AdjustmentsHorizontal,
  'ellipsis-vertical': EllipsisVertical,
};

type Props = {
  name: Icons;
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
