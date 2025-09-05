import { fetchDashboardData } from "@/lib/api";
import type { DashboardData } from "@/lib/types";
import { cn } from "@/lib/utils";

export async function DashboardContent({
  searchParams,
}: {
  searchParams?: Promise<{ cache?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const cacheMode =
    resolvedSearchParams?.cache === "force-cache" ? "force-cache" : "no-store";

  console.log(
    `%c📝 [DASHBOARD CONTENT]%c Fetching activity & notifications with cache: %c${cacheMode}%c...`,
    "color: #7C3AED; font-weight: bold",
    "color: #6B7280",
    "color: #DC2626; font-weight: bold",
    "color: #6B7280"
  );
  const dashboardData: DashboardData =
    cacheMode === "force-cache"
      ? await fetchDashboardData({ cache: "force-cache" })
      : await fetchDashboardData();

  console.log(
    `%c✅ [DASHBOARD CONTENT]%c Content fetched (%c${cacheMode}%c): Activities: %c${
      dashboardData.recentActivity.length
    }%c items | Notifications: %c${
      dashboardData.notifications.length
    }%c items | Latest Activity: %c"${
      dashboardData.recentActivity[0]?.message || "None"
    }"%c`,
    "color: #7C3AED; font-weight: bold",
    "color: #374151",
    "color: #DC2626; font-weight: bold",
    "color: #374151",
    "color: #F59E0B; font-weight: bold",
    "color: #374151",
    "color: #F59E0B; font-weight: bold",
    "color: #374151",
    "color: #F59E0B; font-weight: bold",
    "color: #374151"
  );

  return (
    <div className="grid lg:grid-cols-3 gap-8 mb-12">
      {/* Recent Activity */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {dashboardData.recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
            >
              <div
                className={cn(
                  "w-3 h-3 rounded-full",
                  activity.status === "success"
                    ? "bg-green-500"
                    : activity.status === "pending"
                    ? "bg-yellow-500"
                    : "bg-blue-500"
                )}
              ></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity.message}</p>
                <p className="text-sm text-gray-500">
                  {new Date(activity.time).toLocaleString()}
                </p>
              </div>
              <span
                className={cn(
                  "px-2 py-1 text-xs rounded-full",
                  activity.status === "success"
                    ? "bg-green-100 text-green-800"
                    : activity.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                )}
              >
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
            <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {notification.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {notification.message}
                  </p>
                </div>
                {notification.unread && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
