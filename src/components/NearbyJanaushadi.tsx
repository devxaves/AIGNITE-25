"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const NearbyJanaushadhi: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [locationFound, setLocationFound] = useState<boolean>(false);

  const findNearbyJanaushadhi = (): void => {
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const query = "Janaushadhi centres near me";
          const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
            query
          )}/@${lat},${lng},15z`;

          setIsLoading(false);
          setLocationFound(true);
          window.open(mapsUrl, "_blank");
        },
        function (error) {
          setIsLoading(false);
          setError("Location access denied or unavailable. Please enable location services.");
        }
      );
    } else {
      setIsLoading(false);
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink-50 p-6 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Find Nearby Jan Aushadhi Kendras</h1>
        
        <p className="text-gray-700 mb-6">
          Jan Aushadhi Kendras provide quality generic medicines at affordable prices. 
          Use your current location to find the nearest centers.
        </p>
        
        <div className="flex justify-center">
          <button
            onClick={findNearbyJanaushadhi}
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition duration-200 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Finding...
              </>
            ) : (
              "Find Nearby Jan Aushadhi Kendras"
            )}
          </button>
        </div>
        
        {error && (
          <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {locationFound && !error && (
          <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg">
            Opening Google Maps with nearby Jan Aushadhi Kendras.
          </div>
        )}
        
        <div className="mt-8 text-sm text-gray-600">
          <p>Your location information is only used to search for nearby centers and is not stored.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default NearbyJanaushadhi;