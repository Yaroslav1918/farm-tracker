"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { logout } from "@/app/logout/action";
import type { User } from "@supabase/supabase-js";

const navigation = [
  { name: "Company info", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "Hours tracker", href: "/timer", isLoggedIn: true },
  { name: "Reports", href: "/reports", isLoggedIn: true },
];

export default function HeaderClient({ user }: { user: User | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b-1 border-gray-100 shadow-md">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex flex-1">
          {/* Logo */}
          <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-26 lg:h-26 relative cursor-pointer">
            <Link href="/">
              {" "}
              <Image
                src="/pig.png"
                alt="Pig Logo"
                fill
                className="object-contain"
              />{" "}
            </Link>
          </div>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <nav>
            {navigation
              .filter((item) => !item.isLoggedIn || user)
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-gray-700 me-4 md:me-6 "
                >
                  {item.name}
                </Link>
              ))}
          </nav>
        </div>

        {user ? (
          <form
            action={logout}
            className="hidden lg:flex lg:flex-1 lg:justify-end"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-gray-900"
            >
              Logout
            </button>
          </form>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/signin"
              className="text-lg font-semibold text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-40 bg-black/50" />

        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-xl px-6 py-6 sm:ring-1 sm:ring-gray-900/10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Image width={48} height={48} src="/pig.png" alt="Pig Logo" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            {navigation
              .filter((item) => !item.isLoggedIn || user)
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-4 py-2 text-base font-medium text-gray-700 hover:bg-indigo-100 transition"
                >
                  {item.name}
                </Link>
              ))}
          </div>

          {/* Auth Section */}
          <div className="mt-8 border-t border-gray-400 pt-4">
            {user ? (
              <form
                action={logout}
                onSubmit={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#f26d6b] px-4 py-2 text-white font-semibold hover:bg-red-500 transition"
                >
                  Logout
                </button>
              </form>
            ) : (
              <Link
                href="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center rounded-md bg-indigo-400 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition"
              >
                Log in
              </Link>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
