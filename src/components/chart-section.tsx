// src/components/ChartSection.tsx
"use client";

import { useState, useRef, useEffect } from "react";

type ChartModule = typeof import("chart.js");
type ChartInstance = import("chart.js").Chart;

export default function ChartSection() {
  const [showChart, setShowChart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartInstance | null>(null);
  const chartLibRef = useRef<ChartModule | null>(null);

  // Create chart after canvas is rendered
  useEffect(() => {
    if (
      showChart &&
      chartRef.current &&
      !chartInstanceRef.current &&
      chartLibRef.current
    ) {
      createChart();
    }
  }, [showChart]);

  // Load Chart.js library
  async function loadChartLibrary() {
    if (chartLibRef.current) return chartLibRef.current;

    const chartModule = await import("chart.js");
    chartModule.Chart.register(...chartModule.registerables);
    chartLibRef.current = chartModule;
    return chartModule;
  }

  async function loadChart() {
    if (chartInstanceRef.current) return; // Already loaded

    setShowChart(true);
    setIsLoading(true);

    try {
      // ✨ Dynamic Import - The core technique
      await loadChartLibrary();

      // The actual chart creation will happen in the useEffect
      // after the canvas is rendered
    } catch (error) {
      console.error("Failed to load chart:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Create chart once canvas and library are ready
  function createChart() {
    if (!chartRef.current || !chartLibRef.current) return;

    try {
      // Create the chart
      chartInstanceRef.current = new chartLibRef.current.Chart(
        chartRef.current,
        {
          type: "bar",
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [
              {
                label: "Sales (€)",
                data: [1200, 1900, 800, 1500, 2200],
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: { beginAtZero: true },
            },
          },
        }
      );
    } catch (error) {
      console.error("Failed to create chart:", error);
    }
  }

  // Preload Chart.js on hover
  async function preloadChart() {
    try {
      await loadChartLibrary();
    } catch (error) {
      console.error("Failed to preload chart:", error);
    }
  }

  // Cleanup when component is destroyed
  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px" }}>
      <h2 className="text-black">Sales Dashboard</h2>

      <button
        onClick={loadChart}
        onMouseEnter={preloadChart}
        disabled={isLoading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: isLoading ? "not-allowed" : "pointer",
          opacity: isLoading ? 0.6 : 1,
        }}
      >
        {isLoading ? "Loading Chart..." : "📊 Load Chart"}
      </button>

      {showChart && (
        <div style={{ marginTop: "20px", height: "400px" }}>
          <canvas ref={chartRef} />
        </div>
      )}
    </div>
  );
}
