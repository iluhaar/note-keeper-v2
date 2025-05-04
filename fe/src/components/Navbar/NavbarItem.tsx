import { NavLink } from "react-router-dom";
import { useNotesContext } from "../../Context/NotesContext";
import Icon from "../Icon";
import { useUIContext } from "@/Context/UIContext";
import { NavItem } from "@/types/shared";

export const NavbarItem = ({
  path,
  label,
  icon,
  shouldResetFilter,
}: NavItem) => {
  const { setFilter } = useNotesContext() as Context;
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
