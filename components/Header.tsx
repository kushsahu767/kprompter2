import React from 'react';
import { Flame, Key, Star, History } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  onOpenSettings: () => void;
  onOpenFavorites: () => void;
  onOpenHistory: () => void;
  currentView: View;
  onNavigate: (view: View) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onOpenSettings, 
  onOpenFavorites, 
  onOpenHistory,
  currentView, 
  onNavigate 
}) => {
  
  const navClass = (view: View) => `
    cursor-pointer transition-colors duration-200
    ${currentView === view ? 'text-orange-400 font-semibold' : 'text-gray-400 hover:text-orange-300'}
  `;

  return (
    <header className="fixed top-0 w-full z-50 glass-panel border-b border-orange-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onNavigate('home')}
        >
          <div className="bg-gradient-to-tr from-orange-600 to-yellow-500 p-2 rounded-lg shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/40 transition-shadow">
            <Flame className="text-black w-6 h-6 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-orange-100 transition-colors">KPrompter</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button onClick={() => onNavigate('models')} className={navClass('models')}>Models</button>
          <button onClick={() => onNavigate('templates')} className={navClass('templates')}>Templates</button>
          <button onClick={() => onNavigate('enterprise')} className={navClass('enterprise')}>Enterprise</button>
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenHistory}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/50 transition-all text-sm font-medium text-gray-300 hover:text-white"
            title="History"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">History</span>
          </button>

           <button 
            onClick={onOpenFavorites}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/50 transition-all text-sm font-medium text-gray-300 hover:text-white"
            title="Favorites"
          >
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="hidden sm:inline">Favorites</span>
          </button>
          
          <button 
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm font-medium text-gray-300"
            title="API Key Settings"
          >
            <Key className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => onNavigate('home')}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-lg shadow-orange-900/50"
          >
            Launch
          </button>
        </div>
      </div>
    </header>
  );
};