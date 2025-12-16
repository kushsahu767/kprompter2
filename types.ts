export enum ModelOption {
  GEMINI_3 = 'Gemini 3.0 Pro (Preview)',
  GEMINI_2_FLASH = 'Gemini 2.5 Flash',
  CHATGPT_5 = 'GPT-5 (Hypothetical)',
  CHATGPT_4O = 'GPT-4o',
  CLAUDE_HAIKU = 'Claude 3 Haiku',
  CLAUDE_OPUS = 'Claude 3.5 Opus',
  MISTRAL = 'Mistral Large 2',
  LLAMA_4 = 'Llama 4 (Preview)'
}

export enum OutputType {
  TEXT = 'Text',
  CODE = 'Code',
  JSON = 'JSON',
  UI = 'UI/HTML'
}

export enum SkillLevel {
  BEGINNER = 'Beginner',
  ADVANCED = 'Advanced'
}

export type View = 'home' | 'models' | 'templates' | 'enterprise';

export interface PromptRequest {
  task: string;
  model: ModelOption;
  skillLevel: SkillLevel;
  outputType: OutputType;
  constraints?: string;
}

export interface GeneratedPromptData {
  id?: string;
  systemPrompt: string;
  userPrompt: string;
  constraints: string[];
  examples: string;
  tips: string[];
  explanation: string;
  timestamp?: number;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  model: ModelOption;
  outputType: OutputType;
  taskPreview: string;
  taskFull?: string;
}

export interface FavoriteItem extends GeneratedPromptData {
  model: ModelOption;
  taskOriginal: string;
}

export interface Stats {
  totalGenerations: number;
  modelUsage: Record<string, number>;
}