export default function TabCharts() {
  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Charts & Analytics</h3>
      <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 mb-4">
        <div className="flex items-end justify-around h-32">
          <div className="bg-blue-500 rounded-t" style={{ height: '60px', width: '20px' }}></div>
          <div className="bg-blue-500 rounded-t" style={{ height: '80px', width: '20px' }}></div>
          <div className="bg-blue-500 rounded-t" style={{ height: '100px', width: '20px' }}></div>
          <div className="bg-blue-500 rounded-t" style={{ height: '70px', width: '20px' }}></div>
          <div className="bg-blue-500 rounded-t" style={{ height: '90px', width: '20px' }}></div>
        </div>
        <div className="text-center mt-4 text-gray-600">Sample Chart Visualization</div>
      </div>
      <p className="text-gray-600">
        📊 This charts tab was loaded dynamically! In a real application, this would contain
        heavy charting libraries like Chart.js or D3.js that would only load when users
        actually need to see the charts.
      </p>
    </div>
  );
}