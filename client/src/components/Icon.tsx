import { type FC, type SVGProps } from "react";

/* import svg icons */
import UserCircleMini from "@assets/icons/user-circle-mini.svg?react";
import UserCircleOutline from "@assets/icons/user-circle-outline.svg?react";
import UserCircleSolid from "@assets/icons/user-circle-solid.svg?react";

type Icons = "user-circle-mini" | "user-circle-outline" | "user-circle-solid";

const iconSvgMap: Record<Icons, FC<SVGProps<SVGSVGElement>>> = {
  "user-circle-mini": UserCircleMini,
  "user-circle-outline": UserCircleOutline,
  "user-circle-solid": UserCircleSolid,
};

type Props = {
  name: Icons;
  size?: number;
  color?: string;
};
const Icon: FC<Props> = ({ name, size }) => {
  const SvgIcon = iconSvgMap[name];
  
  const iconSize = size ?? 24;
  
  return <SvgIcon width={iconSize} height={iconSize} className='text-mauve' />;
};

export { Icon };
