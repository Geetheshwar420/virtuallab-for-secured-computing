import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { CipherDemo } from './components/CipherDemo';
import { AlgorithmDetails } from './components/AlgorithmDetails';
import { Navigation } from './components/Navigation';

const algorithms = {
  caesar: {
    name: 'Caesar Cipher',
    category: 'Classical',
    description: 'A substitution cipher that shifts letters by a fixed number of positions.',
    applications: [
      'Educational purposes',
      'Basic text encryption',
      'Historical significance'
    ],
    complexity: 'O(n)',
    strengths: [
      'Simple to implement',
      'Fast execution',
      'Good for learning basics'
    ],
    weaknesses: [
      'Very easy to break',
      'Limited key space',
      'No diffusion'
    ]
  },
  vigenere: {
    name: 'Vigenère Cipher',
    category: 'Classical',
    description: 'A polyalphabetic substitution cipher using a keyword to determine shift values.',
    applications: [
      'Historical encryption',
      'Educational purposes',
      'Simple message hiding'
    ],
    complexity: 'O(n)',
    strengths: [
      'More secure than Caesar cipher',
      'Multiple shift values',
      'Keyword-based encryption'
    ],
    weaknesses: [
      'Vulnerable to frequency analysis',
      'Repeating key pattern',
      'No modern practical use'
    ]
  },
  des: {
    name: 'DES (Data Encryption Standard)',
    category: 'Modern',
    description: 'A symmetric-key block cipher that operates on 64-bit blocks using a 56-bit key.',
    applications: [
      'Legacy banking systems',
      'Historical secure communications',
      'Electronic financial transactions'
    ],
    complexity: 'O(n)',
    strengths: [
      'Well-studied and analyzed',
      'Fast hardware implementation',
      'Good avalanche effect'
    ],
    weaknesses: [
      'Short key length (56 bits)',
      'Vulnerable to brute force attacks',
      'Considered obsolete for modern use'
    ]
  },
  aes: {
    name: 'AES (Advanced Encryption Standard)',
    category: 'Modern',
    description: 'A symmetric block cipher standard used worldwide for secure data encryption.',
    applications: [
      'Secure communications',
      'File encryption',
      'Banking systems',
      'Government communications'
    ],
    complexity: 'O(n)',
    strengths: [
      'Very secure when properly implemented',
      'Fast in both software and hardware',
      'Widely tested and analyzed'
    ],
    weaknesses: [
      'Key management complexity',
      'Requires secure key exchange',
      'Implementation vulnerabilities possible'
    ]
  },
  md5: {
    name: 'MD5 (Message Digest 5)',
    category: 'Hash Functions',
    description: 'A widely used hash function producing a 128-bit hash value.',
    applications: [
      'Legacy systems',
      'File integrity checking',
      'Password hashing (historically)'
    ],
    complexity: 'O(n)',
    strengths: [
      'Fast computation',
      'Fixed output size',
      'Deterministic output'
    ],
    weaknesses: [
      'Cryptographically broken',
      'Collision vulnerabilities',
      'Not suitable for security applications'
    ]
  },
  sha256: {
    name: 'SHA-256',
    category: 'Hash Functions',
    description: 'A cryptographic hash function that generates a 256-bit (32-byte) hash value.',
    applications: [
      'Digital signatures',
      'Blockchain technology',
      'Secure password hashing',
      'Data integrity verification'
    ],
    complexity: 'O(n)',
    strengths: [
      'Strong collision resistance',
      'Wide output range (256 bits)',
      'No known practical attacks',
      'Industry standard'
    ],
    weaknesses: [
      'Slower than MD5',
      'Fixed output size may be too large for some applications',
      'Quantum computer vulnerable (theoretical)'
    ]
  }
};

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('caesar');
  const [activeTab, setActiveTab] = useState('details');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <nav className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex items-center">
          <div className="flex items-center space-x-2">
            <Shield className="w-8 h-8 text-emerald-500" />
            <span className="text-xl font-bold">CryptoLab Virtual</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          <Navigation 
            algorithms={algorithms}
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
          />

          <main className="col-span-12 lg:col-span-9">
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'details'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Algorithm Details
                </button>
                <button
                  onClick={() => setActiveTab('demo')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'demo'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  Interactive Demo
                </button>
              </div>

              {activeTab === 'details' ? (
                <AlgorithmDetails algorithm={algorithms[selectedAlgorithm]} />
              ) : (
                <CipherDemo algorithm={algorithms[selectedAlgorithm]} />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;