import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';

const CaesarAnimation = ({ input, shift }) => {
  const [currentChar, setCurrentChar] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (!input) return;
    const timer = setInterval(() => {
      setCurrentChar(prev => (prev + 1) % (input.length + 1));
    }, 800);
    return () => clearInterval(timer);
  }, [input]);

  if (!input || !showAnimation) return null;

  return (
    <div className="bg-gray-900 p-4 rounded-lg mb-4 overflow-hidden">
      <div className="flex items-center justify-center space-x-4 font-mono text-lg">
        <div className="relative min-w-[200px] text-center">
          {input.split('').map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-all duration-300 ${
                i === currentChar ? 'text-emerald-400 scale-125' : 'text-gray-400'
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="text-emerald-500">→</div>
        <div className="relative min-w-[200px] text-center">
          {input.split('').map((char, i) => {
            const shifted = char.match(/[a-z]/i)
              ? String.fromCharCode(
                  ((char.charCodeAt(0) - (char.toLowerCase() === char ? 97 : 65) + parseInt(shift)) % 26) +
                    (char.toLowerCase() === char ? 97 : 65)
                )
              : char;
            return (
              <span
                key={i}
                className={`inline-block transition-all duration-300 ${
                  i === currentChar ? 'text-emerald-400 scale-125' : 'text-gray-400'
                }`}
              >
                {shifted}
              </span>
            );
          })}
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-400">
        Shifting each character by {shift} positions
      </div>
    </div>
  );
};

const VigenereAnimation = ({ input, key }) => {
  const [currentChar, setCurrentChar] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (!input || !key) return;
    const timer = setInterval(() => {
      setCurrentChar(prev => (prev + 1) % (input.length + 1));
    }, 800);
    return () => clearInterval(timer);
  }, [input, key]);

  if (!input || !key || !showAnimation) return null;

  const keyRepeated = key.toUpperCase().repeat(Math.ceil(input.length / key.length));

  return (
    <div className="bg-gray-900 p-4 rounded-lg mb-4 overflow-hidden">
      <div className="flex flex-col items-center space-y-2 font-mono text-lg">
        <div className="relative min-w-[200px] text-center">
          {input.split('').map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-all duration-300 ${
                i === currentChar ? 'text-emerald-400 scale-125' : 'text-gray-400'
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="relative min-w-[200px] text-center text-blue-400">
          {keyRepeated.split('').map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-all duration-300 ${
                i === currentChar ? 'text-emerald-400 scale-125' : ''
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        <div className="text-emerald-500">↓</div>
        <div className="relative min-w-[200px] text-center">
          {input.split('').map((char, i) => {
            if (!char.match(/[a-z]/i)) return char;
            const isUpperCase = char === char.toUpperCase();
            const inputChar = char.toUpperCase();
            const keyChar = keyRepeated[i];
            const shift = keyChar.charCodeAt(0) - 65;
            const newCharCode = ((inputChar.charCodeAt(0) - 65 + shift) % 26) + 65;
            const newChar = String.fromCharCode(newCharCode);
            return (
              <span
                key={i}
                className={`inline-block transition-all duration-300 ${
                  i === currentChar ? 'text-emerald-400 scale-125' : 'text-gray-400'
                }`}
              >
                {isUpperCase ? newChar : newChar.toLowerCase()}
              </span>
            );
          })}
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-400">
        Each character is shifted based on the corresponding key letter
      </div>
    </div>
  );
};

const HashAnimation = ({ input }) => {
  const [blocks, setBlocks] = useState([]);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    if (!input) return;
    // Split input into blocks of 8 characters
    const newBlocks = input.match(/.{1,8}/g) || [];
    setBlocks(newBlocks);
  }, [input]);

  if (!input || !showAnimation) return null;

  return (
    <div className="bg-gray-900 p-4 rounded-lg mb-4">
      <div className="flex flex-wrap justify-center gap-4">
        {blocks.map((block, i) => (
          <div
            key={i}
            className="bg-gray-800 p-3 rounded border border-gray-700 transform transition-all duration-300 hover:scale-105"
          >
            <div className="text-xs text-gray-400 mb-1">Block {i + 1}</div>
            <div className="font-mono text-emerald-400">{block.padEnd(8, ' ')}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center">
        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-emerald-500 border-r-[20px] border-r-transparent"></div>
      </div>
      <div className="mt-6 bg-gray-800 p-4 rounded text-center">
        <div className="text-xs text-gray-400 mb-1">Fixed-Length Hash Output</div>
        <div className="font-mono text-emerald-400 break-all">
          {Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}
        </div>
      </div>
      <div className="mt-4 text-center text-sm text-gray-400">
        Input is processed in blocks to produce a fixed-length hash value
      </div>
    </div>
  );
};

export function CipherDemo({ algorithm }) {
  const [input, setInput] = useState('');
  const [key, setKey] = useState('');
  const [output, setOutput] = useState('');

  const handleEncrypt = () => {
    let result = '';
    
    switch(algorithm.name) {
      case 'Caesar Cipher':
        const shift = parseInt(key) || 3;
        result = input.split('').map(char => {
          if (char.match(/[a-z]/i)) {
            const code = char.charCodeAt(0);
            const isUpperCase = code >= 65 && code <= 90;
            const base = isUpperCase ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
          }
          return char;
        }).join('');
        break;
        
      case 'Vigenère Cipher':
        if (!key) return;
        const keyRepeated = key.toUpperCase().replace(/[^A-Z]/g, '');
        if (!keyRepeated) return;
        
        result = input.split('').map((char, i) => {
          if (char.match(/[a-z]/i)) {
            const isUpperCase = char === char.toUpperCase();
            const inputChar = char.toUpperCase();
            const keyChar = keyRepeated[i % keyRepeated.length];
            const shift = keyChar.charCodeAt(0) - 65;
            const newCharCode = ((inputChar.charCodeAt(0) - 65 + shift) % 26) + 65;
            const newChar = String.fromCharCode(newCharCode);
            return isUpperCase ? newChar : newChar.toLowerCase();
          }
          return char;
        }).join('');
        break;

      case 'MD5':
      case 'SHA-256':
        result = `[${algorithm.name} hash would be generated here]
For security reasons, use established cryptographic libraries in production.`;
        break;
        
      default:
        result = `Demo not implemented for ${algorithm.name}. 
For security reasons, use established cryptographic libraries in production.`;
    }
    
    setOutput(result);
  };

  const isHashFunction = algorithm.category === 'Hash Functions';

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-700 pb-4">
        <h2 className="text-2xl font-bold mb-2">Interactive Demo</h2>
        <p className="text-gray-300">Try out the {algorithm.name} algorithm with your own input.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Input Text</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            rows={4}
            placeholder="Enter your text here..."
          />
        </div>

        {!isHashFunction && (
          <div>
            <label className="block text-sm font-medium mb-2">
              {algorithm.name === 'Caesar Cipher' ? 'Shift Value' : 'Key'}
            </label>
            <input
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full bg-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder={algorithm.name === 'Caesar Cipher' ? 'Enter shift value (e.g., 3)' : 'Enter key'}
            />
          </div>
        )}

        {/* Animation Components */}
        {input && (
          <div className="mt-6">
            {algorithm.name === 'Caesar Cipher' && (
              <CaesarAnimation input={input} shift={parseInt(key) || 3} />
            )}
            {algorithm.name === 'Vigenère Cipher' && key && (
              <VigenereAnimation input={input} key={key} />
            )}
            {isHashFunction && <HashAnimation input={input} />}
          </div>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleEncrypt}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <span>{isHashFunction ? 'Generate Hash' : 'Encrypt'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Output</label>
          <textarea
            value={output}
            readOnly
            className="w-full bg-gray-700 rounded-lg p-3 text-white"
            rows={4}
          />
        </div>
      </div>

      <div className="bg-gray-700 rounded-lg p-4 mt-6">
        <h3 className="text-lg font-semibold mb-2">How it works</h3>
        <p className="text-gray-300">
          {algorithm.name === 'Caesar Cipher'
            ? 'The Caesar cipher shifts each letter in the plaintext by a fixed number of positions in the alphabet. For example, with a shift of 3, "A" becomes "D", "B" becomes "E", and so on.'
            : algorithm.name === 'Vigenère Cipher'
            ? 'The Vigenère cipher uses a keyword to determine the shift value for each letter in the plaintext. Each letter in the keyword corresponds to a different shift value based on its position in the alphabet.'
            : algorithm.category === 'Hash Functions'
            ? `${algorithm.name} is a one-way hash function that generates a fixed-size output regardless of input size. The same input will always produce the same hash, but the process cannot be reversed.`
            : `${algorithm.name} is a complex encryption algorithm that operates on fixed-size blocks of data. For security reasons, please use established cryptographic libraries for actual implementation.`}
        </p>
      </div>
    </div>
  );
}