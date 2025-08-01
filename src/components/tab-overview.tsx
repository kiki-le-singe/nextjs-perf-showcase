export default function TabOverview() {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">$12,345</div>
          <div className="text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">1,234</div>
          <div className="text-gray-600">Active Users</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">98.5%</div>
          <div className="text-gray-600">System Uptime</div>
        </div>
      </div>
      <p className="text-gray-600">
        This is the overview tab content. It shows key metrics and summary information
        about your dashboard. This content was loaded dynamically when you first clicked
        the Overview tab.
      </p>
    </div>
  );
}