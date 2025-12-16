# KPrompter

A modern web application for optimizing and generating effective prompts for Large Language Models (LLMs) using Google's Gemini API. KPrompter helps users create structured, model-specific prompts tailored to different AI models like Gemini, Claude, and ChatGPT.

## Features

- **Prompt Optimization**: Transform raw user intents into highly effective, structured prompts
- **Multi-Model Support**: Optimized prompts for Gemini, Claude, and ChatGPT
- **Skill Level Adaptation**: Prompts tailored for beginners, intermediate, and advanced users
- **Output Format Control**: Support for text, code, and other output types
- **Favorites & History**: Save favorite prompts and view generation history
- **Templates**: Pre-built prompt templates for common use cases
- **Statistics Tracking**: Monitor usage and performance metrics

## Prerequisites

- Node.js (version 16 or higher)
- A valid Google Gemini API key

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kprompter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your API key:
   - Copy `.env.local.example` to `.env.local` (if it exists) or create `.env.local`
   - Add your Gemini API key:
     ```
     VITE_GEMINI_API_KEY=your_api_key_here
     ```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port specified in `vite.config.ts`).

## Building for Production

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
kprompter/
├── components/          # React components
│   ├── ApiKeyModal.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── InputForm.tsx
│   ├── ResultDisplay.tsx
│   └── ...
├── services/            # API and data services
│   ├── geminiService.ts
│   └── dbService.ts
├── types.ts             # TypeScript type definitions
├── constants.ts         # Application constants
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
└── vite.config.ts       # Vite configuration
```

## Usage

1. **Set API Key**: Enter your Gemini API key in the settings modal or via the `.env.local` file
2. **Configure Prompt**: Select your target model, skill level, and output type
3. **Generate**: Enter your task description and any constraints
4. **Optimize**: Click generate to get a structured, optimized prompt
5. **Save & Reuse**: Add prompts to favorites for future use

## API Integration

The application uses the Google Generative AI SDK (`@google/genai`) to interact with Gemini models. The API key is securely stored and used only for prompt generation requests.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Technologies Used

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (via components)
- **Icons**: Lucide React
- **AI Integration**: Google Generative AI
