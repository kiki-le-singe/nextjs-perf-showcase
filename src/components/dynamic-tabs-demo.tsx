'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

import { cn } from '@/lib/utils'

// Dynamic tab components - loaded only when selected
const TabOverview = dynamic(() => import('./tab-overview'))
const TabCharts = dynamic(() => import('./tab-charts'))
const TabReports = dynamic(() => import('./tab-reports'))
const TabUsers = dynamic(() => import('./tab-users'))

const tabs = {
  tabOverview: TabOverview,
  tabCharts: TabCharts,
  tabReports: TabReports,
  tabUsers: TabUsers,
}

export default function DynamicTabsDemo() {
  const [activeTab, setActiveTab] = useState('tabOverview')
  const ActiveTabContent = tabs[activeTab as keyof typeof tabs]

  const getTabButtonClass = (tabName: string) =>
    cn(
      'px-4 py-2 rounded-lg font-medium transition-colors',
      tabName !== 'tabUsers' && 'mr-2', // Add margin-right to all except last
      activeTab === tabName
        ? 'bg-green-600 text-white'
        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
    )

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Tabs</h2>

          {/* Tab Navigation */}
          <div className="mb-6">
            <button
              onClick={() => setActiveTab('tabOverview')}
              className={getTabButtonClass('tabOverview')}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tabCharts')}
              className={getTabButtonClass('tabCharts')}
            >
              Charts
            </button>
            <button
              onClick={() => setActiveTab('tabReports')}
              className={getTabButtonClass('tabReports')}
            >
              Reports
            </button>
            <button
              onClick={() => setActiveTab('tabUsers')}
              className={getTabButtonClass('tabUsers')}
            >
              Users
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[300px] border-t pt-6">
            <ActiveTabContent />
          </div>
        </div>
      </div>

      {/* Performance Info */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">How It Works</h3>
        <ul className="text-gray-600 text-sm space-y-2">
          <li>
            • Each tab component is dynamically imported with{' '}
            <code className="bg-gray-200 px-1 rounded">dynamic()</code>
          </li>
          <li>• Only the Overview tab is loaded initially</li>
          <li>• Other tab code downloads when first clicked</li>
          <li>• Once loaded, tab switching is instant</li>
        </ul>
      </div>
    </div>
  )
}
