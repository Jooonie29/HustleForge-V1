
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
  category: 'work' | 'health' | 'learning';
}

export interface HustleIdea {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  potential: string;
  tags: string[];
  riskLevel?: 'Low' | 'Medium' | 'High';
  timeToRevenue?: string;
  content: string; // Detailed content for modal
}

export interface HustleGuide {
  id: string;
  title: string;
  description: string;
  readTime: string;
  category: string;
  isPremium?: boolean;
  content: string;
}

export interface FinancialRule {
  id: string;
  title: string;
  description: string; // Short description for the card
  category: 'Mindset' | 'Investing' | 'Saving';
  content: string; // Detailed content for modal
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum NavigationTab {
  DASHBOARD = 'Dashboard',
  HUSTLE = 'Hustle Hub',
  COACH = 'AI Coach',
  ROUTINE = 'Routine',
  SETTINGS = 'Settings',
}

/* --- NEW PERSONA TYPES --- */

export type PersonaType = 'The Conqueror' | 'The Architect' | 'The Visionary' | 'The Monk' | 'The Operator';

export interface UserOnboardingData {
  occupation: string;
  age: string;
  mood: string;
  motivation: string; // family, relationship, peer pressure
  feeling: string; // anger, revenge, eager to success
  title: string; // Liege, Master, Hustler, Boss
}

export interface PersonaContent {
  type: PersonaType;
  tagline: string;
  description: string;
  quote: string;
  quoteAuthor: string;
  dashboardFocusLabel: string; // e.g., "Dominance Score" vs "Efficiency Score"
  aiSystemInstruction: string;
  hustleFilterTags: string[]; // tags to prioritize in HustleHub
  guideFocus: string[]; // categories of guides to prioritize
  financialFocus: string[]; // categories of financial rules to prioritize
  defaultRoutine: Task[];
  themeColor?: string; // Optional accent override
}
