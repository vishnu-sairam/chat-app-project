// backend/server.js
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { mockResponses, initialSessions } = require('./mockData');

const app = express();
const PORT = process.env.PORT || 5000;
const SESSIONS_FILE = path.join(__dirname, 'sessions.json');

// Allowed origins
const allowedOrigins = [
  'https://refchat-app.vercel.app',  // Production frontend
  'http://localhost:3000',           // Local development
  'http://localhost:5000'            // Backend URL for local testing
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());
app.use(express.json());

// In-memory sessions store
let sessions = [];

// Load sessions from file if it exists, otherwise use initial sessions
function loadSessions() {
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const data = fs.readFileSync(SESSIONS_FILE, 'utf8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        sessions = parsed;
        console.log(`Loaded ${sessions.length} sessions from file`);
      } else {
        console.error('Sessions file does not contain an array, using initial sessions');
        sessions = JSON.parse(JSON.stringify(initialSessions));
        saveSessions();
      }
    } else {
      console.log('Sessions file not found, using initial sessions');
      sessions = JSON.parse(JSON.stringify(initialSessions));
      saveSessions();
    }
  } catch (error) {
    console.error('Error loading sessions:', error);
    console.error('Error details:', error.message);
    sessions = JSON.parse(JSON.stringify(initialSessions));
    saveSessions();
  }
}

// Save sessions to file
function saveSessions() {
  try {
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
  } catch (error) {
    console.error('Error saving sessions:', error);
  }
}

// Initialize sessions on startup
loadSessions();

// Helper function to generate title from first message
function generateTitle(text) {
  const words = text.trim().split(/\s+/);
  return words.slice(0, 6).join(' ') || 'New Chat';
}

// GET /api/sessions - List all sessions
app.get('/api/sessions', (req, res) => {
  try {
    // Reload sessions from file to ensure we have the latest data
    loadSessions();
    const sessionList = sessions.map(s => ({
      sessionId: s.sessionId,
      title: s.title,
      lastUpdated: s.lastUpdated || s.createdAt
    }));
    res.json(sessionList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

// GET /api/new-chat - Create a new session
app.get('/api/new-chat', (req, res) => {
  try {
    const newSession = {
      sessionId: uuidv4(),
      title: 'New Chat',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      messages: []
    };
    sessions.push(newSession);
    saveSessions();
    res.json({
      sessionId: newSession.sessionId,
      title: newSession.title,
      createdAt: newSession.createdAt
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create new chat' });
  }
});

// GET /api/session/:id - Get full conversation history for a session
app.get('/api/session/:id', (req, res) => {
  try {
    const session = sessions.find(s => s.sessionId === req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch session' });
  }
});

// POST /api/chat/:id - Send a message and get a response
app.post('/api/chat/:id', (req, res) => {
  try {
    // Reload sessions from file to ensure we have the latest data
    loadSessions();
    
    const session = sessions.find(s => s.sessionId === req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const { question } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required' });
    }

    // Add user message
    const userMessage = {
      role: 'user',
      text: question,
      timestamp: new Date().toISOString()
    };
    session.messages.push(userMessage);

    // Generate title from first user message if this is the first message
    if (session.messages.length === 1) {
      session.title = generateTitle(question);
    }

    // Select a mock response (rotate through responses)
    // Count how many assistant messages exist (each user message should have an assistant response)
    // After adding the user message, the number of assistant responses = (total messages - 1) / 2
    // But we want the index for the NEXT response, so we use the current count of assistant messages
    const assistantMessageCount = Math.floor((session.messages.length - 1) / 2);
    const responseIndex = assistantMessageCount % mockResponses.length;
    const selectedResponse = mockResponses[responseIndex];

    // Create assistant message
    const assistantMessage = {
      role: 'assistant',
      text: selectedResponse.answerText,
      table: selectedResponse.table,
      metadata: selectedResponse.metadata,
      timestamp: new Date().toISOString(),
      answerId: selectedResponse.id
    };
    session.messages.push(assistantMessage);

    // Update lastUpdated
    session.lastUpdated = new Date().toISOString();

    // Save sessions
    saveSessions();

    // Return the assistant message
    res.json(assistantMessage);
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// DELETE /api/session/:id - Delete a session
app.delete('/api/session/:id', (req, res) => {
  try {
    const sessionId = req.params.id;
    console.log('=== DELETE REQUEST ===');
    console.log('Session ID to delete:', sessionId);
    console.log('Sessions in memory before reload:', sessions.length);
    
    // Reload sessions from file to ensure we have the latest data
    loadSessions();
    console.log('Sessions in memory after reload:', sessions.length);
    
    // Log first few session IDs for debugging
    if (sessions.length > 0) {
      console.log('First 3 session IDs:', sessions.slice(0, 3).map(s => s.sessionId));
    }
    
    const sessionIndex = sessions.findIndex(s => {
      const match = s.sessionId === sessionId;
      if (!match && s.sessionId) {
        // Log if IDs are similar but not exact match
        if (s.sessionId.substring(0, 8) === sessionId.substring(0, 8)) {
          console.log('Similar ID found:', s.sessionId, 'vs', sessionId);
        }
      }
      return match;
    });
    
    console.log('Session index found:', sessionIndex);
    
    if (sessionIndex === -1) {
      console.log('❌ Session not found in memory');
      console.log('All available session IDs:', sessions.map(s => s.sessionId || 'NO ID'));
      
      // Try to read file directly as a last resort
      if (fs.existsSync(SESSIONS_FILE)) {
        try {
          const fileData = fs.readFileSync(SESSIONS_FILE, 'utf8');
          const fileSessions = JSON.parse(fileData);
          const fileIndex = fileSessions.findIndex(s => s.sessionId === sessionId);
          if (fileIndex !== -1) {
            console.log('✅ Session found in file! Reloading...');
            sessions = fileSessions;
            sessions.splice(fileIndex, 1);
            saveSessions();
            return res.json({ message: 'Session deleted successfully', sessionId });
          }
        } catch (fileError) {
          console.error('Error reading file directly:', fileError);
        }
      }
      
      return res.status(404).json({ 
        error: 'Session not found',
        requestedId: sessionId,
        availableCount: sessions.length
      });
    }

    // Remove the session
    sessions.splice(sessionIndex, 1);
    saveSessions();
    console.log('✅ Session deleted successfully. Remaining sessions:', sessions.length);

    res.json({ message: 'Session deleted successfully', sessionId });
  } catch (error) {
    console.error('❌ Error deleting session:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: 'Failed to delete session', details: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

