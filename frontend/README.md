# Frontend - Chat App

React frontend for the ChatGPT-style chat application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Install Tailwind CSS dependencies (if not already installed):
```bash
npm install -D tailwindcss postcss autoprefixer
```

3. Tailwind is already configured. The configuration files are:
   - `tailwind.config.js`
   - `postcss.config.js`
   - `src/index.css` (contains Tailwind directives)

4. Start the development server:
```bash
npm start
```

The app will run on `http://localhost:3000` by default.

## Features

- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Toggle between light and dark themes (persists in localStorage)
- **Session Management**: Create and switch between multiple chat sessions
- **Table Rendering**: Displays structured tabular data in responses
- **Message Feedback**: Like/Dislike buttons for assistant messages
- **Real-time Updates**: Messages appear immediately after sending

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/
│   │   └── api.js          # API wrapper functions
│   ├── components/
│   │   ├── Sidebar.js      # Session list sidebar
│   │   ├── ChatWindow.js   # Main chat interface
│   │   ├── ChatInput.js    # Message input component
│   │   ├── TableResponse.js # Table rendering component
│   │   ├── AnswerFeedback.js # Like/Dislike buttons
│   │   └── ThemeToggle.js  # Dark mode toggle
│   ├── App.js              # Main app component with routing
│   ├── index.js            # React entry point
│   └── index.css           # Global styles with Tailwind
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

## Environment Variables

You can set the API URL using an environment variable:

```bash
REACT_APP_API_URL=http://localhost:5000
```

By default, it uses `http://localhost:5000`.

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

