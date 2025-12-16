import React from 'react';
import { Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden">
      {/* AI Video Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        {/* Gradient overlay to blend with the rest of the page */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/80 z-10"></div>
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          {/* Abstract Orange Network/Data Flow Video */}
          <source src="https://cdn.pixabay.com/video/2020/06/17/42220-431835338_large.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-orange-500/30 text-xs font-medium text-orange-300 mb-8 animate-[fadeIn_1s_ease-out]">
          <Cpu className="w-3 h-3" />
          Supports Gemini 3, GPT-5 & Claude Haiku
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6 text-white drop-shadow-2xl">
          Architect Intelligence. <br />
          <span className="gradient-text">Engineer the Perfect Prompt.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          The ultimate meta-prompting engine. Generate highly optimized, model-specific instructions for the next generation of LLMs including Gemini 3 and ChatGPT 5.
        </p>
      </div>
    </div>
  );
};