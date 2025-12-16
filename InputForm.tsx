import React from 'react';
import { ModelOption, OutputType, PromptRequest, SkillLevel } from '../types';
import { Sparkles, Loader2 } from 'lucide-react';

interface InputFormProps {
  request: PromptRequest;
  setRequest: React.Dispatch<React.SetStateAction<PromptRequest>>;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ request, setRequest, onSubmit, isLoading }) => {
  const handleChange = (field: keyof PromptRequest, value: any) => {
    setRequest(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div id="input-form" className="w-full max-w-3xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
      {/* Decorative border gradient */}
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-b from-orange-500/20 to-transparent pointer-events-none"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Model Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Target Model</label>
          <select 
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none cursor-pointer hover:border-orange-500/30"
            value={request.model}
            onChange={(e) => handleChange('model', e.target.value)}
          >
            {Object.values(ModelOption).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Output Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 ml-1">Output Format</label>
          <select 
            className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all appearance-none cursor-pointer hover:border-orange-500/30"
            value={request.outputType}
            onChange={(e) => handleChange('outputType', e.target.value)}
          >
            {Object.values(OutputType).map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Task Description */}
      <div className="space-y-2 mb-6">
        <label className="text-sm font-medium text-gray-300 ml-1">What do you want to achieve?</label>
        <textarea 
          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all min-h-[120px] resize-none placeholder-gray-600 hover:border-orange-500/30"
          placeholder="e.g., I need a Python script to scrape stock prices and visualize them using Matplotlib..."
          value={request.task}
          onChange={(e) => handleChange('task', e.target.value)}
        />
      </div>

      {/* Constraints */}
      <div className="space-y-2 mb-8">
        <label className="text-sm font-medium text-gray-300 ml-1">Constraints (Optional)</label>
        <input 
          type="text"
          className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder-gray-600 hover:border-orange-500/30"
          placeholder="e.g., No external APIs, must use Pandas, max 50 lines..."
          value={request.constraints || ''}
          onChange={(e) => handleChange('constraints', e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Skill Level Toggle */}
        <div className="flex items-center gap-3 bg-black/40 p-1.5 rounded-lg border border-white/5">
          {Object.values(SkillLevel).map((level) => (
            <button
              key={level}
              onClick={() => handleChange('skillLevel', level)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                request.skillLevel === level 
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/50' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button 
          onClick={onSubmit}
          disabled={isLoading || !request.task.trim()}
          className={`
            relative overflow-hidden group px-8 py-3 rounded-xl font-bold text-white transition-all
            ${!request.task.trim() ? 'bg-gray-800 cursor-not-allowed opacity-50' : 'bg-white text-black hover:scale-105 hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]'}
          `}
        >
          <div className="flex items-center gap-2 relative z-10">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-orange-600" />
                <span>Generate Prompt</span>
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};