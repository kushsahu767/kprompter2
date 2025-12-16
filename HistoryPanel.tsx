import React from 'react';
import { X, RotateCw, Trash2, ArrowUpRight, Clock } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  history: HistoryItem[];
  onLoad: (item: HistoryItem) => void;
  onClear: () => void;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({ 
  isOpen, 
  onClose, 
  history, 
  onLoad,
  onClear
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
            <Clock className="w-5 h-5 text-orange-400" /> History
          </h2>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button 
                onClick={onClear} 
                className="text-xs text-red-400 hover:text-red-300 px-3 py-1 rounded-full border border-red-900/50 bg-red-900/20"
              >
                Clear All
              </button>
            )}
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors ml-2">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p>No history yet.</p>
              <p className="text-sm mt-2">Your recent prompt tasks will appear here.</p>
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="group bg-white/5 border border-white/10 hover:border-orange-500/50 rounded-xl p-4 transition-all hover:bg-white/10">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold text-orange-400 bg-orange-900/20 px-2 py-0.5 rounded border border-orange-500/20 uppercase tracking-wider">
                    {item.model}
                  </span>
                  <span className="text-[10px] text-gray-500">
                    {new Date(item.timestamp).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                  {item.taskPreview}
                </p>

                <div className="flex gap-2">
                  <button 
                    onClick={() => { onLoad(item); onClose(); }}
                    className="flex-1 bg-white/5 hover:bg-orange-500/20 text-gray-300 hover:text-white text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition-colors border border-white/10 hover:border-orange-500/30 group-hover:bg-white/10"
                  >
                    <RotateCw className="w-3 h-3" /> Reload Prompt
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