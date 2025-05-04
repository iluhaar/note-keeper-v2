export type NavItem = {
  path: string;
  label: string;
  icon: "editor" | "tags" | "notes" | "account" | "logout";
  shouldResetFilter?: boolean;
};
