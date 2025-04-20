"use client";

import Breadcrumb from "./Headerm";
import MoleculeStructure from "../molecule-bank/Model";
import React, { useState } from "react";
import { LoaderIcon } from "lucide-react";

const ModalLayout = () => {
  const [smiles, setSmiles] = useState("CCN(CC)C(=O)[C@@]1(C)Nc2c(ccc3ccccc23)C[C@H]1N(C)C");
  const [numMolecules, setNumMolecules] = useState("10");
  const [minSimilarity, setMinSimilarity] = useState("0.3");
  const [particles, setParticles] = useState("30");
  const [iterations, setIterations] = useState("10");
  const [molecules, setMolecules] = useState<{ structure: string; score: number }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      algorithm: "CMA-ES",
      num_molecules: parseInt(numMolecules),
      property_name: "QED",
      minimize: false,
      min_similarity: parseFloat(minSimilarity),
      particles: parseInt(particles),
      iterations: parseInt(iterations),
      smi: smiles,
    };

    try {
      const response = await fetch("/api/nvidia", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      const data = JSON.parse(responseText);
      const generatedMolecules = JSON.parse(data.molecules).map((mol: any) => ({
        structure: mol.sample,
        score: mol.score,
      }));

      setMolecules(generatedMolecules);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-10 w-full flex flex-col items-center">
      <Breadcrumb pageName="Generate Molecules" />
      <div className="w-full max-w-5xl bg-white dark:bg-[#1c1c1c] border border-gray-200 dark:border-gray-700 rounded-3xl shadow-xl p-10 transition-transform duration-300">
        <h2 className="text-2xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-6">
          SMILES to Molecule Generator
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                SMILES String
              </label>
              <textarea
                rows={3}
                value={smiles}
                onChange={(e) => setSmiles(e.target.value)}
                placeholder="Enter SMILES string"
                className="w-full p-4 text-md rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Molecules
              </label>
              <input
                type="number"
                value={numMolecules}
                onChange={(e) => setNumMolecules(e.target.value)}
                placeholder="e.g., 10"
                className="w-full p-4 text-md rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Minimum Similarity
              </label>
              <input
                type="text"
                value={minSimilarity}
                onChange={(e) => setMinSimilarity(e.target.value)}
                placeholder="0.3 - 1.0"
                className="w-full p-4 text-md rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Particles
              </label>
              <input
                type="text"
                value={particles}
                onChange={(e) => setParticles(e.target.value)}
                placeholder="e.g., 30"
                className="w-full p-4 text-md rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Iterations
              </label>
              <input
                type="text"
                value={iterations}
                onChange={(e) => setIterations(e.target.value)}
                placeholder="e.g., 10"
                className="w-full p-4 text-md rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#2a2a2a] text-black dark:text-white focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110 transition-transform duration-300 transform hover:scale-105 shadow-md"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <LoaderIcon className="w-5 h-5 animate-spin" /> Generating...
              </span>
            ) : (
              "Generate Molecules"
            )}
          </button>
        </form>

        <div className="mt-10">
          {molecules.length > 0 ? (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-indigo-700 dark:text-indigo-300">
                Generated Molecules
              </h3>
              {molecules.map((mol, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e1e1e] shadow-md"
                >
                  <p className="font-mono text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <strong>SMILES:</strong> {mol.structure}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <strong>Score:</strong> {mol.score.toFixed(4)}
                  </p>
                  <div className="mt-4">
                    <MoleculeStructure
                      id={`molecule-${index}`}
                      structure={mol.structure}
                      width={250}
                      height={200}
                      scores={mol.score}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              No molecules generated yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
