import React from 'react';
import { ModelOption } from '../types';
import { Cpu, Zap, Brain, MessageSquare } from 'lucide-react';

interface ModelsPageProps {
  onSelectModel: (model: ModelOption) => void;
}

export const ModelsPage: React.FC<ModelsPageProps> = ({ onSelectModel }) => {
  const models = [
    {
      id: ModelOption.GEMINI_3,
      name: 'Gemini 3.0 Pro',
      provider: 'Google',
      desc: 'The next evolution in multimodal reasoning. Superior at complex instruction following.',
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      color: 'border-blue-500/30 hover:border-blue-500/60'
    },
    {
      id: ModelOption.GEMINI_2_FLASH,
      name: 'Gemini 2.5 Flash',
      provider: 'Google',
      desc: 'Extremely fast and cost-effective. Best for high-volume tasks and quick iterations.',
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      color: 'border-yellow-500/30 hover:border-yellow-500/60'
    },
    {
      id: ModelOption.CHATGPT_5,
      name: 'GPT-5 (Hypothetical)',
      provider: 'OpenAI',
      desc: 'Next-gen reasoning engine with enhanced creativity and nuance.',
      icon: <Brain className="w-6 h-6 text-green-400" />,
      color: 'border-green-500/30 hover:border-green-500/60'
    },
    {
      id: ModelOption.CLAUDE_OPUS,
      name: 'Claude 3.5 Opus',
      provider: 'Anthropic',
      desc: 'Unmatched nuance and writing quality. Perfect for long-form content.',
      icon: <MessageSquare className="w-6 h-6 text-orange-400" />,
      color: 'border-orange-500/30 hover:border-orange-500/60'
    },
    {
      id: ModelOption.CLAUDE_HAIKU,
      name: 'Claude 3 Haiku',
      provider: 'Anthropic',
      desc: 'Lightweight and fast. Ideal for simple tasks and quick chats.',
      icon: <MessageSquare className="w-6 h-6 text-pink-400" />,
      color: 'border-pink-500/30 hover:border-pink-500/60'
    },
    {
      id: ModelOption.LLAMA_4,
      name: 'Llama 4',
      provider: 'Meta',
      desc: 'Open-weight state of the art model. Great for local-style reasoning simulation.',
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      color: 'border-cyan-500/30 hover:border-cyan-500/60'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Supported Models</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          KPrompter generates optimized syntax for the industry's leading AI models. Select a model to start engineering your prompt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model) => (
          <div 
            key={model.id}
            onClick={() => onSelectModel(model.id)}
            className={`
              cursor-pointer bg-white/5 border rounded-2xl p-6 transition-all duration-300
              hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1 group
              ${model.color}
            `}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                {model.icon}
              </div>
              <span className="text-xs font-mono text-gray-500">{model.provider}</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">{model.name}</h3>
            <p className="text-sm text-gray-400 mb-6 min-h-[40px]">{model.desc}</p>
            
            <div className="flex items-center text-orange-400 text-sm font-medium">
              Select Model <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};