"use client";

import { useState, useEffect } from "react";

export function CacheDemoToggle() {
  const [isForceCache, setIsForceCache] = useState(false);

  // Update URL parameter to control cache behavior
  useEffect(() => {
    const url = new URL(window.location.href);
    if (isForceCache) {
      url.searchParams.set("cache", "force-cache");
    } else {
      url.searchParams.delete("cache");
    }
    window.history.replaceState({}, "", url.toString());
  }, [isForceCache]);

  // Read initial state from URL
  useEffect(() => {
    const url = new URL(window.location.href);
    const cacheParam = url.searchParams.get("cache");
    setIsForceCache(cacheParam === "force-cache");
  }, []);

  const handleDefaultCache = () => {
    setIsForceCache(false);
    const url = new URL(window.location.href);
    url.searchParams.delete("cache");
    window.location.href = url.toString();
  };

  const handleForceCache = () => {
    setIsForceCache(true);
    const url = new URL(window.location.href);
    url.searchParams.set("cache", "force-cache");
    window.location.href = url.toString();
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl p-6 mb-8 border border-blue-200">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
            🧪 Interactive Cache Demo
            <span
              className={`ml-3 px-3 py-1 rounded-full text-sm font-medium ${
                isForceCache
                  ? "bg-orange-100 text-orange-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {isForceCache ? "force-cache" : "no-store (default)"}
            </span>
          </h3>
          <p className="text-gray-700 text-sm mb-3">
            Click either button below to test different cache behaviors:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-medium">
                🟢 Default Mode:
              </span>
              <span className="text-gray-600">
                Fresh data every time → See skeletons → Different values
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-600 font-medium">
                🟠 Force Cache:
              </span>
              <span className="text-gray-600">
                Reuse cached data → No skeletons → Same values
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDefaultCache}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                !isForceCache
                  ? "bg-green-600 text-white shadow-lg border-2 border-green-700"
                  : "bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              🟢 Test Default (No Cache)
              {!isForceCache && <span className="ml-2 text-xs">(current)</span>}
            </button>
            <button
              onClick={handleForceCache}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                isForceCache
                  ? "bg-orange-600 text-white shadow-lg border-2 border-orange-700"
                  : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              🟠 Test Force Cache
              {isForceCache && <span className="ml-2 text-xs">(current)</span>}
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center max-w-xs">
            Each button will reload the page to demonstrate the caching behavior
          </p>
        </div>
      </div>

      <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-2">
          💡 What to observe:
        </h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-800 mb-1">Visual cues:</p>
            <ul className="space-y-1 text-xs">
              <li>• Skeleton loading animations</li>
              <li>• Data appearing progressively</li>
              <li>• Page load timing differences</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-800 mb-1">Console logs:</p>
            <ul className="space-y-1 text-xs">
              <li>• Data fetching messages</li>
              <li>• Timestamp differences</li>
              <li>• User/dashboard values changing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
