"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { API_ENDPOINTS } from "@/lib/api";

// Mock chart data generator
const generateChartData = (type: string, points: number = 12) => {
  const labels = [];
  const data = [];
  
  for (let i = 0; i < points; i++) {
    labels.push(`Point ${i + 1}`);
    
    if (type === 'sales') {
      data.push(Math.floor(Math.random() * 5000) + 1000);
    } else if (type === 'users') {
      data.push(Math.floor(Math.random() * 1000) + 100);
    } else if (type === 'revenue') {
      data.push(Math.floor(Math.random() * 10000) + 2000);
    } else {
      data.push(Math.floor(Math.random() * 100));
    }
  }
  
  return { labels, data };
};

// Simple chart component (simulating a chart library)
const SimpleChart = ({ data, color, title, type }: any) => {
  const maxValue = Math.max(...data.data);
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="h-48 flex items-end space-x-1">
        {data.data.map((value: number, index: number) => {
          const height = (value / maxValue) * 100;
          return (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t rounded-t transition-all duration-500 hover:opacity-80 cursor-pointer"
              style={{
                height: `${height}%`,
                backgroundImage: `linear-gradient(to top, ${color}, ${color}80)`
              }}
              title={`${data.labels[index]}: ${value.toLocaleString()}`}
            />
          );
        })}
      </div>
      <div className="mt-4 text-center">
        <span className="text-2xl font-bold text-gray-900">
          {type === 'currency' ? '$' : ''}{data.data.reduce((a: number, b: number) => a + b, 0).toLocaleString()}
        </span>
        <p className="text-sm text-gray-600">Total {title.toLowerCase()}</p>
      </div>
    </div>
  );
};

// Interactive filter component
const DataFilter = ({ filters, activeFilter, onFilterChange }: any) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter: any) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === filter.key
              ? 'bg-pink-600 text-white'
              : 'bg-white text-gray-700 hover:bg-pink-50 border border-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

