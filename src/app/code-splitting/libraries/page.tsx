import ChartSection from "@/components/chart-section";
import AudioPlayer from "@/components/audio-player";
import MapSection from "@/components/map-section";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        {/* Back Navigation */}
        <Link
          href="/code-splitting"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
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
          Back to Examples
        </Link>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dynamically Load Heavy External Libraries
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Demonstrating dynamic imports for heavy third-party libraries to
            reduce initial bundle size
          </p>
          <div className="mt-6 inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Libraries loaded on demand
          </div>
        </div>

        {/* Components Grid */}
        <div className="space-y-8">
          {/* Chart Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4"
                  />
                </svg>
                Interactive Chart (Chart.js)
              </h2>
              <p className="text-green-100 text-sm mt-1">
                Heavy charting library (~200KB+) loaded dynamically
              </p>
            </div>
            <div className="p-6">
              <ChartSection />
            </div>
          </div>

          {/* Audio Player Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                  />
                </svg>
                Audio Waveform Player (WaveSurfer.js)
              </h2>
              <p className="text-purple-100 text-sm mt-1">
                Audio visualization library (~30KB+) with lazy loading
              </p>
            </div>
            <div className="p-6">
              <AudioPlayer audioUrl="/Kalimba.mp3" />
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Interactive Map (Leaflet.js)
              </h2>
              <p className="text-blue-100 text-sm mt-1">
                Full-featured mapping library (~145KB+) split from main bundle
              </p>
            </div>
            <div className="p-6">
              <MapSection />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Bundle Size Impact
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              By dynamically importing these libraries, you can reduce your
              initial bundle by <strong>375KB+</strong> — that&apos;s faster load
              times, especially on mobile networks.
            </p>
            <div className="flex justify-center space-x-6 text-sm mb-6">
              <div className="text-center">
                <div className="font-semibold text-green-600">Chart.js</div>
                <div className="text-gray-500">~200KB+</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-blue-600">Leaflet</div>
                <div className="text-gray-500">~145KB+</div>
              </div>
              <div className="text-center">
                <div className="font-semibold text-purple-600">WaveSurfer</div>
                <div className="text-gray-500">~30KB+</div>
              </div>
            </div>
            
            {/* Bundle Analysis Tools */}
            <div className="border-t border-gray-200 pt-4">
              <p className="text-gray-600 mb-3 text-sm">Check bundle sizes with these tools:</p>
              <div className="flex justify-center gap-4 flex-wrap">
                <a
                  className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors text-sm bg-gray-50 px-4 py-2 rounded-lg"
                  href="https://bundlephobia.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  BundlePhobia
                </a>
                <a
                  className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors text-sm bg-gray-50 px-4 py-2 rounded-lg"
                  href="https://pkg-size.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  pkg-size.dev
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
