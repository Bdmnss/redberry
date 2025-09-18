import type { IconProps } from "./iconType";
import LogoIcon from "./LogoIcon";
import UserIcon from "./UserIcon";

export type IconType = "LogoIcon" | "UserIcon";

const iconMap = {
  LogoIcon,
  UserIcon,
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
