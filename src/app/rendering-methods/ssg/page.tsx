import Link from 'next/link'

import { fetchBlogPostsData } from '@/lib/api'
import BackTo from '@/components/back-to'

// SSG: Fetch blog posts at build time and cache forever
async function getBlogPosts() {
  return fetchBlogPostsData({
    cache: 'force-cache', // SSG: Cache at build time
  })
}

export default async function SSGPage() {
  // This data is fetched at build time and cached forever
  const posts = await getBlogPosts()
  // const buildTime = new Date().toISOString()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">SSG - Static Site Generation</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            This page demonstrates Static Site Generation (SSG) using{' '}
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
              fetch(..., {`{ cache: 'force-cache' }`})
            </code>
            . The content is generated once at build time and served statically for ultra-fast
            performance.
          </p>

          {/* Build Time Info */}
          <div className="bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-900 mb-2">⚡ Performance Benefits</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>✅ Generated at build time</p>
              <p>✅ Served from CDN</p>
              <p>✅ No server computation</p>
              <p>✅ Excellent SEO</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-gray-900 rounded-lg p-6 mb-12 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Next.js 15 SSG Implementation</h3>
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">force-cache</span>
          </div>
          <pre className="text-green-400 text-sm">
            <code>{`// SSG with Next.js 15 App Router & Real API
import { fetchBlogPostsData } from '@/lib/api';

async function getBlogPosts() {
  // Real API call cached at build time
  return fetchBlogPostsData({
    cache: 'force-cache' // SSG strategy
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts(); // Fetched at build time
  
  return (
    <div>
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}`}</code>
          </pre>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {posts.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
                <span className="text-sm text-gray-500">{post.readTime}</span>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{post.title}</h2>

              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {post.author
                        .split(' ')
                        .map(n => n[0])
                        .join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <p className="text-xs text-gray-500">{post.date}</p>
                  </div>
                </div>

                <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center">
                  Read More
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
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose SSG?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Lightning Fast</h4>
              <p className="text-gray-600 text-sm">
                Pre-built HTML served instantly from CDN with zero server processing time.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">SEO Perfect</h4>
              <p className="text-gray-600 text-sm">
                Search engines can easily crawl and index your fully-rendered HTML pages.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Cost Effective</h4>
              <p className="text-gray-600 text-sm">
                No server costs for serving content - just CDN bandwidth and storage.
              </p>
            </div>
          </div>
        </div>

        {/* When to Use SSG */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white p-8 mb-12">
          <h3 className="text-2xl font-bold mb-4">When to Use SSG</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Perfect for:
              </h4>
              <ul className="space-y-2 text-green-100">
                <li>• Marketing websites</li>
                <li>• Blog posts and articles</li>
                <li>• Documentation sites</li>
                <li>• Product catalogs (mostly static)</li>
                <li>• Landing pages</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Avoid for:
              </h4>
              <ul className="space-y-2 text-green-100">
                <li>• User-specific content</li>
                <li>• Real-time data</li>
                <li>• Frequently changing content</li>
                <li>• Interactive dashboards</li>
                <li>• Content requiring authentication</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <BackTo 
            href="/rendering-methods"
            text="Back to Rendering Methods"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          />

          <Link
            href="/rendering-methods/isr"
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
          >
            Next: ISR Example
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

// This tells Next.js this is a static page
export const dynamic = 'force-static'
