"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { signOutAction } from "@/app/actions/auth";

type NavUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
} | null;

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/sell", label: "Sell" },
] as const;

function displayName(user: NonNullable<NavUser>): string {
  return user.name ?? user.email ?? "Account";
}

function Avatar({ user }: { user: NonNullable<NavUser> }) {
  if (user.image) {
    return (
      <Image
        src={user.image}
        alt=""
        width={32}
        height={32}
        className="h-8 w-8 rounded-full object-cover"
      />
    );
  }
  const initial = displayName(user).charAt(0).toUpperCase();
  return (
    <span
      className="flex h-8 w-8 items-center justify-center rounded-full bg-avatar text-sm font-bold text-primary"
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-graphite"
      aria-label="Handcrafted Haven, home"
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="64" height="64" rx="14" fill="#8B5E3C" />
        <path
          d="M20 16v32M20 32h24M44 16v32"
          stroke="#FFEEDB"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="32" r="4" fill="#E8A838" />
      </svg>
      <span className="font-heading text-xl font-bold tracking-tight">
        Handcrafted Haven
      </span>
    </Link>
  );
}

export default function Navbar({ user }: { user: NavUser }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/80">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
      >
        <Logo />

        {/* Center links — desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-sm font-semibold transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-graphite"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth area — desktop */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="flex items-center gap-2">
                <Avatar user={user} />
                <span className="max-w-[10rem] truncate text-sm font-semibold text-graphite">
                  {displayName(user)}
                </span>
              </span>
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-graphite transition-colors hover:bg-cream-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-graphite hover:bg-cream-deep md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-primary/10 bg-cream md:hidden"
        >
          <ul className="space-y-1 px-4 py-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2 text-base font-semibold transition-colors hover:bg-cream-deep ${
                    isActive(link.href) ? "text-primary" : "text-graphite"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              {user ? (
                <div className="space-y-2">
                  <span className="flex items-center gap-2 px-3">
                    <Avatar user={user} />
                    <span className="truncate text-base font-semibold text-graphite">
                      {displayName(user)}
                    </span>
                  </span>
                  <form action={signOutAction}>
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-1.5 rounded-full border border-primary/20 px-5 py-2 text-base font-semibold text-graphite transition-colors hover:bg-cream-deep"
                    >
                      <LogOut className="h-4 w-4" aria-hidden="true" />
                      Sign out
                    </button>
                  </form>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block rounded-full bg-primary px-5 py-2 text-center text-base font-semibold text-cream transition-colors hover:bg-primary-dark"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
