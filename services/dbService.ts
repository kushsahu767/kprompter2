import { HistoryItem, Stats, ModelOption, OutputType, FavoriteItem } from "../types";

const STORAGE_KEY_STATS = 'kprompter_stats';
const STORAGE_KEY_HISTORY = 'kprompter_history';
const STORAGE_KEY_FAVORITES = 'kprompter_favorites';

// Simulate a cloud DB interaction with local storage
export const saveUsageData = async (model: ModelOption, outputType: OutputType, task: string): Promise<void> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Update Stats
  const currentStats = getStats();
  currentStats.totalGenerations += 1;
  currentStats.modelUsage[model] = (currentStats.modelUsage[model] || 0) + 1;
  localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(currentStats));

  // Update History
  const history = getHistory();
  const newItem: HistoryItem = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    model,
    outputType,
    taskPreview: task.substring(0, 60) + (task.length > 60 ? '...' : ''),
    taskFull: task
  };
  
  // Keep last 20 items
  const updatedHistory = [newItem, ...history].slice(0, 20);
  localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
};

export const getStats = (): Stats => {
  const stored = localStorage.getItem(STORAGE_KEY_STATS);
  if (stored) return JSON.parse(stored);
  return { totalGenerations: 0, modelUsage: {} };
};

export const getHistory = (): HistoryItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY_HISTORY);
  if (stored) return JSON.parse(stored);
  return [];
};

export const clearHistory = (): void => {
  localStorage.removeItem(STORAGE_KEY_HISTORY);
};

// Favorites Logic
export const getFavorites = (): FavoriteItem[] => {
  const stored = localStorage.getItem(STORAGE_KEY_FAVORITES);
  if (stored) return JSON.parse(stored);
  return [];
};

export const saveFavorite = (item: FavoriteItem): void => {
  const favorites = getFavorites();
  // Check if already exists by ID or content similarity to avoid dupes
  if (!favorites.find(f => f.id === item.id)) {
    const updated = [item, ...favorites];
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(updated));
  }
};

export const removeFavorite = (id: string): void => {
  const favorites = getFavorites();
  const updated = favorites.filter(f => f.id !== id);
  localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(updated));
};

export const isFavorite = (id: string): boolean => {
  const favorites = getFavorites();
  return favorites.some(f => f.id === id);
};