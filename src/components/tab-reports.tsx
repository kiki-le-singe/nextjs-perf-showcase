export default function TabReports() {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Reports</h3>
      <div className="space-y-4 mb-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-black">Monthly Sales Report</h4>
              <p className="text-gray-600 text-sm">Generated on Jan 15, 2024</p>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
              Download
            </button>
          </div>
        </div>
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-black">User Activity Report</h4>
              <p className="text-gray-600 text-sm">Generated on Jan 10, 2024</p>
            </div>
            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
              Download
            </button>
          </div>
        </div>
      </div>
      <p className="text-gray-600">
        📄 This reports tab loaded dynamically too! It could contain complex
        report generation logic, PDF libraries, or data processing code that's
        only needed when users want to view or generate reports.
      </p>
    </div>
  );
}