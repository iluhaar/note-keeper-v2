import { NavLink } from "react-router-dom";
import { useConvexContext } from "../../Context/ConvexContext";
import Icon from "../Icon";
import { useUIContext } from "@/Context/UIContext";
import { NavItem } from "@/types/shared";
import { UIContext } from "@/types/types";

export const NavbarItem = ({
  path,
  label,
  icon,
  shouldResetFilter,
}: NavItem) => {
  const { setFilter } = useConvexContext();
  const { showNavbar } = useUIContext() as UIContext;

  const handleClick = () => {
    if (shouldResetFilter) {
      setFilter({ value: "", type: null });
    }
  };

  return (
    <li className="sm:pt-2">
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? "underline" : "")}
        onClick={handleClick}
      >
        {showNavbar ? <span>{label}</span> : <Icon img={icon} />}
      </NavLink>
    </li>
  );
};
