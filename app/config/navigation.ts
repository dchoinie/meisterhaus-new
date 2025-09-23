export interface LinkType {
  href: string;
  label: string;
}

export const links: LinkType[] = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms" },
  { href: "/amenities", label: "Amenities" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
