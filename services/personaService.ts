
import { PersonaContent, PersonaType, UserOnboardingData, Task } from '../types';

// Default content for fallback
const defaultRoutine: Task[] = [
  { id: '1', title: 'Deep Work', time: '08:00 AM', completed: false, category: 'work' },
  { id: '2', title: 'Physical Training', time: '06:00 PM', completed: false, category: 'health' },
];

export const PERSONA_CONTENT: Record<PersonaType, PersonaContent> = {
  'The Conqueror': {
    type: 'The Conqueror',
    tagline: 'Dominate or Dissolve.',
    description: 'You are driven by a need to prove them wrong. You thrive on conflict and high stakes.',
    quote: 'The world is yours to take, but you must be willing to bleed for it.',
    quoteAuthor: 'Napoleon Bonaparte',
    dashboardFocusLabel: 'Dominance Score',
    aiSystemInstruction: `You are the War Council AI. Address the user as their chosen title. 
    The user is a "Conqueror" archetype—driven by revenge, peer pressure, and a desire to dominate. 
    Your tone should be aggressive, challenging, and focused on power dynamics, high-risk/high-reward strategies, and crushing competition. 
    Do not be soft. Demand greatness.`,
    hustleFilterTags: ['Risk', 'Sales', 'Scale'],
    guideFocus: ['Growth', 'E-com', 'Starter'], // Rapid expansion
    financialFocus: ['Investing', 'Mindset'], // Aggressive wealth building
    defaultRoutine: [
      { id: 'c1', title: 'Cold Outreach (50 leads)', time: '09:00 AM', completed: false, category: 'work' },
      { id: 'c2', title: 'Competitive Analysis', time: '11:00 AM', completed: false, category: 'work' },
      { id: 'c3', title: 'Heavy Lifting', time: '06:00 PM', completed: false, category: 'health' },
    ]
  },
  'The Architect': {
    type: 'The Architect',
    tagline: 'Measure Twice. Cut Once.',
    description: 'You build systems that last. You value stability, family, and long-term legacy.',
    quote: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    quoteAuthor: 'Aristotle',
    dashboardFocusLabel: 'Structure Score',
    aiSystemInstruction: `You are the Blueprint AI. Address the user as their chosen title.
    The user is an "Architect" archetype—driven by family and stability. 
    Your tone should be analytical, calm, structured, and focused on long-term systems, compounding growth, and risk mitigation. 
    Focus on "Foundations" and "Optimization".`,
    hustleFilterTags: ['Recurring', 'SaaS', 'Investing'],
    guideFocus: ['Legal', 'Digital', 'Systems'], // Stability and Systems
    financialFocus: ['Saving', 'Investing'], // Preservation and steady growth
    defaultRoutine: [
      { id: 'a1', title: 'System Audit', time: '08:00 AM', completed: false, category: 'work' },
      { id: 'a2', title: 'Family/Network Time', time: '05:00 PM', completed: false, category: 'health' },
      { id: 'a3', title: 'Learning Phase', time: '08:00 PM', completed: false, category: 'learning' },
    ]
  },
  'The Visionary': {
    type: 'The Visionary',
    tagline: 'Create the Future.',
    description: 'You see what others cannot. You are driven by innovation and eagerness to succeed.',
    quote: 'The best way to predict the future is to create it.',
    quoteAuthor: 'Peter Drucker',
    dashboardFocusLabel: 'Innovation Score',
    aiSystemInstruction: `You are the Oracle AI. Address the user as their chosen title.
    The user is a "Visionary" archetype—driven by eagerness to success and peer pressure (to stand out). 
    Your tone should be inspiring, forward-looking, and focused on leverage, AI, brand building, and "Big Picture" thinking.
    Encourage bold moves and unique positioning.`,
    hustleFilterTags: ['Content', 'AI', 'Auto'],
    guideFocus: ['Digital', 'Growth', 'Starter'], // New tech and scaling
    financialFocus: ['Investing', 'Mindset'], // High risk/reward
    defaultRoutine: [
      { id: 'v1', title: 'Creative Flow State', time: '07:00 AM', completed: false, category: 'work' },
      { id: 'v2', title: 'Content Creation', time: '10:00 AM', completed: false, category: 'work' },
      { id: 'v3', title: 'Trend Research', time: '02:00 PM', completed: false, category: 'learning' },
    ]
  },
  'The Monk': {
    type: 'The Monk',
    tagline: 'Silence is Power.',
    description: 'You focus internally. You are driven by relationships and self-mastery.',
    quote: 'He who conquers himself is the mightiest warrior.',
    quoteAuthor: 'Confucius',
    dashboardFocusLabel: 'Clarity Score',
    aiSystemInstruction: `You are the Sage AI. Address the user as their chosen title.
    The user is a "Monk" archetype—driven by relationships and inner peace/focus. 
    Your tone should be minimalist, zen, stoic, and deep. 
    Focus on deep work, removing distractions, essentialism, and mental clarity.`,
    hustleFilterTags: ['Writing', 'Service', 'SEO'],
    guideFocus: ['Starter', 'Digital'], // Low overhead, solo work
    financialFocus: ['Saving', 'Mindset'], // Frugality and philosophy
    defaultRoutine: [
      { id: 'm1', title: 'Meditation', time: '06:00 AM', completed: false, category: 'health' },
      { id: 'm2', title: 'Deep Work (No Internet)', time: '08:00 AM', completed: false, category: 'work' },
      { id: 'm3', title: 'Journaling', time: '09:00 PM', completed: false, category: 'health' },
    ]
  },
  'The Operator': {
    type: 'The Operator',
    tagline: 'Execution is Everything.',
    description: 'You get things done. You use anger or eagerness as fuel to clear tasks efficiently.',
    quote: 'Action is the foundational key to all success.',
    quoteAuthor: 'Pablo Picasso',
    dashboardFocusLabel: 'Efficiency Score',
    aiSystemInstruction: `You are the Chief of Staff AI. Address the user as their chosen title.
    The user is an "Operator" archetype—driven by anger (fuel) or eagerness to succeed. 
    Your tone should be extremely concise, tactical, bullet-pointed, and no-nonsense. 
    Focus on speed, checklists, automation, and immediate ROI.`,
    hustleFilterTags: ['Service', 'Sales', 'Investing'],
    guideFocus: ['Starter', 'Growth', 'Systems'], // Speed to market
    financialFocus: ['Mindset', 'Saving'], // Pragmatic finance
    defaultRoutine: [
      { id: 'o1', title: 'Clear Inbox/Tasks', time: '08:00 AM', completed: false, category: 'work' },
      { id: 'o2', title: 'Client Calls', time: '11:00 AM', completed: false, category: 'work' },
      { id: 'o3', title: 'Skill Acquisition', time: '07:00 PM', completed: false, category: 'learning' },
    ]
  }
};

export const calculatePersona = (data: UserOnboardingData): PersonaContent => {
  const { motivation, feeling } = data;

  // Logic Matrix
  // Motivation: family, relationship, peer pressure
  // Feeling: anger, revenge, eager to success

  if (feeling === 'Revenge' || (feeling === 'Anger' && motivation === 'Peer Pressure')) {
    return PERSONA_CONTENT['The Conqueror'];
  }

  if (motivation === 'Family' && feeling === 'Eager to success') {
    return PERSONA_CONTENT['The Architect'];
  }

  if (motivation === 'Peer Pressure' && feeling === 'Eager to success') {
    return PERSONA_CONTENT['The Visionary'];
  }

  if (motivation === 'Relationship' || feeling === 'Anger') { 
    // Anger channeled into work often fits Operator, Relationship fits Monk
    if (motivation === 'Relationship') return PERSONA_CONTENT['The Monk'];
    return PERSONA_CONTENT['The Operator'];
  }
  
  // Fallbacks
  if (feeling === 'Anger') return PERSONA_CONTENT['The Operator'];
  if (feeling === 'Revenge') return PERSONA_CONTENT['The Conqueror'];
  
  // Default
  return PERSONA_CONTENT['The Visionary'];
};
