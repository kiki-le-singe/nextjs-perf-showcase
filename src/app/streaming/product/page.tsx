import { Suspense } from "react";
import Link from "next/link";

// Mock async components with different delays and one that fails
async function ProductInfo() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
              📱
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            iPhone 15 Pro
          </h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">$999.00</p>
          <p className="text-gray-600 mb-4">
            The most advanced iPhone yet with titanium design, Action Button,
            and powerful A17 Pro chip.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

async function ReviewSummary() {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center">
          <span className="text-2xl font-bold">4.8</span>
          <div className="ml-2 flex text-yellow-400">
            {"★★★★★".split("").map((star, i) => (
              <span key={i}>{star}</span>
            ))}
          </div>
        </div>
        <span className="text-gray-600">Based on 1,234 reviews</span>
      </div>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((stars) => (
          <div key={stars} className="flex items-center gap-2">
            <span className="w-3 text-sm">{stars}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{ width: `${stars === 5 ? 75 : stars === 4 ? 15 : 5}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function IndividualReviews() {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  const reviews = [
    {
      name: "Sarah M.",
      rating: 5,
      comment: "Amazing phone! The camera quality is incredible.",
      date: "2 days ago",
    },
    {
      name: "Mike R.",
      rating: 5,
      comment:
        "Fast delivery and exactly as described. Love the new Action Button.",
      date: "1 week ago",
    },
    {
      name: "Lisa K.",
      rating: 4,
      comment: "Great phone but expensive. Worth it for the camera upgrades.",
      date: "2 weeks ago",
    },
  ];

  return (
    <div className="space-y-4">
      {reviews.map((review, i) => (
        <div key={i} className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{review.name}</span>
              <div className="flex text-yellow-400 text-sm">
                {"★".repeat(review.rating)}
              </div>
            </div>
            <span className="text-sm text-gray-500">{review.date}</span>
          </div>
          <p className="text-gray-700">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

async function RelatedProducts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const products = [
    { name: "iPhone 14 Pro", price: "$899", image: "📱" },
    { name: "AirPods Pro", price: "$249", image: "🎧" },
    { name: "MagSafe Charger", price: "$39", image: "🔌" },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Related Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product, i) => (
          <div
            key={i}
            className="border rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-4xl mb-2">{product.image}</div>
            <h4 className="font-semibold text-gray-900">{product.name}</h4>
            <p className="text-blue-600 font-bold">{product.price}</p>
            <button className="mt-2 text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton components
function ProductInfoSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <div className="aspect-square bg-gray-200 rounded-lg"></div>
        </div>
        <div className="flex-1">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-12 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
}

function ReviewsSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="flex items-center gap-4 mb-4">
        <div className="h-8 bg-gray-200 rounded w-12"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-4 bg-gray-200 rounded"></div>
            <div className="flex-1 h-2 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedProductsSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="aspect-square bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/streaming"
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Product Page Streaming
        </h1>
        <p className="text-gray-600 mb-8">
          Nested streaming with error handling
        </p>

        <div className="space-y-6">
          {/* Product info loads first */}
          <Suspense fallback={<ProductInfoSkeleton />}>
            <ProductInfo />
          </Suspense>

          {/* Reviews section with nested streaming */}
          <div className="bg-white rounded-lg shadow p-6">
            <Suspense fallback={<ReviewsSkeleton />}>
              <ReviewSummary />
              <div className="mt-6">
                <Suspense
                  fallback={
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                    </div>
                  }
                >
                  <IndividualReviews />
                </Suspense>
              </div>
            </Suspense>
          </div>

          {/* Related products */}
          <Suspense fallback={<RelatedProductsSkeleton />}>
            <RelatedProducts />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
