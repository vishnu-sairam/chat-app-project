// frontend/src/components/ChatWindow.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getSessionHistory, askQuestion } from '../api/api';
import ChatInput from './ChatInput';
import TableResponse from './TableResponse';
import AnswerFeedback from './AnswerFeedback';

const ChatWindow = () => {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  // scrollToBottom function
  const scrollToBottom = useCallback(() => {
    try {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (e) {
      // ignore
    }
  }, []);

  // loadSession function using useCallback
  const loadSession = useCallback(async () => {
    if (!sessionId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const session = await getSessionHistory(sessionId);
      setMessages(session.messages || []);
    } catch (error) {
      console.error('Failed to load session:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [sessionId]);

  // Load session when sessionId changes
  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // Scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(
    async (question) => {
      if (!sessionId) return;
      try {
        setSending(true);
        // Add user message immediately
        const userMessage = {
          role: 'user',
          text: question,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, userMessage]);

        // Get response from API
        const response = await askQuestion(sessionId, question);

        // normalize text and timestamp from backend
        const text =
          response.text || response.answerText || response.answer || '';

        const assistantMessage = {
          role: 'assistant',
          text,
          table: response.table,
          metadata: response.metadata,
          timestamp: response.timestamp || new Date().toISOString(),
          answerId: response.answerId || response.id || undefined,
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error('Failed to send message:', error);
        // Remove the last user message on error
        setMessages((prev) => {
          const copy = [...prev];
          // remove the last user message if it's the one we added
          if (copy.length && copy[copy.length - 1].role === 'user') {
            copy.pop();
          }
          return copy;
        });
      } finally {
        setSending(false);
      }
    },
    [sessionId]
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">
          Loading conversation...
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
              Start a conversation by typing a message below.
            </div>
          ) : (
            messages.map((message, index) => {
              const key = message.answerId || message.timestamp || index;
              return (
                <div
                  key={key}
                  className={`flex gap-4 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      AI
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">
                      {message.text || ''}
                    </div>
                    {message.table && <TableResponse table={message.table} />}
                    {message.role === 'assistant' && message.answerId && (
                      <AnswerFeedback answerId={message.answerId} />
                    )}
                    <div className="text-xs mt-2 opacity-70">
                      {message.timestamp
                        ? new Date(message.timestamp).toLocaleTimeString()
                        : ''}
                    </div>
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      U
                    </div>
                  )}
                </div>
              );
            })
          )}
          {sending && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                AI
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <ChatInput onSendMessage={handleSendMessage} disabled={sending} />
    </div>
  );
};

export default ChatWindow;


