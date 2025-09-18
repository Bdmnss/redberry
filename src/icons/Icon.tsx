import CartIcon from "./CartIcon";
import DownArrowIcon from "./DownArrowIcon";
import EyeOff from "./EyeOff";
import EyeOn from "./EyeOn";
import FilterIcon from "./FilterIcon";
import type { IconProps } from "./iconType";
import LogoIcon from "./LogoIcon";
import UserIcon from "./UserIcon";

export type IconType =
  | "LogoIcon"
  | "UserIcon"
  | "EyeOn"
  | "EyeOff"
  | "CartIcon"
  | "DownArrowIcon"
  | "FilterIcon";

const iconMap = {
  LogoIcon,
  UserIcon,
  EyeOn,
  EyeOff,
  CartIcon,
  DownArrowIcon,
  FilterIcon,
};

interface GeneralIconProps extends IconProps {
  type: IconType;
}

const Icon = ({ type, ...restProps }: GeneralIconProps) => {
  const IconComponent = iconMap[type];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent {...restProps} />;
};

export default Icon;
