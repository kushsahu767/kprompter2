import React from 'react';
import { ModelOption, OutputType, SkillLevel } from '../types';
import { Code, PenTool, Layout, Database, Search } from 'lucide-react';

interface TemplatesPageProps {
  onSelectTemplate: (task: string, model: ModelOption) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onSelectTemplate }) => {
  const templates = [
    {
      title: 'Python Data Visualization',
      icon: <Code className="w-5 h-5" />,
      task: 'Create a Python script using Pandas and Plotly to load a CSV file, clean the data by handling missing values, and generate an interactive dashboard showing sales trends over time.',
      model: ModelOption.GEMINI_3,
      tags: ['Coding', 'Data']
    },
    {
      title: 'SEO Blog Post Generator',
      icon: <PenTool className="w-5 h-5" />,
      task: 'Write a comprehensive, SEO-optimized blog post about "The Future of AI in Healthcare". Include proper H2/H3 tags, meta description, and focus on keywords: Telemedicine, Diagnostics, and Patient Privacy.',
      model: ModelOption.CLAUDE_OPUS,
      tags: ['Writing', 'Marketing']
    },
    {
      title: 'React Landing Page Component',
      icon: <Layout className="w-5 h-5" />,
      task: 'Generate a responsive React functional component for a SaaS landing page hero section. Use Tailwind CSS for styling. Include a headline, subheadline, two CTA buttons, and a placeholder for a 3D illustration.',
      model: ModelOption.CHATGPT_5,
      tags: ['Web Dev', 'UI/UX']
    },
    {
      title: 'SQL Query Optimizer',
      icon: <Database className="w-5 h-5" />,
      task: 'Analyze the following SQL query for performance bottlenecks. Suggest appropriate indexes and rewrite the query to optimize execution time for a PostgreSQL database with 10 million rows.',
      model: ModelOption.GEMINI_2_FLASH,
      tags: ['Database', 'Backend']
    },
    {
      title: 'Research Paper Summarizer',
      icon: <Search className="w-5 h-5" />,
      task: 'Summarize the key findings, methodology, and limitations of a scientific paper. Extract the main arguments and present them in a bulleted list format suitable for a graduate student review.',
      model: ModelOption.CLAUDE_HAIKU,
      tags: ['Academic', 'Research']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 animate-[fadeIn_0.5s_ease-out]">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Prompt Templates</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Jumpstart your workflow with these battle-tested prompt starters.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {templates.map((template, idx) => (
          <div 
            key={idx}
            className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-orange-500/50 hover:bg-white/10 transition-all cursor-pointer overflow-hidden"
            onClick={() => onSelectTemplate(template.task, template.model)}
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              {template.icon}
            </div>
            
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                    {template.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{template.title}</h3>
                </div>
                
                <p className="text-sm text-gray-400 line-clamp-2 max-w-3xl">
                  {template.task}
                </p>

                <div className="flex gap-2 pt-2">
                  {template.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                  <span className="text-[10px] uppercase font-bold tracking-wider text-orange-500/80 bg-orange-900/20 border border-orange-500/20 px-2 py-1 rounded ml-2">
                    {template.model}
                  </span>
                </div>
              </div>

              <div className="hidden sm:flex items-center self-center">
                <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-full opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all">
                  Use Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};