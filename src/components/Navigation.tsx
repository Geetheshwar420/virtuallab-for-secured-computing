import React from 'react';
import { Lock, KeyRound } from 'lucide-react';

export function Navigation({ algorithms, selectedAlgorithm, setSelectedAlgorithm }) {
  return (
    <aside className="col-span-12 lg:col-span-3 space-y-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-4">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-emerald-500" />
          Algorithms
        </h2>
        <div className="space-y-2">
          {Object.entries(algorithms).map(([key, algo]) => (
            <button
              key={key}
              onClick={() => setSelectedAlgorithm(key)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedAlgorithm === key
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center">
                <KeyRound className="w-4 h-4 mr-2" />
                <span>{algo.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}