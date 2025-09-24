import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Icon from "../icons/Icon";
import CartDrawer from "../components/CartDrawer";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    localStorage.removeItem("username");
    setDropdownOpen(false);
    navigate("/login");
  };
  return (
    <>
      <header className="flex items-center justify-between px-24 py-7">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <Icon type="LogoIcon" />
        </div>
        {isLoggedIn ? (
          <div className="flex items-center gap-5">
            <button
              type="button"
              className="relative flex items-center justify-center"
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
            >
              <Icon type="CartIcon" />
            </button>
            <div className="relative flex items-center gap-1" ref={dropdownRef}>
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="profile photo"
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-buttonColor text-lg font-semibold text-white">
                  {userInitial}
                </div>
              )}
              <button
                type="button"
                className="flex items-center justify-center focus:outline-none"
                onClick={() => setDropdownOpen((v) => !v)}
                aria-label="Open profile menu"
              >
                <Icon type="DownArrowIcon" />
              </button>
              {dropdownOpen && (
                <div className="animate-fade-in absolute right-0 top-12 z-20 min-w-[7.5rem] rounded-lg border border-gray-100 bg-white py-2 shadow-lg">
                  <button
                    className="w-full px-4 py-2 text-left text-sm font-medium text-buttonColor transition-colors hover:bg-gray-50"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : isLogin ? (
          <Link to="/register" className="flex items-center gap-2">
            <Icon type="UserIcon" />
            <p className="text-xs">Register</p>
          </Link>
        ) : (
          <Link to="/login" className="flex items-center gap-2">
            <Icon type="UserIcon" />
            <p className="text-xs">Log in</p>
          </Link>
        )}
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
