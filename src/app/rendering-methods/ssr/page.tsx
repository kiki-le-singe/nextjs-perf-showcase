import Link from "next/link";
import { fetchUserData, fetchDashboardData } from "@/lib/api";
import type { User, DashboardData } from "@/lib/types";

export default async function SSRPage() {
  // SSR: Fresh data on every request (default behavior in Next.js 15+)
  const user: User = await fetchUserData(); 
  const dashboardData: DashboardData = await fetchDashboardData();
  
  const requestTime = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-orange-100 rounded-full mb-4">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            SSR - Server-Side Rendering
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            This personalized dashboard demonstrates modern SSR using <code className="bg-gray-100 px-2 py-1 rounded text-sm">default behavior</code>. 
            All data is generated fresh on each request with real-time, user-specific content.
          </p>
          
          {/* Request Time Info */}
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-2">⚡ SSR Benefits</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>✅ Always fresh data</p>
              <p>✅ Personalized content</p>
              <p>✅ Real-time updates</p>
              <p>✅ Perfect SEO</p>
              <p className="text-xs pt-2 border-t">
                <span className="font-medium">Generated on request:</span><br />
                {new Date(requestTime).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Modern SSR Explanation */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">SSR Best Practice</h3>
          <div className="space-y-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">✅ Cleanest Approach (Default)</h4>
              <div className="bg-gray-900 rounded-lg p-3 md:p-4 mb-4 overflow-x-auto">
                <pre className="text-green-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                  <code className="block">{`// SSR - Clean approach (Next.js 15+ default)
export default async function SSRPage() {
  // These are automatically no-store by default
  const user = await fetchUserData();
  const dashboard = await fetchDashboardData();
  return <div>...</div>;
}`}</code>
                </pre>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>🧹 <span className="font-medium">Cleanest code</span> - leverages framework defaults</p>
                <p>🚀 <span className="font-medium">Modern approach</span> - Next.js 15+ behavior</p>
                <p>⚡ <span className="font-medium">Same result</span> - fresh data on every request</p>
                <p>📝 <span className="font-medium">Less verbose</span> - no redundant cache options</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">📚 Version Differences</h4>
              <div className="bg-gray-900 rounded-lg p-3 md:p-4 mb-4 overflow-x-auto">
                <pre className="text-blue-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
                  <code className="block">{`// Next.js 15+ (current behavior)
const data = await fetch('/api/data'); 
// ↑ Automatically no-store by default

// Next.js 14 and below (legacy behavior)  
const data = await fetch('/api/data', { 
  cache: 'no-store' 
});
// ↑ Explicit cache needed for SSR

// Both achieve the same result!`}</code>
                </pre>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p>🆕 <span className="font-medium">Next.js 15+</span> - fetch is uncached by default</p>
                <p>⏪ <span className="font-medium">Next.js 14-</span> - fetch was cached by default</p>
                <p>⚖️ <span className="font-medium">Both work</span> - explicit cache still valid</p>
                <p>✨ <span className="font-medium">Cleaner</span> - use defaults when possible</p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 rounded-lg p-4 md:p-6 mb-12 overflow-x-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
            <h3 className="text-white font-semibold text-sm md:text-base">App Router SSR Implementation</h3>
            <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs self-start">default (no-store)</span>
          </div>
          <pre className="text-orange-400 text-xs md:text-sm whitespace-pre overflow-x-auto min-w-0">
            <code className="block">{`// Modern SSR with clean defaults
export default async function DashboardPage() {
  // Fresh data automatically (Next.js 15+ default)
  const user = await getCurrentUser();
  const dashboard = await getDashboardData();
  
  return (
    <div>
      <h1>Welcome back, {user.name}!</h1>
      <DashboardStats data={dashboard} />
    </div>
  );
}`}</code>
          </pre>
        </div>

        {/* User Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-lg md:text-xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 truncate">Welcome back, {user.name}!</h2>
                <p className="text-gray-600 text-sm md:text-base break-all">{user.email}</p>
                <p className="text-xs md:text-sm text-gray-500">
                  Last login: {new Date(user.lastLogin).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex flex-row sm:flex-col sm:text-right gap-2 sm:gap-0 items-start">
              <span className="bg-orange-100 text-orange-800 text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full whitespace-nowrap">
                {user.role}
              </span>
              <p className="text-xs md:text-sm text-gray-500 sm:mt-2 whitespace-nowrap">
                Member since {new Date(user.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.totalOrders}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">↗️ Updated now</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-3xl font-bold text-gray-900">${dashboardData.stats.revenue}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">↗️ Real-time data</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Subscriptions</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.activeSubscriptions}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">↗️ Live count</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Support Tickets</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardData.stats.supportTickets}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-yellow-600 mt-2">⚠️ Needs attention</p>
          </div>
        </div>

        {/* Dashboard Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {dashboardData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' : 
                    activity.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.message}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.time).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activity.status === 'success' ? 'bg-green-100 text-green-800' : 
                    activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Notifications</h3>
            <div className="space-y-4">
              {dashboardData.notifications.map((notification) => (
                <div key={notification.id} className={`p-4 rounded-lg border-l-4 ${
                  notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' : 'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{notification.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                    </div>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-orange-500 rounded-full ml-2 mt-1"></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SSR Implementation Details */}
        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 mb-8 md:mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">SSR Implementation Details</h3>
          <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Request Details</h4>
              <div className="space-y-3 text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-gray-600">Generated at:</span>
                  <span className="font-mono text-gray-900 break-all">{new Date(requestTime).toLocaleTimeString()}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-gray-600">Rendering strategy:</span>
                  <span className="font-mono text-orange-600 break-all">SSR (Server-Side)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-gray-600">Cache strategy:</span>
                  <span className="font-mono text-orange-600 break-all">no-store (default)</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                  <span className="text-gray-600">Data freshness:</span>
                  <span className="text-green-600 font-medium">Real-time</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Why This Approach?</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm leading-relaxed">User-specific personalized data</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm leading-relaxed">Real-time activity feeds</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm leading-relaxed">Authentication-required content</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-sm leading-relaxed">Following modern best practices</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* When to Use SSR */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white p-8 mb-12">
          <h3 className="text-2xl font-bold mb-4">When to Use SSR</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Perfect for:
              </h4>
              <ul className="space-y-2 text-orange-100">
                <li>• User dashboards and profiles</li>
                <li>• Personalized content</li>
                <li>• Real-time data displays</li>
                <li>• Authentication-required pages</li>
                <li>• Dynamic, frequently changing content</li>
                <li>• Server-side data processing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Consider alternatives for:
              </h4>
              <ul className="space-y-2 text-orange-100">
                <li>• Static marketing pages (use SSG)</li>
                <li>• Slowly changing content (use ISR)</li>
                <li>• Heavy client interactions (use CSR)</li>
                <li>• Simple blogs (use SSG)</li>
                <li>• High-traffic public pages (use ISR/SSG)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/rendering-methods/isr"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: ISR Example
          </Link>
          
          <Link
            href="/rendering-methods/csr"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
          >
            Next: CSR Example
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

