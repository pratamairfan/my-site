import Link from "next/link";
import Navigation from "./components/Navigation";
import { Icons } from "./components/Icons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <Navigation session={session} />
      <div className="min-h-screen bg-accent">
        {/* Hero Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Better-Auth
              <span className="block text-indigo-600">Authentication Demo</span>
            </h1>
            <p className="text-xl text-foreground mb-8 max-w-3xl mx-auto">
              Experience the power of better-auth with this comprehensive demo
              showcasing social providers, email/password authentication, and
              protected routes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Try Authentication
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center px-6 py-3 border border-background text-base font-medium rounded-lg text-foreground bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl shadow-lg p-8 border border-accent hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Icons.Social className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Social Authentication
              </h3>
              <p className="text-gray-400">
                Seamlessly authenticate users with Google, GitHub, and other
                popular social providers. No need to manage passwords or worry
                about security.
              </p>
            </div>

            <div className="bg-background rounded-xl shadow-lg p-8 border border-accent hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Icons.Email className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Email & Password
              </h3>
              <p className="text-gray-400">
                Traditional email and password authentication with secure
                password hashing, email verification, and password reset
                functionality.
              </p>
            </div>

            <div className="bg-background rounded-xl shadow-lg p-8 border border-accent hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Icons.Secure className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Secure & Protected
              </h3>
              <p className="text-gray-400">
                Built-in security features including JWT tokens, session
                management, and protected routes that only authenticated users
                can access.
              </p>
            </div>
          </div>

          {/* Demo Section */}
          <div className="mt-20 bg-background rounded-2xl shadow-xl p-8 border border-accent">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Try It Out
              </h2>
              <p className="text-lg text-gray-400">
                Experience the authentication flow with our interactive demo
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Authentication Flow
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-indigo-600">
                        1
                      </span>
                    </div>
                    <span className="text-gray-400">
                      Visit the authentication page
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-indigo-600">
                        2
                      </span>
                    </div>
                    <span className="text-gray-400">
                      Choose your preferred sign-in method
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-indigo-600">
                        3
                      </span>
                    </div>
                    <span className="text-gray-400">
                      Access the protected dashboard
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Available Features
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icons.Checkmark className="w-5 h-5 text-green-500" />
                    <span className="text-gray-400">
                      Google OAuth integration
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Checkmark className="w-5 h-5 text-green-500" />
                    <span className="text-gray-400">
                      GitHub OAuth integration
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Checkmark className="w-5 h-5 text-green-500" />
                    <span className="text-gray-400">
                      Email/password authentication
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Checkmark className="w-5 h-5 text-green-500" />
                    <span className="text-gray-400">Protected routes</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icons.Checkmark className="w-5 h-5 text-green-500" />
                    <span className="text-gray-400">
                      User session management
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/auth"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Start Demo
              </Link>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-20 text-center">
            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                About Better-Auth
              </h3>
              <p className="text-blue-800 text-lg mb-6">
                Better-Auth is a modern, flexible authentication library for
                Next.js that provides a seamless developer experience with
                built-in security and extensive customization options.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://better-auth.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-lg text-blue-700 bg-background hover:bg-blue-50 transition-colors"
                >
                  Learn More
                </a>
                <a
                  href="https://github.com/next-authjs/next-auth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-blue-300 text-sm font-medium rounded-lg text-blue-700 bg-background hover:bg-blue-50 transition-colors"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Better-Auth Demo</h3>
              <p className="text-gray-400 mb-6">
                A demonstration of modern authentication patterns and best
                practices
              </p>
              <div className="flex justify-center space-x-6">
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/auth"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Authentication
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
