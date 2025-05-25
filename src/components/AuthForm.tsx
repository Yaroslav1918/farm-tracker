"use client";

import { usePathname } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import { signIn } from "../app/signin/actions";
import { signup } from "../app/signup/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AuthForm() {
  const pathname = usePathname();
  const isSignup = pathname.includes("/signup");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  async function handleAction(formData: FormData) {
    const result = await (isSignup ? signup(formData) : signIn(formData));

    if (result?.error) {
      setError(result.error);
    } else {
      router.push("/timer");
    }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-10">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link
          href="/"
          className="flex justify-center items-center -m-1.5 p-1.5"
        >
          <Image
            width={100}
            height={100}
            alt="Pig Logo"
            src="/pig.png"
            className="w-auto"
          />
        </Link>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          {isSignup ? "Create a new account" : "Sign in to your account"}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          {isSignup && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="block w-full rounded-md  border border-gray-300bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="insideWorker"
                  className="block text-sm font-medium text-gray-900"
                >
                  Are you an inside worker?
                </label>
                <div className="mt-2 ">
                  <select
                    id="insideWorker"
                    name="insideWorker"
                    required
                    className="block w-full rounded-md border border-gray-300 bg-white border-gray-300 px-3 py-1.5 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white border border-gray-300 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 border border-gray-300 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>
          {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
          <div>
            <button
              formAction={handleAction}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isSignup ? "Sign up" : "Sign in"}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          {isSignup ? "Already have an account?" : "Not registered yet?"}{" "}
          <Link
            href={isSignup ? "/signin" : "/signup"}
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {isSignup ? "Log in" : "Create one"}
          </Link>
        </p>
      </div>
    </div>
  );
}
