import { Link, useLocation } from "react-router-dom";
import Icon from "../icons/Icon";

const Header = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  return (
    <header className="flex items-center justify-between px-24 py-7">
      <Icon type="LogoIcon" />
      {isLogin ? (
        <Link to="/register" className="flex items-center gap-2">
          <Icon type="UserIcon" />
          <p className="text-primaryText text-xs">Register</p>
        </Link>
      ) : (
        <Link to="/login" className="flex items-center gap-2">
          <Icon type="UserIcon" />
          <p className="text-primaryText text-xs">Log in</p>
        </Link>
      )}
    </header>
  );
};

export default Header;
