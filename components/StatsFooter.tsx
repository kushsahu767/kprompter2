import React, { useEffect, useState } from 'react';
import { getStats } from '../services/dbService';
import { Stats } from '../types';

export const StatsFooter: React.FC<{ refreshTrigger: number }> = ({ refreshTrigger }) => {
  const [stats, setStats] = useState<Stats>({ totalGenerations: 0, modelUsage: {} });

  useEffect(() => {
    setStats(getStats());
  }, [refreshTrigger]);

  return (
    <div className="w-full border-t border-white/5 mt-20 py-8">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Community Stats (Mocked DB)</p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="text-center">
            <span className="block text-2xl font-bold text-white">{stats.totalGenerations}</span>
            <span className="text-sm text-gray-500">Prompts Generated</span>
          </div>
          {Object.entries(stats.modelUsage).slice(0, 3).map(([model, count]) => (
            <div key={model} className="text-center">
              <span className="block text-2xl font-bold text-gray-300">{count}</span>
              <span className="text-sm text-gray-500">{model}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
