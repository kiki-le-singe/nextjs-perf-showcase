// src/components/AudioPlayer.js
"use client";

import { useState, useRef, useEffect } from "react";
import type WaveSurfer from "wavesurfer.js";

type AudioPlayerProps = {
  audioUrl: string;
};

type WaveSurferModule = typeof import("wavesurfer.js");

export default function AudioPlayer({ audioUrl }: AudioPlayerProps) {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const wavesurferLibRef = useRef<WaveSurferModule | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Preload WaveSurfer on hover
  async function preloadWaveSurfer() {
    if (!wavesurferLibRef.current) {
      wavesurferLibRef.current = await import("wavesurfer.js");
    }
  }

  async function handlePlayPause() {
    // If already loaded, just toggle play/pause
    if (wavesurferRef.current) {
      wavesurferRef.current.playPause();
      return;
    }

    // First time: load and play
    setIsLoading(true);
    setError(null);

    try {
      // Load library if not preloaded
      await preloadWaveSurfer();

      const WaveSurfer = wavesurferLibRef.current!.default;

      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current!,
        waveColor: "#4F4A85",
        progressColor: "#383351",
        url: audioUrl,
        height: 80,
        barWidth: 2,
        barRadius: 3,
      });

      wavesurferRef.current.on("ready", () => {
        setIsLoading(false);
        // Auto-play after loading
        wavesurferRef.current!.play();
      });

      wavesurferRef.current.on("play", () => setIsPlaying(true));
      wavesurferRef.current.on("pause", () => setIsPlaying(false));
      wavesurferRef.current.on("finish", () => setIsPlaying(false));

      wavesurferRef.current.on("error", (err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
    } catch {
      setError("Failed to load audio player");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <div
        ref={waveformRef}
        style={{
          height: "80px",
          borderRadius: "4px",
          marginBottom: "10px",
        }}
      />

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <button
        onClick={handlePlayPause}
        onMouseEnter={preloadWaveSurfer}
        disabled={isLoading}
        className={`px-5 py-2.5 text-base rounded transition-all duration-150 text-black \
          ${
            isLoading
              ? "cursor-not-allowed opacity-60"
              : "cursor-pointer opacity-100"
          }`}
      >
        {isLoading ? "Loading..." : isPlaying ? "⏸️ Pause" : "▶️ Play"}
      </button>
    </div>
  );
}
