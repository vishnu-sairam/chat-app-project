// frontend/src/components/ChatInput.js
import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
      <div className="flex gap-2 max-w-4xl mx-auto">
        <textarea
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={disabled}
          rows={1}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white resize-none overflow-y-auto"
          style={{ minHeight: '44px', maxHeight: '200px' }}
        />
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;

