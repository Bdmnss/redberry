import { Link, useLocation } from "react-router-dom";
import Icon from "../icons/Icon";

const Header = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  let avatarUrl = null;
  let userInitial = null;
  if (isLoggedIn) {
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      avatarUrl = storedAvatar;
    } else {
      const username = localStorage.getItem("username");
      if (username && typeof username === "string" && username.length > 0) {
        userInitial = username.charAt(0).toUpperCase();
      }
    }
  }
  return (
    <header className="flex items-center justify-between px-24 py-7">
      <Icon type="LogoIcon" />
      {isLoggedIn ? (
        <div className="flex items-center gap-5">
          <Icon type="CartIcon" />
          <div className="flex items-center gap-1">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="profile photo"
                className="size-10 rounded-full object-cover"
              />
            ) : (
              <div className="bg-buttonColor flex size-10 items-center justify-center rounded-full text-lg font-semibold text-white">
                {userInitial}
              </div>
            )}
            <Icon type="DownArrowIcon" />
          </div>
        </div>
      ) : isLogin ? (
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
