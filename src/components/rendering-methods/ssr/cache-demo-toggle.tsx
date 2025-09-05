"use client";

import { useState, useEffect } from "react";
import { Info, FlaskConical, Lightbulb } from "lucide-react";

export function CacheDemoToggle() {
  const [isForceCache, setIsForceCache] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    if (isLoading) return; // Prevent multiple clicks

    // Immediately set loading state to disable all buttons
    setIsLoading(true);

    // Use requestAnimationFrame to ensure DOM updates before changing URL
    requestAnimationFrame(() => {
      setIsForceCache(false);

      // Use another frame to ensure state is committed
      requestAnimationFrame(() => {
        const url = new URL(window.location.href);
        url.searchParams.delete("cache");
        window.location.href = url.toString();
      });
    });
  };

  const handleForceCache = () => {
    if (isLoading) return; // Prevent multiple clicks

    // Immediately set loading state to disable all buttons
    setIsLoading(true);

    // Use requestAnimationFrame to ensure DOM updates before changing URL
    requestAnimationFrame(() => {
      setIsForceCache(true);

      // Use another frame to ensure state is committed
      requestAnimationFrame(() => {
        const url = new URL(window.location.href);
        url.searchParams.set("cache", "force-cache");
        window.location.href = url.toString();
      });
    });
  };

  return (
    <div className="relative mb-6">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-blue-50/80 rounded-lg z-10 flex items-center justify-center">
          <div className="flex items-center gap-2 text-blue-700">
            <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Switching cache mode...</span>
          </div>
        </div>
      )}

      {/* Compact Cache Demo Bar */}
      <div
        className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${
          isLoading ? "pointer-events-none" : ""
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left side - Title and Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Cache Demo
              </span>
              <div className="relative">
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={() => setShowTooltip(!showTooltip)}
                  className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                  aria-label="Show cache demo information"
                >
                  <Info size={16} />
                </button>

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute left-0 top-8 z-50 w-80 max-w-[90vw] bg-white rounded-lg shadow-xl border border-gray-200 p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          How to use:
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Click either button to test different cache behaviors
                          and reload the page
                        </p>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-blue-800 text-sm font-medium flex items-center">
                          <Lightbulb className="w-4 h-4 mr-1" />
                          <strong>Tip:</strong> Open DevTools Console to see
                          logs!
                        </p>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <span className="text-green-600 font-medium">
                            🟢 Default:
                          </span>
                          <span className="text-gray-600 flex-1">
                            Always fetches fresh data → Values change on reload
                          </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-orange-600 font-medium">
                            🟠 Force Cache:
                          </span>
                          <span className="text-gray-600 flex-1">
                            Uses cached data → Values stay the same
                          </span>
                        </div>
                      </div>

                      <div className="border-t pt-3">
                        <h5 className="font-medium text-gray-800 mb-2">
                          Look for:
                        </h5>
                        <p className="text-xs text-gray-600">
                          Console messages and different data on each reload
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                isForceCache
                  ? "bg-orange-100 text-orange-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {isForceCache ? "force-cache" : "no-store"}
            </span>
          </div>

          {/* Right side - Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleDefaultCache}
              disabled={isLoading} // Only disable during loading, always allow clicking default
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : !isForceCache
                  ? "bg-green-600 text-white shadow-md hover:bg-green-700" // Active state - still clickable
                  : "bg-green-100 text-green-700 hover:bg-green-200"
              }`}
            >
              {isLoading && !isForceCache && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Default
              {!isForceCache && !isLoading && (
                <span className="ml-1 text-xs">(current)</span>
              )}
            </button>
            <button
              onClick={handleForceCache}
              disabled={isLoading || isForceCache} // Disable when already in force cache mode or loading
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : isForceCache
                  ? "bg-orange-600 text-white shadow-md cursor-not-allowed opacity-75" // Active state - disabled
                  : "bg-orange-100 text-orange-700 hover:bg-orange-200"
              }`}
            >
              {isLoading && isForceCache && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              Force Cache
              {isForceCache && !isLoading && (
                <span className="ml-1 text-xs">(current)</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay to close tooltip on mobile */}
      {showTooltip && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setShowTooltip(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
