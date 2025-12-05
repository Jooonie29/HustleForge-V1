
import { GoogleGenAI, Chat, GenerateContentResponse, Type } from "@google/genai";
import { HustleIdea, PersonaContent, HustleGuide, FinancialRule } from "../types";

const DEFAULT_SYSTEM_INSTRUCTION = `You are the HustleForge AI Coach. 
Your persona is a high-performance productivity mentor for ambitious men. 
You are direct, stoic, and focused on results, financial growth, and discipline.
Keep responses concise, actionable, and free of fluff.
Do not use emojis excessively. 
Focus on frameworks, mental models, and clear steps.`;

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const createChatSession = (customInstruction?: string): Chat => {
  const client = getAiClient();
  return client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: customInstruction || DEFAULT_SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageToAi = async (chatSession: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chatSession.sendMessage({ message });
    return response.text || "Focus maintained. No output received.";
  } catch (error) {
    console.error("AI Error:", error);
    return "The connection to the forge is unstable. Check your network or API key.";
  }
};

export const generateMoreHustles = async (persona?: PersonaContent): Promise<HustleIdea[]> => {
  const client = getAiClient();
  
  let personaContext = "";
  if (persona) {
    personaContext = `The user fits the "${persona.type}" archetype. 
    They are driven by: ${persona.description}. 
    They prefer hustles related to: ${persona.hustleFilterTags.join(', ')}.
    Generate ideas that specifically appeal to this psychology (e.g., if "The Conqueror", suggest high-risk/high-reward. If "The Monk", suggest low-overhead/solitary work).`;
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate 3 distinct, modern, and actionable side hustle or business ideas for men in 2025. 
      ${personaContext}
      
      STRICT CONSTRAINTS:
      1. description: MUST be between 14 and 18 words long. Be concise, punchy, and actionable. No fluff.
      2. potential: MUST be a numerical monetary range (e.g., "$2k - $10k/mo"). Do NOT use text like "High revenue".
      3. content: MUST be a detailed, step-by-step plan in Markdown format (approx 150-200 words). Use headings (### Step X), lists (-), and bold text (**).
      4. Focus on digital, service-based, AI-driven, or high-leverage opportunities.
      5. Avoid generic answers.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
              potential: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
              timeToRevenue: { type: Type.STRING },
              content: { type: Type.STRING }
            },
            required: ["title", "description", "difficulty", "potential", "tags", "riskLevel", "timeToRevenue", "content"]
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data.map((item: any) => ({
        ...item,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      }));
    }
  } catch (error) {
    console.error("Failed to generate hustles:", error);
  }
  return [];
};

export const generateMoreGuides = async (persona?: PersonaContent): Promise<HustleGuide[]> => {
    const client = getAiClient();
    
    let personaContext = "";
    if (persona) {
      personaContext = `The user is a "${persona.type}" archetype. They are interested in blueprints related to: ${persona.guideFocus.join(', ')}. Generate guides that align with this focus.`;
    }
  
    const categories = ["Starter", "Growth", "Digital", "E-com", "Legal", "Systems"];
  
    try {
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate 2 distinct and actionable business or skill blueprints. These are guides for ambitious individuals.
        ${personaContext}
        
        STRICT CONSTRAINTS:
        1. description: MUST be a concise, valuable summary of the blueprint, around 20-25 words.
        2. readTime: MUST be in the format "X Min Read" (e.g., "15 Min Read").
        3. category: MUST be one of the following: ${categories.join(', ')}.
        4. title: MUST be catchy and clear.
        5. content: MUST be a detailed, step-by-step guide in Markdown format. Use headings (e.g., '### Step 1: Title'), lists (-), and bold text (**). Provide at least 3-5 clear, actionable steps. The content should be around 150-200 words.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                readTime: { type: Type.STRING },
                category: { type: Type.STRING, enum: categories },
                content: { type: Type.STRING }
              },
              required: ["title", "description", "readTime", "category", "content"]
            }
          }
        }
      });
  
      if (response.text) {
        const data = JSON.parse(response.text);
        return data.map((item: any) => ({
          ...item,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
        }));
      }
    } catch (error) {
      console.error("Failed to generate guides:", error);
    }
    return [];
};

export const generateMoreFinancialRules = async (persona?: PersonaContent): Promise<FinancialRule[]> => {
    const client = getAiClient();
    
    let personaContext = "";
    if (persona) {
        personaContext = `The user is a "${persona.type}" archetype. They value financial principles related to: ${persona.financialFocus.join(', ')}. Generate rules aligned with this mindset.`;
    }
  
    const categories = ["Mindset", "Investing", "Saving"];
  
    try {
      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate 2 new financial rules or money-related principles for ambitious men.
        ${personaContext}
        
        STRICT CONSTRAINTS:
        1. title: MUST be a strong, memorable principle (e.g., "Asymmetry: Bet Small, Win Big").
        2. description: MUST be a concise, actionable explanation for the card view, around 20-30 words.
        3. content: MUST be a more detailed, in-depth explanation in Markdown format for a modal view (approx 100-150 words). Use bold text (**) for emphasis.
        4. category: MUST be one of the following: ${categories.join(', ')}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                content: { type: Type.STRING },
                category: { type: Type.STRING, enum: categories }
              },
              required: ["title", "description", "content", "category"]
            }
          }
        }
      });
  
      if (response.text) {
        const data = JSON.parse(response.text);
        return data.map((item: any) => ({
          ...item,
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9)
        }));
      }
    } catch (error) {
      console.error("Failed to generate financial rules:", error);
    }
    return [];
};
