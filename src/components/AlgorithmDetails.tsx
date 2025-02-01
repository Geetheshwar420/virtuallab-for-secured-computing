import React from 'react';
import { Shield, Check, X } from 'lucide-react';

export function AlgorithmDetails({ algorithm }) {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-700 pb-4">
        <h1 className="text-2xl font-bold mb-2">{algorithm.name}</h1>
        <span className="inline-block bg-emerald-600 text-sm px-3 py-1 rounded-full">
          {algorithm.category}
        </span>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-gray-300">{algorithm.description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Applications</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-300">
          {algorithm.applications.map((app, index) => (
            <li key={index}>{app}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <Check className="w-5 h-5 mr-2 text-green-500" />
            Strengths
          </h2>
          <ul className="space-y-2">
            {algorithm.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 mt-2 mr-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-300">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 flex items-center">
            <X className="w-5 h-5 mr-2 text-red-500" />
            Weaknesses
          </h2>
          <ul className="space-y-2">
            {algorithm.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-2 h-2 mt-2 mr-2 bg-red-500 rounded-full"></span>
                <span className="text-gray-300">{weakness}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Time Complexity</h2>
        <p className="text-gray-300">
          <code className="bg-gray-800 px-2 py-1 rounded">{algorithm.complexity}</code>
        </p>
      </div>
    </div>
  );
}