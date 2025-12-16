import React from 'react';
import { X, Trash2, ArrowUpRight, Terminal, Calendar } from 'lucide-react';
import { FavoriteItem } from '../types';

interface FavoritesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: FavoriteItem[];
  onRemove: (id: string) => void;
  onLoad: (item: FavoriteItem) => void;
}

export const FavoritesPanel: React.FC<FavoritesPanelProps> = ({ 
  isOpen, 
  onClose, 
  favorites, 
  onRemove, 
  onLoad 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]" 
        onClick={onClose}
      />

      {/* Slide-out Panel */}
      <div className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-orange-500/20 shadow-2xl flex flex-col animate-[slideInRight_0.3s_ease-out]">
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-yellow-500">★</span> Favorite Prompts
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {favorites.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <p>No favorites saved yet.</p>
              <p className="text-sm mt-2">Generate a prompt and click the heart icon to save it.</p>
            </div>
          ) : (
            favorites.map((item) => (
              <div key={item.id} className="group bg-white/5 border border-white/10 hover:border-orange-500/50 rounded-xl p-4 transition-all hover:bg-white/10">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-orange-400 bg-orange-900/20 px-2 py-0.5 rounded border border-orange-500/20">
                    {item.model}
                  </span>
                  <span className="text-[10px] text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(item.timestamp || Date.now()).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-sm font-semibold text-gray-200 mb-1 line-clamp-1">{item.taskOriginal}</h3>
                <p className="text-xs text-gray-400 mb-4 line-clamp-2">{item.userPrompt}</p>

                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => { onLoad(item); onClose(); }}
                    className="flex-1 bg-orange-600/20 hover:bg-orange-600/40 text-orange-200 text-xs py-2 rounded-lg flex items-center justify-center gap-1 transition-colors border border-orange-500/20"
                  >
                    <ArrowUpRight className="w-3 h-3" /> Load
                  </button>
                  <button 
                    onClick={() => onRemove(item.id!)}
                    className="p-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg border border-red-500/20 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};