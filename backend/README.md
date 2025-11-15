# Backend Server

Express server providing API endpoints for the chat application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### GET /api/sessions
Returns a list of all chat sessions.

**Response:**
```json
[
  {
    "sessionId": "uuid",
    "title": "Session Title",
    "lastUpdated": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/new-chat
Creates a new chat session and returns its details.

**Response:**
```json
{
  "sessionId": "uuid",
  "title": "New Chat",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### GET /api/session/:id
Returns the full conversation history for a specific session.

**Response:**
```json
{
  "sessionId": "uuid",
  "title": "Session Title",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "lastUpdated": "2024-01-01T00:00:00.000Z",
  "messages": [...]
}
```

### POST /api/chat/:id
Sends a message to the chat and receives a response.

**Request Body:**
```json
{
  "question": "Your question here"
}
```

**Response:**
```json
{
  "text": "Answer text",
  "table": {
    "columns": [...],
    "rows": [...]
  },
  "metadata": {...},
  "timestamp": "2024-01-01T00:00:00.000Z",
  "answerId": "uuid"
}
```

## Data Persistence

Sessions are automatically saved to `sessions.json` file. If the file doesn't exist, the server will initialize with mock data from `mockData.js`.

