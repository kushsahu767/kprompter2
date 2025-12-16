import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { InputForm } from './components/InputForm.tsx';
import { ResultDisplay } from './components/ResultDisplay.tsx';
import { ApiKeyModal } from './components/ApiKeyModal.tsx';
import { StatsFooter } from './components/StatsFooter.tsx';
import { FavoritesPanel } from './components/FavoritesPanel.tsx';
import { HistoryPanel } from './components/HistoryPanel.tsx';
import { ModelsPage } from './components/ModelsPage.tsx';
import { TemplatesPage } from './components/TemplatesPage.tsx';
import { EnterprisePage } from './components/EnterprisePage.tsx';

import { generateOptimizedPrompt } from './services/geminiService';
import { saveUsageData, getFavorites, saveFavorite, removeFavorite, isFavorite, getHistory, clearHistory } from './services/dbService';
import { DEFAULT_REQUEST, DEFAULT_API_KEY } from './constants';
import { PromptRequest, GeneratedPromptData, FavoriteItem, View, ModelOption, HistoryItem } from './types';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY || localStorage.getItem('gemini_api_key') || '');
  const [currentView, setCurrentView] = useState<View>('home');
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  const [request, setRequest] = useState<PromptRequest>(DEFAULT_REQUEST);
  const [result, setResult] = useState<GeneratedPromptData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [statsTrigger, setStatsTrigger] = useState(0);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Save API key to local storage when it changes
  useEffect(() => {
    if (apiKey) localStorage.setItem('gemini_api_key', apiKey);
  }, [apiKey]);

  // Load data on mount
  useEffect(() => {
    setFavorites(getFavorites());
    setHistory(getHistory());
  }, []);

  // Reload history when stats update (since generation adds to history)
  useEffect(() => {
    setHistory(getHistory());
  }, [statsTrigger]);

  const navigateTo = (view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleModelSelect = (model: ModelOption) => {
    setRequest(prev => ({ ...prev, model }));
    navigateTo('home');
    setTimeout(() => {
      document.getElementById('input-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleTemplateSelect = (task: string, model: ModelOption) => {
    setRequest(prev => ({ ...prev, task, model }));
    navigateTo('home');
    setTimeout(() => {
      document.getElementById('input-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = async () => {
    if (!apiKey) {
      setIsSettingsOpen(true);
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      const data = await generateOptimizedPrompt(apiKey, request);
      // Attach ID and timestamp to the result
      const fullData = { ...data, id: crypto.randomUUID(), timestamp: Date.now() };
      setResult(fullData);
      
      // Save to mock DB
      await saveUsageData(request.model, request.outputType, request.task);
      setStatsTrigger(prev => prev + 1); // Refresh footer stats and history
      
    } catch (error) {
      console.error(error);
      alert('Failed to generate prompt. Please check your API Key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (data: GeneratedPromptData) => {
    if (!data.id) return;
    
    if (isFavorite(data.id)) {
      removeFavorite(data.id);
    } else {
      const favItem: FavoriteItem = {
        ...data,
        model: request.model,
        taskOriginal: request.task
      };
      saveFavorite(favItem);
    }
    setFavorites(getFavorites());
  };

  const handleLoadFavorite = (item: FavoriteItem) => {
    setRequest({
      task: item.taskOriginal,
      model: item.model,
      skillLevel: request.skillLevel, 
      outputType: request.outputType, 
      constraints: item.constraints.join(', ')
    });
    setResult(item);
    navigateTo('home');
    setTimeout(() => {
      document.getElementById('input-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleLoadHistory = (item: HistoryItem) => {
    setRequest(prev => ({
      ...prev,
      task: item.taskFull || item.taskPreview, // Use full task if available
      model: item.model,
      outputType: item.outputType
    }));
    navigateTo('home');
    setTimeout(() => {
      document.getElementById('input-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear your history?")) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-orange-500/30 font-sans flex flex-col">
      <Header 
        onOpenSettings={() => setIsSettingsOpen(true)} 
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        currentView={currentView}
        onNavigate={navigateTo}
      />
      
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20 flex-grow">
        {currentView === 'home' && (
          <>
            <Hero />
            <InputForm 
              request={request}
              setRequest={setRequest}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
            {result && (
              <ResultDisplay 
                data={result} 
                onToggleFavorite={toggleFavorite}
                isFavorite={result.id ? isFavorite(result.id) : false}
              />
            )}
          </>
        )}

        {currentView === 'models' && <ModelsPage onSelectModel={handleModelSelect} />}
        {currentView === 'templates' && <TemplatesPage onSelectTemplate={handleTemplateSelect} />}
        {currentView === 'enterprise' && <EnterprisePage />}
      </main>

      <StatsFooter refreshTrigger={statsTrigger} />

      <ApiKeyModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      <FavoritesPanel 
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemove={(id) => { removeFavorite(id); setFavorites(getFavorites()); }}
        onLoad={handleLoadFavorite}
      />

      <HistoryPanel 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onLoad={handleLoadHistory}
        onClear={handleClearHistory}
      />
    </div>
  );
};

export default App;