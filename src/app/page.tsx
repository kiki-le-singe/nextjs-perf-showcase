import { Zap, Copy, Monitor, ChevronRight, Github, FileText, X as TwitterIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <Image
              className="mx-auto mb-4"
              src="/next.svg"
              alt="Next.js logo"
              width={240}
              height={50}
              priority
            />
            Performance Showcase
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore advanced Next.js optimization techniques including streaming, code splitting,
            and progressive loading for better user experiences.
          </p>
        </div>

        {/* Examples Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {/* Streaming Card */}
          <Link href="/streaming" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-blue-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Streaming Examples</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Learn how to implement React Suspense and streaming to progressively load content
                and improve perceived performance.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  React Suspense
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Progressive Loading
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  Skeleton UI
                </span>
              </div>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                View Examples
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Code Splitting Card */}
          <Link href="/code-splitting" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-green-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Copy className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Code Splitting Examples</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Discover dynamic imports and code splitting techniques to reduce bundle sizes and
                load components only when needed.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Dynamic Imports
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Bundle Optimization
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Lazy Loading
                </span>
              </div>
              <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                View Examples
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Rendering Methods Card */}
          <Link href="/rendering-methods" className="group">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-200 group-hover:border-purple-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Monitor className="w-6 h-6 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">Rendering Methods</h2>
              </div>
              <p className="text-gray-600 mb-6">
                Explore Next.js rendering strategies: SSG, ISR, SSR, and CSR. Learn when and how to
                use each method for optimal performance.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  SSG
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  ISR
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  SSR
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                  CSR
                </span>
              </div>
              <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                View Examples
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Connect with me</p>
            <div className="flex justify-center gap-6 flex-wrap mb-6">
              <a
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                href="https://medium.com/@aalbertini95_90842"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="w-5 h-5" />
                Medium
              </a>
              <a
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                href="https://github.com/kiki-le-singe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
                GitHub
              </a>
              <a
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                href="https://x.com/kiki_le_singe"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterIcon className="w-5 h-5" />
                (Twitter)
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
