import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-white">
          Personal Finance Manager
        </h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
          Take control of your finances with our easy-to-use dashboard.
        </p>
        <div className="space-x-4">
          <Link
            href="/login"
            className="rounded-md bg-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="rounded-md border border-gray-300 bg-white px-6 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
