# Deployment Guide

This guide covers deploying the chat app to production.

## Deployment Options

### Recommended: Vercel (Frontend) + Render (Backend)

**Frontend**: Vercel (Free, excellent for React)  
**Backend**: Render (Free tier available)

---

## Backend Deployment (Render)

### Step 1: Prepare Backend for Deployment

1. **Create `render.yaml`** (optional, for Render dashboard deployment):
```yaml
services:
  - type: web
    name: chat-app-backend
    env: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
```

### Step 2: Deploy to Render

1. Go to [Render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `chat-app-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Add Environment Variables:
   - `NODE_ENV=production`
   - `PORT=10000` (Render provides this automatically)
6. Click **"Create Web Service"**
7. Wait for deployment (2-3 minutes)
8. Copy your backend URL (e.g., `https://chat-app-backend.onrender.com`)

### Alternative: Railway

1. Go to [Railway.app](https://railway.app) and sign up
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Add service → Select `backend` folder
5. Railway auto-detects Node.js
6. Add environment variable: `NODE_ENV=production`
7. Deploy
8. Copy your backend URL

---

## Frontend Deployment (Vercel)

### Step 1: Update API URL

Before deploying, you'll need to set the backend URL as an environment variable.

### Step 2: Deploy to Vercel

#### Option A: Via Vercel Dashboard

1. Go to [Vercel.com](https://vercel.com) and sign up/login with GitHub
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Add Environment Variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your backend URL (e.g., `https://chat-app-backend.onrender.com`)
6. Click **"Deploy"**
7. Wait for deployment (1-2 minutes)
8. Your app will be live at `https://your-project.vercel.app`

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Set environment variable
vercel env add REACT_APP_API_URL
# Enter your backend URL when prompted

# Redeploy with environment variable
vercel --prod
```

### Alternative: Netlify

1. Go to [Netlify.com](https://netlify.com) and sign up
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect GitHub repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Add Environment Variable:
   - `REACT_APP_API_URL` = Your backend URL
6. Click **"Deploy site"**

---

## Quick Deploy Script

Create a `vercel.json` in the frontend folder for easier deployment:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## Environment Variables

### Backend (Render/Railway)
- `NODE_ENV=production`
- `PORT` (automatically set by platform)

### Frontend (Vercel/Netlify)
- `REACT_APP_API_URL` = Your backend URL (e.g., `https://chat-app-backend.onrender.com`)

---

## Post-Deployment Checklist

- [ ] Backend is accessible (test API endpoint)
- [ ] Frontend environment variable is set correctly
- [ ] CORS is working (backend allows frontend domain)
- [ ] Test creating a new chat session
- [ ] Test sending messages
- [ ] Test deleting sessions
- [ ] Test theme toggle
- [ ] Test user popup

---

## Troubleshooting

### CORS Issues
If you get CORS errors, update `backend/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000']
}));
```

### Backend Not Responding
- Check Render/Railway logs
- Verify `PORT` environment variable
- Ensure `npm start` command works locally

### Frontend Can't Connect to Backend
- Verify `REACT_APP_API_URL` is set correctly
- Check backend URL is accessible
- Ensure CORS is configured properly

---

## Free Tier Limits

**Render**:
- Free tier: Spins down after 15 minutes of inactivity
- First request after spin-down may take 30-60 seconds

**Vercel**:
- Free tier: Unlimited deployments
- 100GB bandwidth/month
- No spin-down

**Railway**:
- Free tier: $5 credit/month
- Auto-scales

---

## Production Tips

1. **Use Environment Variables**: Never hardcode URLs
2. **Enable HTTPS**: All platforms provide this automatically
3. **Monitor Logs**: Check deployment logs regularly
4. **Set Up Custom Domain**: Add your domain in platform settings
5. **Database**: Consider upgrading to a real database (MongoDB Atlas, PostgreSQL) for production

