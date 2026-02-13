import {
  Check,
  ChevronRight,
  Zap,
  TrendingDown,
  Smartphone,
  Rocket,
  Target,
  RotateCcw,
} from 'lucide-react'
import Link from 'next/link'

import BackTo from '@/components/back-to'

export default function Page() {
  const examples = [
    {
      title: 'Dynamic Tabs',
      description: 'Tab content loaded only when selected',
      href: '/tabs',
      features: ['Dashboard interface', 'On-demand loading', 'Skeleton states'],
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Dynamic Modal',
      description: 'Modal components excluded from initial bundle',
      href: '/modal',
      features: ['Multiple modal types', 'Lazy loading', 'Loading states'],
      color: 'from-purple-500 to-pink-600',
    },
    {
      title: 'Heavy Libraries',
      description: 'Third-party libraries loaded dynamically',
      href: '/libraries',
      features: ['Chart.js (~200KB)', 'Leaflet (~145KB)', 'WaveSurfer (~30KB)'],
      color: 'from-blue-500 to-cyan-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-6 py-12">
        {/* Back to Home Navigation */}
        <BackTo />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Code Splitting Examples</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore different code splitting patterns to optimize bundle size and improve
            performance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {examples.map(example => (
            <Link key={example.href} href={`/code-splitting${example.href}`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer h-full">
                <div className={`bg-gradient-to-r ${example.color} px-6 py-4`}>
                  <h3 className="text-xl font-semibold text-white mb-2">{example.title}</h3>
                  <p className="text-white/90 text-sm">{example.description}</p>
                </div>
                <div className="p-6">
                  <div className="space-y-2 mb-4">
                    {example.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-green-500 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-blue-600 font-medium text-sm flex items-center">
                      View Example
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Code Splitting</h2>
          <div className="prose text-gray-600">
            <p className="mb-4">
              Code splitting allows you to break your application into smaller JavaScript bundles
              that can be loaded on demand. This leads to:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Zap className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Faster initial load times</span>
                </li>
                <li className="flex items-start">
                  <TrendingDown className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Reduced bundle sizes</span>
                </li>
                <li className="flex items-start">
                  <Smartphone className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                  <span>Better mobile experience</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Rocket className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                  <span>Improved perceived performance</span>
                </li>
                <li className="flex items-start">
                  <Target className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                  <span>Load only what's needed</span>
                </li>
                <li className="flex items-start">
                  <RotateCcw className="w-4 h-4 text-blue-500 mr-2 mt-0.5" />
                  <span>Cached for future visits</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
