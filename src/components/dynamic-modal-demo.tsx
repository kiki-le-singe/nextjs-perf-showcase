"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamic modal - loaded only when opened
const Modal = dynamic(() => import("./modal-component"));

export default function DynamicModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Simple Modal Example
          </h2>
          <p className="text-gray-600 mb-8">
            Click the button below to dynamically load and open a modal. 
            The modal component is not included in the initial page bundle.
          </p>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Open Modal
          </button>

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">How It Works</h3>
            <ul className="text-gray-600 text-sm text-left space-y-2">
              <li>• Modal component is dynamically imported with <code className="bg-gray-200 px-1 rounded">dynamic()</code></li>
              <li>• Code is downloaded only when button is clicked</li>
              <li>• Subsequent opens are instant (code is cached)</li>
              <li>• Initial bundle stays lightweight</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Render Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}