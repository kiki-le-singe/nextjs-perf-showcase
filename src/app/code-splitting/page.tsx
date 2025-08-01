import Link from "next/link";

export default function Page() {
  const examples = [
    {
      title: "Dynamic Tabs",
      description: "Tab content loaded only when selected",
      href: "/tabs",
      features: ["Dashboard interface", "On-demand loading", "Skeleton states"],
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Dynamic Modal",
      description: "Modal components excluded from initial bundle",
      href: "/modal",
      features: ["Multiple modal types", "Lazy loading", "Loading states"],
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Heavy Libraries",
      description: "Third-party libraries loaded dynamically",
      href: "/libraries",
      features: ["Chart.js (~200KB)", "Leaflet (~145KB)", "WaveSurfer (~30KB)"],
      color: "from-blue-500 to-cyan-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-6 py-12">
        {/* Back to Home Navigation */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
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
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Code Splitting Examples
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore different code splitting patterns to optimize bundle size
            and improve performance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {examples.map((example) => (
            <Link key={example.href} href={`/code-splitting${example.href}`}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer h-full">
                <div className={`bg-gradient-to-r ${example.color} px-6 py-4`}>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {example.title}
                  </h3>
                  <p className="text-white/90 text-sm">{example.description}</p>
                </div>
                <div className="p-6">
                  <div className="space-y-2 mb-4">
                    {example.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <svg
                          className="w-4 h-4 text-green-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-blue-600 font-medium text-sm flex items-center">
                      View Example
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            About Code Splitting
          </h2>
          <div className="prose text-gray-600">
            <p className="mb-4">
              Code splitting allows you to break your application into smaller
              JavaScript bundles that can be loaded on demand. This leads to:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">⚡</span>
                  <span>Faster initial load times</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">📉</span>
                  <span>Reduced bundle sizes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">📱</span>
                  <span>Better mobile experience</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">🚀</span>
                  <span>Improved perceived performance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">🎯</span>
                  <span>Load only what's needed</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">🔄</span>
                  <span>Cached for future visits</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
