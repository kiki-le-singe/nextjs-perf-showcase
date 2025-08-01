import { Suspense } from "react";
import Link from "next/link";

// Mock async components with different delays
async function RevenueCard() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-2 bg-green-100 rounded-full">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            />
          </svg>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">$45,231</p>
          <p className="text-sm text-green-600">+20.1% from last month</p>
        </div>
      </div>
    </div>
  );
}

async function UsersCard() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-2 bg-blue-100 rounded-full">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            />
          </svg>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">Active Users</p>
          <p className="text-2xl font-bold text-gray-900">2,350</p>
          <p className="text-sm text-blue-600">+180.1% from last month</p>
        </div>
      </div>
    </div>
  );
}

async function OrdersCard() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-2 bg-purple-100 rounded-full">
          <svg
            className="w-6 h-6 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900">12,234</p>
          <p className="text-sm text-purple-600">+19% from last month</p>
        </div>
      </div>
    </div>
  );
}

async function ConversionCard() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="p-2 bg-orange-100 rounded-full">
          <svg
            className="w-6 h-6 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4"
            />
          </svg>
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
          <p className="text-2xl font-bold text-gray-900">3.24%</p>
          <p className="text-sm text-orange-600">+1.3% from last month</p>
        </div>
      </div>
    </div>
  );
}

// Skeleton component for metric cards
function MetricCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="ml-4 flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
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
          Dashboard Streaming
        </h1>
        <p className="text-gray-600 mb-8">
          Cards load progressively at different speeds
        </p>

        {/* Header loads immediately */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Analytics Overview
          </h2>
          <p className="text-gray-600">Your business metrics for this month</p>
        </div>

        {/* Grid of metric cards that stream in at different times */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Suspense fallback={<MetricCardSkeleton />}>
            <RevenueCard />
          </Suspense>

          <Suspense fallback={<MetricCardSkeleton />}>
            <UsersCard />
          </Suspense>

          <Suspense fallback={<MetricCardSkeleton />}>
            <OrdersCard />
          </Suspense>

          <Suspense fallback={<MetricCardSkeleton />}>
            <ConversionCard />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
