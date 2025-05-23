import { NavItem } from "./types/shared";

export const APP_NAME = "Note Keeper";
export const BASE_URL = import.meta.env.VITE_APP_API;

export const NAV_ITEMS: NavItem[] = [
  {
    path: "/editor",
    label: "Editor",
    icon: "editor",
    shouldResetFilter: true,
  },
  {
    path: "/tags",
    label: "Tags",
    icon: "tags",
  },
  {
    path: "/notes",
    label: "Notes",
    icon: "notes",
    shouldResetFilter: true,
  },
];

export const TAG_COLORS = [
  { label: "Hot pink", value: "#FF69B4" },
  { label: "Light green", value: "#90EE90" },
  { label: "Gold", value: "#FFD700" },
  { label: "Dark orange", value: "#FF8C00" },
  { label: "Orange", value: "#FFA500" },
  { label: "Purple", value: "#800080" },
  { label: "Green", value: "#008000" },
  { label: "Red", value: "#FF0000" },
  { label: "Yellow", value: "#FFFF00" },
  { label: "Blue", value: "#0000FF" },
  { label: "Slate blue", value: "#483D8B" },
  { label: "Teal", value: "#008080" },
  { label: "Lavender", value: "#E0E0FF" },
  { label: "Dark gray", value: "#A9A9A9" },
  { label: "Light gray", value: "#D3D3D3" },
];
