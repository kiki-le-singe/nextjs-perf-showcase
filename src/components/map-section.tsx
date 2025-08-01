// src/app/contact/page.js (Server Component)
// import MapSection from '@/components/MapSection';
// export default function ContactPage() {
//   return (
//     <div>
//       <h1>Contact Us</h1>
//       <p>Email: foo@bar.com</p>
//       <p>Phone: 0123456789</p>

//       {/* Client Component for interactive part */}
//       <MapSection />
//     </div>
//   );
// }
// src/components/MapSection.js

"use client";
import { useState, useRef, useEffect } from "react";

export default function MapSection() {
  const [showMap, setShowMap] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const leafletRef = useRef(null);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Preload Leaflet on hover
  async function preloadLeaflet() {
    if (!leafletRef.current) {
      leafletRef.current = await import("leaflet");
      await import("leaflet/dist/leaflet.css");
    }
  }

  async function loadMap() {
    setShowMap(true);
    setIsLoading(true);

    try {
      await preloadLeaflet();

      // Create map
      if (mapContainerRef.current && !mapInstanceRef.current) {
        const L = leafletRef.current;

        // Fix Leaflet default icon issue in Next.js
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        // Initialize map
        const map = L.map(mapContainerRef.current).setView([48.86, 2.35], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);
        L.marker([48.86, 2.35]).addTo(map).bindPopup("Our office");

        mapInstanceRef.current = map;
      }
    } catch (error) {
      console.error("Error loading map:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <button
        onMouseEnter={preloadLeaflet}
        onClick={loadMap}
        className="px-5 py-2.5 text-base rounded transition-all duration-150 cursor-pointer text-black"
      >
        Show map
      </button>

      {showMap && (
        <div
          ref={mapContainerRef}
          style={{
            height: 400,
            marginTop: 20,
            position: "relative",
            backgroundColor: isLoading ? "#f0f0f0" : "transparent",
          }}
        >
          {isLoading && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
              }}
            >
              <p>Loading map...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
