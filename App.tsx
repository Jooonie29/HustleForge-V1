
import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { HustleHub } from './pages/HustleHub';
import { AiCoach } from './pages/AiCoach';
import { Routine } from './pages/Routine';
import { Settings } from './pages/Settings';
import { Auth } from './pages/Auth';
import { PersonaQuiz } from './pages/PersonaQuiz';
import { PersonaReveal } from './pages/PersonaReveal';
import { NavigationTab, UserOnboardingData, PersonaContent } from './types';
import { calculatePersona } from './services/personaService';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);
  
  // State for Persona
  const [userTitle, setUserTitle] = useState('Hustler');
  const [persona, setPersona] = useState<PersonaContent | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleQuizComplete = (data: UserOnboardingData) => {
    const generatedPersona = calculatePersona(data);
    setPersona(generatedPersona);
    setUserTitle(data.title);
    // Don't mark quiz as fully complete yet, show reveal first
    setShowReveal(true);
  };

  const handleRevealContinue = () => {
    setShowReveal(false);
    setQuizCompleted(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setQuizCompleted(false);
    setShowReveal(false);
    setPersona(null);
    setActiveTab(NavigationTab.DASHBOARD);
  };

  const renderContent = () => {
    if (!persona) return null; // Should not happen if flow is correct

    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return <Dashboard persona={persona} />;
      case NavigationTab.HUSTLE:
        return <HustleHub persona={persona} />;
      case NavigationTab.COACH:
        return <AiCoach persona={persona} userTitle={userTitle} />;
      case NavigationTab.ROUTINE:
        return <Routine persona={persona} />;
      case NavigationTab.SETTINGS:
        return <Settings />;
      default:
        return <Dashboard persona={persona} />;
    }
  };

  // Auth Flow
  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  // Quiz Flow
  if (isAuthenticated && !quizCompleted && !showReveal) {
    return <PersonaQuiz onComplete={handleQuizComplete} />;
  }

  // Reveal Flow
  if (isAuthenticated && showReveal && persona) {
    return <PersonaReveal persona={persona} onContinue={handleRevealContinue} />;
  }

  // Main App Flow
  return (
    <HashRouter>
      <Layout 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        userTitle={userTitle}
      >
        {renderContent()}
      </Layout>
    </HashRouter>
  );
};

export default App;
