import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto z-[100]">
      <div className="max-w-screen-xl mx-auto px-4 py-8 md:flex md:items-center md:justify-between">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <Link
            href="http://www.latvalafarms.fi/"
            target="_blank"
            className="text-lg font-semibold text-gray-700 dark:text-gray-300 hover:underline"
          >
            🌾 Latvala Maatila website
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Supporting your farm since 2025.
          </p>
        </div>

        <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-lg text-gray-600 dark:text-gray-400 font-medium">
          <li>
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/licensing" className="hover:underline">
              Licensing
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="text-center py-4 text-lg text-gray-400 dark:text-gray-500 border-t border-gray-100 dark:border-gray-800">
        © 2025 Latvala Maatila™. All rights reserved.
      </div>
    </footer>
  );
}
