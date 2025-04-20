"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Fuse from "fuse.js";
import Link from "next/link";
import brandedMedicinesData from "../data/branded_medicines.json";
import genericData from "../data/generic_medicines.json";

interface BrandedMedicine {
  name: string;
  manufacturer_name: string;
  price_a: string;
  pack_size_label?: string;
  short_composition1?: string;
  short_composition2?: string;
}

interface GenericMedicine {
  "Sr No": number;
  "Drug Code": number;
  "Generic Name": string;
  "Unit Size": string;
  "MRP": number;
  "Group Name": string;
  score?: number;
}

const brandedData = brandedMedicinesData as BrandedMedicine[];

const MedicineSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<BrandedMedicine[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<BrandedMedicine | null>(null);
  const [alternatives, setAlternatives] = useState<GenericMedicine[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const filtered = brandedData.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  };

  const handleSelect = (medicine: BrandedMedicine) => {
    setSelectedMedicine(medicine);
    setQuery(medicine.name);
    setSuggestions([]);
  
    const brandedPrice = parseFloat(medicine.price_a) || 0;
  
    const compositions = [medicine.short_composition1, medicine.short_composition2]
      .filter(Boolean)
      .map(c => c!.toLowerCase().trim());
  
    const isValidMRP = (price: any) =>
      typeof price === "number" && price > 0 && !isNaN(price);
  
    let matches = genericData.filter(item => {
      const gen = item["Generic Name"].toLowerCase();
      return (
        isValidMRP(item.MRP) &&
        item.MRP < brandedPrice &&
        compositions.every(comp => gen.includes(comp))
      );
    });
  
    if (matches.length === 0 && compositions.length > 0) {
      const fuse = new Fuse(genericData, {
        keys: ["Generic Name"],
        threshold: 0.4,
      });
  
      let fuseResults = fuse.search(compositions.join(" "));
      matches = fuseResults
        .map(res => res.item)
        .filter(item => isValidMRP(item.MRP) && item.MRP < brandedPrice)
        .slice(0, 5);
    }
  
    setAlternatives(matches);
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-50 to-white px-6 py-10 flex flex-col items-center">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-3xl text-center"
      >
        <h1 className="text-4xl font-bold text-pink-600 mb-2">Swasthya Darpan</h1>
        <p className="text-gray-600 mb-8 text-md">
          Search for branded medicines and find affordable generic alternatives instantly. Save on healthcare costs with smarter choices.
        </p>

        <input
          type="text"
          placeholder="Search for a branded medicine..."
          value={query}
          onChange={handleInputChange}
          className="w-full p-4 rounded-2xl border border-gray-300 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        {suggestions.length > 0 && (
          <div className="bg-white border mt-2 rounded-xl shadow max-h-60 overflow-y-auto text-left">
            {suggestions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelect(item)}
                className="p-3 hover:bg-pink-100 cursor-pointer transition-colors"
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {selectedMedicine && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white w-full max-w-2xl mt-10 p-6 rounded-2xl shadow-lg border border-pink-100"
        >
          <h2 className="text-2xl font-bold text-pink-600">{selectedMedicine.name}</h2>
          <div className="text-gray-700 mt-2 space-y-1 text-md">
            <p>
              <strong>Manufacturer:</strong> {selectedMedicine.manufacturer_name}
            </p>
            <p>
              <strong>Price:</strong> ₹{selectedMedicine.price_a}
            </p>
            <p>
              <strong>Pack Size:</strong> {selectedMedicine.pack_size_label || "N/A"}
            </p>
            <p>
              <strong>Composition:</strong> {selectedMedicine.short_composition1}
              {selectedMedicine.short_composition2 && ` + ${selectedMedicine.short_composition2}`}
            </p>
          </div>
        </motion.div>
      )}

      {selectedMedicine && alternatives.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl mt-10"
        >
          <h3 className="text-xl text-pink-700 font-bold mb-4 text-center">
            Cheaper Generic Alternatives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            {alternatives.map((alt, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-200 p-4 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-pink-600">
                  {alt["Generic Name"]}
                </h3>
                <p className="text-sm text-gray-700">Group: {alt["Group Name"] || "N/A"}</p>
                <p className="text-sm text-gray-700">Unit Size: {alt["Unit Size"] || "N/A"}</p>
                <p className="text-sm text-pink-700 font-semibold">MRP: ₹{alt.MRP}</p>
                <Link
                  href="/nearbycenters"
                  className="mt-3 inline-block px-4 py-2 text-sm font-medium text-white bg-pink-500 rounded-lg hover:bg-green-600 transition"
                >
                  Buy Now
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {selectedMedicine && alternatives.length === 0 && (
        <p className="text-gray-600 text-md mt-10">
          Sorry, no cheaper generic alternatives found.
        </p>
      )}
    </div>
  );
};

export default MedicineSearch;
