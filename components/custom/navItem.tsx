import Link from "next/link";
import React from "react";

export interface NavItemProps {
  label: string;
  href: string;
  textColor?: string;
  textColorHover?: string;
}

const NavItem = ({ label, href, textColor, textColorHover }: NavItemProps) => {
  return (
    <div
      className={`${textColor} hover:${textColorHover} font-cinzel-decorative`}
    >
      <Link href={href}>{label}</Link>
    </div>
  );
};

export default NavItem;
