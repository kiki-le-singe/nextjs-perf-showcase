import { Check } from 'lucide-react'
import Link from 'next/link'

import BackTo from '@/components/back-to'

export default function Page() {
  const examples = [
    {
      title: 'Basic Streaming',
      description: 'Simple user profile with skeleton loading',
      href: 'streaming/basic',
      features: ['Single component', 'Basic skeleton', '2s delay'],
    },
    {
      title: 'Dashboard Streaming',
      description: 'Multiple cards loading at different speeds',
      href: 'streaming/dashboard',
      features: ['4 metric cards', 'Staggered timing', '500ms - 2s delays'],
    },
    {
      title: 'Product Page',
      description: 'Nested streaming with error handling',
      href: 'streaming/product',
      features: ['Nested components', 'Error boundaries', 'Multiple skeletons'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home Navigation */}
        <BackTo />

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Next.js Streaming Examples</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore different streaming patterns and loading states that make your app feel instant.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {examples.map(example => (
            <Link key={example.href} href={example.href}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 h-full cursor-pointer border border-transparent hover:border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{example.title}</h3>
                <p className="text-gray-600 mb-4">{example.description}</p>
                <div className="space-y-2">
                  {example.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-500">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-blue-600 font-medium text-sm">View Example →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About These Examples</h2>
          <div className="prose text-gray-600">
            <p className="mb-4">
              These examples demonstrate Next.js streaming capabilities using the App Router. Each
              example shows different patterns you can use in real applications:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Progressive Loading:</strong> Content appears as soon as it's ready
              </li>
              <li>
                <strong>Skeleton States:</strong> Maintain layout while content loads
              </li>
              <li>
                <strong>Error Boundaries:</strong> Graceful handling of failed components
              </li>
              <li>
                <strong>Nested Streaming:</strong> Components stream independently within parents
              </li>
            </ul>
            <p className="mt-4">
              Open your browser's Network tab and throttle to "Slow 3G" to see streaming in action!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
