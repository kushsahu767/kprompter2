import { ModelOption, OutputType, SkillLevel } from './types';

// In a real scenario, this would be an env var, but for the "one file" feel requested:
export const DEFAULT_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ""; 

export const DEFAULT_REQUEST = {
  task: "",
  model: ModelOption.GEMINI_3,
  skillLevel: SkillLevel.BEGINNER,
  outputType: OutputType.TEXT,
  constraints: ""
};