import CameraIcon from "./CameraIcon";
import CartIcon from "./CartIcon";
import CloseIcon from "./CloseIcon";
import DownArrowIcon from "./DownArrowIcon";
import EmailIcon from "./EmailIcon";
import EyeOff from "./EyeOff";
import EyeOn from "./EyeOn";
import FilterIcon from "./FilterIcon";
import type { IconProps } from "./iconType";
import LeftArrowIcon from "./LeftArrowIcon";
import LogoIcon from "./LogoIcon";
import RightArrowIcon from "./RightArrowIcon";
import TransparentCartIcon from "./TransparentCartIcon";
import UserIcon from "./UserIcon";

export type IconType =
  | "LogoIcon"
  | "UserIcon"
  | "EyeOn"
  | "EyeOff"
  | "CartIcon"
  | "DownArrowIcon"
  | "FilterIcon"
  | "CloseIcon"
  | "CameraIcon"
  | "LeftArrowIcon"
  | "RightArrowIcon"
  | "TransparentCartIcon"
  | "EmailIcon";

const iconMap = {
  LogoIcon,
  UserIcon,
  EyeOn,
  EyeOff,
  CartIcon,
  DownArrowIcon,
  FilterIcon,
  CloseIcon,
  CameraIcon,
  LeftArrowIcon,
  RightArrowIcon,
  TransparentCartIcon,
  EmailIcon,
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
