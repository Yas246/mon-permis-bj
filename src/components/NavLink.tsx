"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function NavLink({
  href,
  children,
  className = "",
  onClick,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const baseClasses =
    "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors";
  const activeClasses = "font-semibold text-blue-600 dark:text-blue-400";

  return (
    <Link
      href={href}
      prefetch={true}
      className={`${baseClasses} ${isActive ? activeClasses : ""} ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
