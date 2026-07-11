"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChefHat } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const loggedOutLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/about", label: "About" },
  ];

  const loggedInLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    { href: "/items/add", label: "Add Recipe" },
    { href: "/items/manage", label: "Manage Recipes" },
  ];

  const links = user ? loggedInLinks : loggedOutLinks;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-basil-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-semibold text-basil-800">
          <ChefHat className="w-6 h-6 text-basil-600" />
          Savorly
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? "text-basil-700" : "text-slate-600 hover:text-basil-700"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {!user && (
            <Link
              href="/login"
              className="text-sm font-medium bg-basil-600 text-white px-4 py-2 rounded-full hover:bg-basil-700 transition-colors"
            >
              Log in
            </Link>
          )}

          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-basil-700"
              >
                <span className="w-8 h-8 rounded-full bg-honey-400 text-white flex items-center justify-center text-xs font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1">
                  <div className="px-4 py-2 text-xs text-slate-400 border-b border-slate-100">{user.email}</div>
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-basil-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <button className="md:hidden text-slate-700" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 flex flex-col gap-3">
          {links.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-slate-600">
              {link.label}
            </Link>
          ))}
          {!user ? (
            <Link href="/login" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-basil-700">
              Log in
            </Link>
          ) : (
            <button
              onClick={() => {
                setMobileOpen(false);
                logout();
              }}
              className="text-left text-sm font-medium text-red-500"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
