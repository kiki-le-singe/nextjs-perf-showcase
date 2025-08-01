import Link from "next/link";
import DynamicTabsDemo from "@/components/dynamic-tabs-demo";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-6 py-12">
        {/* Back Navigation */}
        <Link
          href="/code-splitting"
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

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dynamic Tabs Loading
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tab content loaded dynamically when selected, reducing initial
            bundle size
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Tab content loaded on demand
          </div>
        </div>

        {/* Dashboard Interface */}
        <DynamicTabsDemo />
      </div>
    </div>
  );
}
