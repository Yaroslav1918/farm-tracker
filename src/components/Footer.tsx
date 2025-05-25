import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 mt-auto z-[100]">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center justify-center  sm:justify-between">
          <Link
            href="http://www.latvalafarms.fi/"
            target="_blank"
            className="flex items-center justify-center mb-4 sm:mb-0  space-x-3 rtl:space-x-reverse"
          >
            <span className="text-lg font-large  text-gray-500 sm:mb-0 dark:text-gray-400">
              Our website
            </span>
          </Link>
          <ul className="flex flex-wrap items-center justify-center mb-6 text-lg font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/about" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6">
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
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-lg text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Latvala Maatila™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
