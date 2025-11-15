// frontend/src/components/Sidebar.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSessions, createNewChat, deleteSession } from '../api/api';
import ThemeToggle from './ThemeToggle';
import UserPopup from './UserPopup';

const Sidebar = ({ isOpen, onClose }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userPopupOpen, setUserPopupOpen] = useState(false);
  const [deletingSessionId, setDeletingSessionId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const userInfo = {
    name: 'User',
    email: 'vishnusairam213@gmail.com',
    phone: '9494859544'
  };

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      const data = await getSessions();
      setSessions(data);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewChat = async () => {
    try {
      const newChat = await createNewChat();
      navigate(`/chat/${newChat.sessionId}`);
      onClose();
      // Reload sessions to include the new one
      loadSessions();
    } catch (error) {
      console.error('Failed to create new chat:', error);
    }
  };

  const handleSessionClick = (sessionId) => {
    navigate(`/chat/${sessionId}`);
    onClose();
  };

  const handleDeleteSession = async (e, sessionId) => {
    e.stopPropagation(); // Prevent navigation when clicking delete
    
    // Show confirmation
    if (!window.confirm('Are you sure you want to delete this chat? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingSessionId(sessionId);
      const result = await deleteSession(sessionId);
      console.log('Delete result:', result);
      
      // If the deleted session is currently active, navigate to home
      if (location.pathname === `/chat/${sessionId}`) {
        navigate('/');
      }
      
      // Reload sessions list
      await loadSessions();
    } catch (error) {
      console.error('Failed to delete session:', error);
      const errorMessage = error.message || 'Failed to delete session. Please try again.';
      alert(errorMessage);
    } finally {
      setDeletingSessionId(null);
    }
  };

  const isActive = (sessionId) => {
    return location.pathname === `/chat/${sessionId}`;
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Chat Sessions</h2>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Close sidebar"
            >
              ✕
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={handleNewChat}
            className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            + New Chat
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">Loading...</div>
          ) : sessions.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">No sessions yet</div>
          ) : (
            <ul className="p-2">
              {sessions.map((session) => (
                <li key={session.sessionId}>
                  <div
                    className={`group flex items-center gap-2 rounded-lg mb-1 transition-colors ${
                      isActive(session.sessionId)
                        ? 'bg-blue-100 dark:bg-blue-900'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    <button
                      onClick={() => handleSessionClick(session.sessionId)}
                      className={`flex-1 text-left px-4 py-2 transition-colors ${
                        isActive(session.sessionId)
                          ? 'text-blue-900 dark:text-blue-100'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <div className="font-medium truncate">{session.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(session.lastUpdated).toLocaleDateString()}
                      </div>
                    </button>
                    <button
                      onClick={(e) => handleDeleteSession(e, session.sessionId)}
                      disabled={deletingSessionId === session.sessionId}
                      className={`p-2 mr-2 rounded-lg transition-colors ${
                        deletingSessionId === session.sessionId
                          ? 'opacity-50 cursor-not-allowed'
                          : 'opacity-0 group-hover:opacity-100 hover:bg-red-100 dark:hover:bg-red-900'
                      }`}
                      aria-label="Delete session"
                      title="Delete chat"
                    >
                      {deletingSessionId === session.sessionId ? (
                        <svg className="w-4 h-4 text-red-600 dark:text-red-400 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* User Info Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 relative">
          <button
            onClick={() => setUserPopupOpen(!userPopupOpen)}
            className="w-full flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="text-sm font-medium text-gray-800 dark:text-white truncate">User</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Online</div>
            </div>
          </button>
          
          {/* User Popup */}
          <UserPopup
            isOpen={userPopupOpen}
            onClose={() => setUserPopupOpen(false)}
            userInfo={userInfo}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

