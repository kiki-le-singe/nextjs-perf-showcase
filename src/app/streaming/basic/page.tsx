import { Suspense } from "react";
import Link from "next/link";

// Mock async component that simulates API delay
async function UserProfile() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          JD
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
          <p className="text-gray-600">Software Engineer</p>
          <p className="text-sm text-gray-500">Last seen 2 hours ago</p>
        </div>
      </div>
    </div>
  );
}

// Skeleton loading component
function UserProfileSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-28"></div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/streaming"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Examples
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Basic Streaming
        </h1>
        <p className="text-gray-600 mb-8">
          Simple example with skeleton loading
        </p>

        <div className="space-y-6">
          {/* This shows immediately */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Navigation & Header</h2>
            <p className="text-gray-600">
              This content loads instantly while other parts stream in.
            </p>
          </div>

          {/* This streams in after 2 seconds with skeleton fallback */}
          <Suspense fallback={<UserProfileSkeleton />}>
            <UserProfile />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
