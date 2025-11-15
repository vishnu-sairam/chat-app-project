// frontend/src/components/UserPopup.js
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const UserPopup = ({ isOpen, onClose, userInfo }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    // Clear any stored data if needed (keeping theme preference)
    // localStorage.removeItem('theme'); // Keep theme preference for better UX
    // Navigate to landing page
    navigate('/');
    onClose();
    // You can add more logout logic here (e.g., clearing tokens, session data, etc.)
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - only on mobile to prevent sidebar overlay interference */}
      <div className="fixed inset-0 z-40 lg:hidden" onClick={onClose} />
      
      {/* Popup */}
      <div
        ref={popupRef}
        className="absolute bottom-16 left-4 z-[60] w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-slide-up"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
              {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-800 dark:text-white">
                {userInfo.name || 'User'}
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">Online</div>
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="p-4 space-y-3">
          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="text-gray-500 dark:text-gray-400 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Email</div>
              <div className="text-sm text-gray-800 dark:text-gray-200 truncate">
                {userInfo.email}
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-3">
            <div className="text-gray-500 dark:text-gray-400 mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Phone</div>
              <div className="text-sm text-gray-800 dark:text-gray-200">
                {userInfo.phone}
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserPopup;

