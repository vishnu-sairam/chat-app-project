# Chat App - ChatGPT-style Interface

A responsive single-page application that mimics a minimal ChatGPT-style interface. Built with React (Tailwind CSS) frontend and Node.js/Express backend. 

## Features

- 🎨 **Modern UI**: Clean, responsive design with dark mode support
- 💬 **Multiple Sessions**: Create and manage multiple chat conversations
- 📊 **Structured Responses**: Displays tabular data in AI survey format with company metrics
- 👍 **Feedback System**: Like/Dislike buttons for assistant messages
- 📱 **Mobile Responsive**: Collapsible sidebar that works on all screen sizes
- 🌙 **Theme Toggle**: Light/dark mode with localStorage persistence
- 🔄 **Session Persistence**: Sessions are saved to `sessions.json` on the backend
- 🗑️ **Delete Sessions**: Delete chat sessions with confirmation dialog
- 👤 **User Profile**: Click user info to view profile details and logout option

## Project Structure

```
chat-app-project/
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── mockData.js        # Mock data for sessions and responses
│   ├── package.json
│   └── README.md
└── frontend/
    ├── src/
    │   ├── api/
    │   │   └── api.js     # API wrapper functions
    │   ├── components/
    │   │   ├── Sidebar.js
    │   │   ├── ChatWindow.js
    │   │   ├── ChatInput.js
    │   │   ├── TableResponse.js
    │   │   ├── AnswerFeedback.js
    │   │   ├── ThemeToggle.js
    │   │   └── UserPopup.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── README.md
```

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Install Tailwind CSS dependencies (if needed):
```bash
npm install -D tailwindcss postcss autoprefixer
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Running Both Concurrently (Optional)

From the project root, you can run both servers simultaneously:

```bash
# Install concurrently globally (if not already installed)
npm install -g concurrently

# Run both servers
concurrently "cd backend && npm run dev" "cd frontend && npm start"
```

Or create a root `package.json` with a script:

```json
{
  "scripts": {
    "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\""
  }
}
```

## API Endpoints

### GET /api/sessions
Returns a list of all chat sessions.

### GET /api/new-chat
Creates a new chat session and returns its details.

### GET /api/session/:id
Returns the full conversation history for a specific session.

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
  "text": "Response text with AI survey analysis",
  "table": {
    "columns": ["Company", "Metric", "Value"],
    "rows": [...]
  },
  "metadata": {...},
  "timestamp": "2024-01-01T00:00:00.000Z",
  "answerId": "uuid"
}
```

### DELETE /api/session/:id
Deletes a chat session permanently.

**Response:**
```json
{
  "message": "Session deleted successfully",
  "sessionId": "uuid"
}
```

## Usage

1. **Start a New Chat**: Click the "New Chat" button in the sidebar or on the landing page
2. **Send Messages**: Type your question in the input box and press Enter or click Send
3. **View Responses**: Assistant responses include text and structured tables with company survey data
4. **Switch Sessions**: Click on any session in the sidebar to load its history
5. **Delete Sessions**: Hover over a session and click the delete icon (trash) to remove it
6. **Toggle Theme**: Use the theme toggle button in the sidebar header
7. **User Profile**: Click on the user info at the bottom of the sidebar to view profile details and logout
8. **Provide Feedback**: Click 👍 or 👎 on assistant messages

## Tailwind CSS Setup

Tailwind CSS is already configured. The setup includes:

- `tailwind.config.js` - Tailwind configuration with dark mode support
- `postcss.config.js` - PostCSS configuration
- `src/index.css` - Contains Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

Dark mode is implemented using the `dark:` variant and the `dark` class on the root element.

## Response Types

The AI provides survey-style responses with company data:

1. **Quarterly Revenue Analysis** - Company revenue comparison across quarters
2. **Employee Satisfaction Survey** - IT company satisfaction metrics with Indian locations
3. **Market Share Analysis** - Software companies in Andhra Pradesh
4. **Customer Retention Survey** - Company retention rates and satisfaction scores
5. **Productivity Metrics** - Development team productivity across companies
6. **Technology Adoption Survey** - Cloud, AI/ML, and DevOps adoption rates

All responses include structured tables with Indian company names and locations (Hyderabad, Vijayawada, Visakhapatnam).

## Acceptance Tests

✅ GET /api/sessions returns at least 2 sessions  
✅ GET /api/new-chat returns a new sessionId  
✅ Visiting /chat/<sessionId> loads conversation from backend  
✅ Submitting a question produces an assistant reply with table and answerText  
✅ Left sidebar lists sessions and switching sessions loads history  
✅ URL contains sessionId for each session  
✅ Theme toggle persists after reload  
✅ UI is responsive (sidebar collapses on small screens; table scrolls horizontally if needed)  
✅ Delete session functionality works with confirmation  
✅ User popup displays profile information and logout option  
✅ First message in new chat receives a response  

## Bonus Features

- ✅ Sessions persist to `sessions.json` on backend
- ✅ Auto-generate session title from first user message
- ✅ Smooth animations for sidebar transitions
- ✅ Responsive table scrolling
- ✅ Delete chat sessions with confirmation
- ✅ User profile popup with logout functionality
- ✅ AI survey-style responses with Indian company data
- ✅ Enhanced error handling and logging

## Technologies Used

- **Frontend**: React, React Router, Tailwind CSS
- **Backend**: Node.js, Express, CORS
- **Data**: Static JSON mock data with file-based persistence
- **Styling**: Tailwind CSS with dark mode support
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router v6

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Backend (Render/Railway)**:
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set root directory to `backend`
4. Deploy

**Frontend (Vercel)**:
1. Connect GitHub repository to Vercel
2. Set root directory to `frontend`
3. Add environment variable: `REACT_APP_API_URL` = your backend URL
4. Deploy

For step-by-step instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Troubleshooting

### Port Already in Use Error

If you see `EADDRINUSE: address already in use :::5000`:

**Windows:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
# Find process using port 5000
lsof -ti:5000

# Kill the process
kill -9 $(lsof -ti:5000)
```

### Backend Not Responding

1. Ensure backend server is running on port 5000
2. Check CORS configuration in `server.js`
3. Verify `sessions.json` file exists and is readable
4. Check console for error messages

### Frontend Not Loading

1. Ensure frontend server is running on port 3000
2. Check if Tailwind CSS is properly configured
3. Verify API base URL in `frontend/src/api/api.js`
4. Check browser console for errors

### CORS Issues in Production

Update `backend/server.js` to allow your frontend domain:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
```


