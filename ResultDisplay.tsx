import React, { useState, useEffect } from 'react';
import { GeneratedPromptData } from '../types';
import { Copy, Check, Terminal, FileJson, MessageSquare, Info, Heart } from 'lucide-react';

interface ResultDisplayProps {
  data: GeneratedPromptData;
  onToggleFavorite: (data: GeneratedPromptData) => void;
  isFavorite: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ data, onToggleFavorite, isFavorite }) => {
  return (
    <div className="w-full max-w-5xl mx-auto mt-16 space-y-8 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center mb-8 relative">
        <h2 className="text-3xl font-bold mb-2 text-white">Your Optimized Prompt</h2>
        <p className="text-gray-400">Ready to copy and paste directly into your model.</p>
        
        <div className="absolute top-0 right-0 md:right-10">
           <button 
             onClick={() => onToggleFavorite(data)}
             className={`p-3 rounded-full border transition-all duration-300 group ${
               isFavorite 
                ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-red-400 hover:border-red-400/50'
             }`}
             title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
           >
             <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Prompt Column */}
        <div className="lg:col-span-2 space-y-6">
          <ResultCard 
            title="System / Persona" 
            icon={<Terminal className="w-4 h-4 text-orange-400" />}
            content={data.systemPrompt} 
          />
          <ResultCard 
            title="User Prompt" 
            icon={<MessageSquare className="w-4 h-4 text-amber-400" />}
            content={data.userPrompt} 
            highlight
          />
           <ResultCard 
            title="Constraints Included" 
            icon={<Info className="w-4 h-4 text-blue-400" />}
            content={data.constraints.map(c => `• ${c}`).join('\n')} 
          />
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-black/20">
            <div className="flex items-center gap-2 mb-4">
              <FileJson className="w-4 h-4 text-yellow-400" />
              <h3 className="font-semibold text-gray-200">Examples Provided</h3>
            </div>
            <div className="bg-black/40 rounded-lg p-3 text-xs text-gray-400 font-mono overflow-auto max-h-40 border border-white/5">
              {data.examples}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/10 bg-gradient-to-br from-orange-900/10 to-transparent">
            <h3 className="font-semibold text-gray-200 mb-3">Pro Tips</h3>
            <ul className="space-y-2">
              {data.tips.map((tip, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-gray-300">
                  <span className="text-orange-500 mt-1">✓</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-white/10">
            <h3 className="font-semibold text-gray-200 mb-2">Why this works</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {data.explanation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultCard: React.FC<{ title: string; content: string; highlight?: boolean; icon?: React.ReactNode }> = ({ title, content, highlight, icon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`
      relative rounded-2xl overflow-hidden border transition-all duration-300 group
      ${highlight 
        ? 'glass-panel border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.15)]' 
        : 'bg-black/40 border-white/10'}
    `}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className={`font-semibold ${highlight ? 'text-white' : 'text-gray-300'}`}>{title}</h3>
        </div>
        <button 
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
      <div className="p-6 relative">
        <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300 leading-relaxed overflow-x-auto">
          {content}
        </pre>
        {highlight && (
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-amber-500/5 pointer-events-none" />
        )}
      </div>
    </div>
  );
};