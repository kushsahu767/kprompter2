import React, { useState, useEffect } from 'react';
import { X, Key, AlertCircle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  setApiKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, apiKey, setApiKey }) => {
  const [inputVal, setInputVal] = useState(apiKey);

  useEffect(() => {
    setInputVal(apiKey);
  }, [apiKey]);

  const handleSave = () => {
    setApiKey(inputVal);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-2 text-white font-semibold">
            <Key className="w-4 h-4 text-orange-400" />
            <span>Gemini API Key</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="bg-orange-900/10 border border-orange-500/20 rounded-lg p-3 flex gap-3 items-start">
            <AlertCircle className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <p className="text-sm text-orange-200">
              Your API key is stored locally in your browser and used directly with Google AI Studio. We do not store it on any server.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-300">Enter Key</label>
            <input 
              type="password" 
              className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder-gray-600"
              placeholder="AIzaSy..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-xs text-orange-400 hover:underline">
              Get an API Key from Google AI Studio &rarr;
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex justify-end gap-3 bg-black/20">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-black hover:bg-gray-200 transition-colors">
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
};