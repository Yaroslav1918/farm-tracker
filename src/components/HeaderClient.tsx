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
  { name: "Hours tracker", href: "/timer", isLoggedIn: true },
];

export default function HeaderClient({ user }: { user: User | null }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b-1 border-gray-100 shadow-md">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image width={60} height={60} alt="Pig Logo" src="/pig.png" />
          </Link>
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
                  className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-gray-700 me-4 md:me-6"
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
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <Image width={60} height={60} alt="Pig Logo" src="/pig.png" />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-4">
                {navigation
                  .filter((item) => !item.isLoggedIn || user)
                  .map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
              </div>

              {user ? (
                <div className="py-2">
                  <form
                    action={logout}
                    onSubmit={() => {
                      setMobileMenuOpen(false);
                    }}
                  >
                    <button
                      type="submit"
                      style={{ cursor: "pointer" }}
                    >
                      Logout
                    </button>
                  </form>
                </div>
              ) : (
                <div className="py-2">
                  <Link
                    href="/signin"
                    className="-mx-3 block rounded-lg px-3  text-base/7  text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Log in
                  </Link>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
