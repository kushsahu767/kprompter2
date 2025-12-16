import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PromptRequest, GeneratedPromptData } from "../types";

const RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    systemPrompt: { type: Type.STRING, description: "The system role or instruction for the AI." },
    userPrompt: { type: Type.STRING, description: "The main prompt text the user should input." },
    constraints: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING }, 
      description: "List of constraints included in the prompt." 
    },
    examples: { type: Type.STRING, description: "Few-shot examples if applicable, or input/output format." },
    tips: { 
      type: Type.ARRAY, 
      items: { type: Type.STRING }, 
      description: "Tips for the user to get the best result with this prompt." 
    },
    explanation: { type: Type.STRING, description: "Why this prompt structure works for the selected model." }
  },
  required: ["systemPrompt", "userPrompt", "constraints", "examples", "tips", "explanation"]
};

export const generateOptimizedPrompt = async (
  apiKey: string,
  request: PromptRequest
): Promise<GeneratedPromptData> => {
  if (!apiKey) throw new Error("API Key is missing");

  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `You are an expert Prompt Engineer specializing in optimizing prompts for Large Language Models. 
  Your goal is to take a raw user intent and transform it into a highly effective, advanced prompt structure tailored specifically for the target model: ${request.model}.
  
  User Skill Level: ${request.skillLevel}
  Desired Output Format: ${request.outputType}
  
  Analyze the user's task and constraints carefully. 
  For 'Claude', use XML tags structure. 
  For 'Gemini', use clear markdown and structured instructions.
  For 'ChatGPT', use clear persona definition and step-by-step reasoning.
  
  Return the result in strict JSON format.`;

  const userContent = `
    Task/Goal: ${request.task}
    Additional Constraints: ${request.constraints || "None provided"}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userContent,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    return JSON.parse(text) as GeneratedPromptData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
