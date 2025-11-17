"use client";

import { ModeToggle } from "@/components/theme/theme-toggle";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Session = typeof auth.$Infer.Session;

export default function Navigation({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => {
    // Avoid changing markup during hydration: don't consider a route active
    // until the component has mounted on the client.
    if (!mounted) return false;
    return pathname === path;
  };

  return (
    <header className="backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold ">Better-Auth Demo</span>
          </Link>

          <nav className="flex items-center space-x-6">
            <ModeToggle />
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/")
                  ? "text-indigo-600 bg-indigo-50"
                  : "hover:text-indigo-600"
              }`}
            >
              Home
            </Link>

            {session && (
              <Link
                href="/dashboard"
                className="bg-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Dashboard
              </Link>
            )}

            {!session && (
              <Link
                href="/auth"
                className={`hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive("/auth")
                    ? "text-indigo-600 bg-indigo-50"
                    : "hover:text-indigo-600"
                }`}
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