// Real-time metrics component
const RealTimeMetrics = () => {
  const [metrics, setMetrics] = useState({
    activeUsers: 0,
    pageViews: 0,
    conversionRate: 0,
    avgSessionTime: 0
  });

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({
        activeUsers: Math.floor(Math.random() * 1000) + 100,
        pageViews: Math.floor(Math.random() * 10000) + 5000,
        conversionRate: (Math.random() * 5 + 2).toFixed(1),
        avgSessionTime: Math.floor(Math.random() * 300) + 120
      });
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg p-4 shadow-md text-center">
        <div className="text-2xl font-bold text-pink-600">{metrics.activeUsers}</div>
        <div className="text-sm text-gray-600">Active Users</div>
        <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-2 animate-pulse"></div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-md text-center">
        <div className="text-2xl font-bold text-blue-600">{metrics.pageViews.toLocaleString()}</div>
        <div className="text-sm text-gray-600">Page Views</div>
        <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-2 animate-pulse"></div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-md text-center">
        <div className="text-2xl font-bold text-green-600">{metrics.conversionRate}%</div>
        <div className="text-sm text-gray-600">Conversion Rate</div>
        <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-2 animate-pulse"></div>
      </div>
      
      <div className="bg-white rounded-lg p-4 shadow-md text-center">
        <div className="text-2xl font-bold text-purple-600">{formatTime(metrics.avgSessionTime)}</div>
        <div className="text-sm text-gray-600">Avg Session</div>
        <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default function CSRPage() {
  const [chartData, setChartData] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [refreshCount, setRefreshCount] = useState(0);

  const filters = [
    { key: 'all', label: 'All Data' },
    { key: 'last7days', label: 'Last 7 Days' },
    { key: 'last30days', label: 'Last 30 Days' },
    { key: 'thisyear', label: 'This Year' }
  ];

  // CSR: Fetch data in the browser using real API
  const fetchData = async (filter = 'all') => {
    setLoading(true);
    
    try {
      // Fetch user data from real API
      const userResponse = await fetch(API_ENDPOINTS.user);
      const user = await userResponse.json();
      
      // Fetch dashboard data from real API  
      const dashboardResponse = await fetch(API_ENDPOINTS.dashboard);
      const dashboard = await dashboardResponse.json();
      
      // Simulate additional analytics API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const points = filter === 'last7days' ? 7 : filter === 'last30days' ? 30 : 12;
      
      // Combine real API data with generated charts
      setChartData({
        sales: generateChartData('sales', points),
        users: generateChartData('users', points),
        revenue: {
          labels: Array.from({length: points}, (_, i) => `Point ${i + 1}`),
          data: Array.from({length: points}, () => 
            Math.floor(Math.random() * 5000) + parseInt(dashboard.stats.revenue)
          )
        },
        engagement: generateChartData('engagement', points)
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // Fallback to mock data
      const points = filter === 'last7days' ? 7 : filter === 'last30days' ? 30 : 12;
      setChartData({
        sales: generateChartData('sales', points),
        users: generateChartData('users', points),
        revenue: generateChartData('revenue', points),
        engagement: generateChartData('engagement', points)
      });
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData(activeFilter);
  }, [activeFilter]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleRefresh = () => {
    setRefreshCount(prev => prev + 1);
    fetchData(activeFilter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-pink-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            CSR - Client-Side Rendering
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            This interactive analytics dashboard demonstrates CSR using <code className="bg-gray-100 px-2 py-1 rounded text-sm">"use client"</code> and <code className="bg-gray-100 px-2 py-1 rounded text-sm">useEffect</code>. 
            The page loads instantly, then React fetches and renders dynamic data in the browser.
          </p>
          
          {/* CSR Benefits */}
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-2">🌐 CSR Benefits</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>✅ Instant page load</p>
              <p>✅ Rich interactions</p>
              <p>✅ Smooth transitions</p>
              <p>✅ Real-time updates</p>
              <p className="text-xs pt-2 border-t">
                <span className="font-medium">Refreshed:</span> {refreshCount} times
              </p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 rounded-lg p-6 mb-12 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Next.js 15 CSR Implementation</h3>
            <span className="bg-pink-600 text-white px-2 py-1 rounded text-xs">"use client"</span>
          </div>
          <pre className="text-pink-400 text-sm">
            <code>{`// CSR with Next.js 15 App Router & Real APIs
"use client";

import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '@/lib/api';

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from real APIs in the browser
    Promise.all([
      fetch(API_ENDPOINTS.user).then(r => r.json()),
      fetch(API_ENDPOINTS.dashboard).then(r => r.json())
    ])
    .then(([user, dashboard]) => {
      setData({ user, dashboard });
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <InteractiveCharts data={data} />
      <RealTimeMetrics />
    </div>
  );
}`}</code>
          </pre>
        </div>

        {/* Real-time Metrics */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Real-time Metrics</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Live data</span>
            </div>
          </div>
          <RealTimeMetrics />
        </div>

        {/* Interactive Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Interactive Analytics</h2>
            <button
              onClick={handleRefresh}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Data
            </button>
          </div>
          
          <DataFilter 
            filters={filters} 
            activeFilter={activeFilter} 
            onFilterChange={handleFilterChange} 
          />

          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-32 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <SimpleChart 
                data={chartData.sales} 
                color="#EC4899" 
                title="Sales Volume" 
                type="number"
              />
              <SimpleChart 
                data={chartData.users} 
                color="#3B82F6" 
                title="Active Users" 
                type="number"
              />
              <SimpleChart 
                data={chartData.revenue} 
                color="#10B981" 
                title="Revenue" 
                type="currency"
              />
              <SimpleChart 
                data={chartData.engagement} 
                color="#8B5CF6" 
                title="Engagement Rate" 
                type="percentage"
              />
            </div>
          )}
        </div>

        {/* Interactive Features Demo */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">CSR Interaction Examples</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border-2 border-dashed border-pink-200 rounded-lg hover:border-pink-400 transition-colors">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Filtering</h4>
              <p className="text-gray-600 text-sm">
                Data updates instantly as users interact with filter controls
              </p>
            </div>
            
            <div className="text-center p-6 border-2 border-dashed border-blue-200 rounded-lg hover:border-blue-400 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Dynamic Charts</h4>
              <p className="text-gray-600 text-sm">
                Interactive charts that respond to user input without page reloads
              </p>
            </div>
            
            <div className="text-center p-6 border-2 border-dashed border-green-200 rounded-lg hover:border-green-400 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Live Updates</h4>
              <p className="text-gray-600 text-sm">
                Metrics update automatically in the background using useEffect
              </p>
            </div>
          </div>
        </div>

        {/* CSR Performance Info */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">CSR Characteristics</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">How CSR Works</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-pink-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Instant Page Load</p>
                    <p className="text-gray-600 text-sm">Static HTML and JavaScript sent immediately</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-pink-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Client-Side Hydration</p>
                    <p className="text-gray-600 text-sm">React takes over and makes the page interactive</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-pink-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Data Fetching</p>
                    <p className="text-gray-600 text-sm">useEffect triggers API calls to fetch data</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-pink-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Dynamic Updates</p>
                    <p className="text-gray-600 text-sm">State changes trigger re-renders without page reloads</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Trade-offs</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-green-600 mb-2">Advantages</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Instant page transitions</li>
                    <li>• Rich, interactive experiences</li>
                    <li>• No page reloads needed</li>
                    <li>• Smooth animations and transitions</li>
                    <li>• Great for complex UI interactions</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-red-600 mb-2">Limitations</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Poor SEO without additional setup</li>
                    <li>• Slower initial content display</li>
                    <li>• Requires JavaScript to function</li>
                    <li>• Larger client-side bundle</li>
                    <li>• Loading states needed for data</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* When to Use CSR */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white p-8 mb-12">
          <h3 className="text-2xl font-bold mb-4">When to Use CSR</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Perfect for:
              </h4>
              <ul className="space-y-2 text-pink-100">
                <li>• Interactive dashboards and analytics</li>
                <li>• Complex forms with dynamic validation</li>
                <li>• Real-time data visualization</li>
                <li>• Games and interactive applications</li>
                <li>• Admin panels and internal tools</li>
                <li>• Features requiring heavy user interaction</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Avoid for:
              </h4>
              <ul className="space-y-2 text-pink-100">
                <li>• SEO-critical marketing pages</li>
                <li>• Public blogs and content sites</li>
                <li>• Landing pages for conversion</li>
                <li>• Simple, mostly static content</li>
                <li>• Users with JavaScript disabled</li>
                <li>• Applications requiring fast initial content</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link
            href="/rendering-methods/ssr"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: SSR Example
          </Link>
          
          <Link
            href="/rendering-methods"
            className="inline-flex items-center text-pink-600 hover:text-pink-700 font-medium"
          >
            Back to Overview
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
