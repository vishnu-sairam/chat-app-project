// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import { createNewChat } from './api/api';

// Landing/New Chat component
const Landing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleNewChat = async () => {
    try {
      setLoading(true);
      const newChat = await createNewChat();
      navigate(`/chat/${newChat.sessionId}`);
    } catch (error) {
      console.error('Failed to create new chat:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Welcome to Chat App
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Start a new conversation to begin chatting
        </p>
        <button
          onClick={handleNewChat}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors font-medium"
        >
          {loading ? 'Creating...' : 'Start New Chat'}
        </button>
      </div>
    </div>
  );
};

// Session Page component
const SessionPage = () => {
  return <ChatWindow />;
};

// Main App Layout
const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Open sidebar"
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">Chat App</h1>
        </header>

        {/* Route Content */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/chat/:sessionId" element={<SessionPage />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  // Apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;

