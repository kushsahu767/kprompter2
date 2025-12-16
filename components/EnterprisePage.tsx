import React from 'react';
import { Shield, Zap, Users, Globe } from 'lucide-react';

export const EnterprisePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-[fadeIn_0.5s_ease-out]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 text-xs font-medium text-orange-300 mb-6">
            <Shield className="w-3 h-3" />
            Enterprise Grade Security
          </div>
          <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
            Scale your AI adoption with <span className="gradient-text">Confidence</span>.
          </h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            KPrompter Enterprise provides a unified prompt engineering platform for teams. 
            Standardize your AI interactions, manage prompt libraries, and ensure compliance across your organization.
          </p>

          <div className="space-y-4 mb-8">
            {[
              { icon: <Zap />, text: "SSO & Advanced Permission Management" },
              { icon: <Users />, text: "Shared Prompt Libraries & Versioning" },
              { icon: <Globe />, text: "Custom Model Fine-tuning Integration" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="p-2 bg-orange-500/10 rounded-full text-orange-500">
                  {React.cloneElement(item.icon as React.ReactElement<any>, { size: 20 })}
                </div>
                <span className="text-gray-200">{item.text}</span>
              </div>
            ))}
          </div>

          <button className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
            Contact Sales
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="relative glass-panel rounded-3xl p-8 border border-white/10">
             <div className="space-y-6">
               <div className="h-2 bg-white/10 rounded w-1/3"></div>
               <div className="h-8 bg-white/20 rounded w-2/3"></div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="h-24 bg-white/5 rounded-xl border border-white/5"></div>
                 <div className="h-24 bg-white/5 rounded-xl border border-white/5"></div>
               </div>
               <div className="h-40 bg-white/5 rounded-xl border border-white/5"></div>
             </div>
             
             <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-2xl border border-orange-500/30 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center font-bold">JD</div>
                  <div>
                    <div className="text-sm font-bold text-white">John Doe</div>
                    <div className="text-xs text-gray-400">CTO, TechCorp</div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-300 italic">"KPrompter saved us 20% on token costs."</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};