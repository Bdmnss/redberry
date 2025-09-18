import Icon from "../icons/Icon";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-24 py-7">
      <Icon type="LogoIcon" />
      <div className="flex items-center gap-2">
        <Icon type="UserIcon" />
        <p className="text-primaryText text-xs">Log in</p>
      </div>
    </header>
  );
};

export default Header;
