# Deployment Guide - Personality Analyser

## Current Issue
Your GitHub Pages site shows "Backend not reachable" because GitHub Pages only hosts static files (HTML, CSS, JS), not Node.js servers.

---

## Solution: Deploy Backend Separately

### Option 1: Render.com (Recommended - Free Tier)

#### Step 1: Prepare Backend for Deployment

1. **Update MongoDB Connection String**
   
   You'll need to use MongoDB Atlas (free cloud database) instead of local MongoDB Compass.
   
   Sign up at: https://www.mongodb.com/cloud/atlas/register
   
   After creating a cluster, get your connection string and update `backend/config/db.js`:
   ```javascript
   const conn = await mongoose.connect(process.env.MONGODB_URI || 'your-mongodb-atlas-connection-string');
   ```

2. **Create `.env` file in backend folder**
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   PORT=5000
   ```

3. **Update `backend/package.json`** - Add start script:
   ```json
   {
     "scripts": {
       "start": "node server.js"
     }
   }
   ```

4. **Create `.gitignore` in backend folder**
   ```
   node_modules/
   .env
   ```

#### Step 2: Deploy to Render

1. Go to https://render.com and sign up (use GitHub account)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: personality-analyser-api
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - Click "Environment" tab
   - Add `MONGODB_URI` with your MongoDB Atlas connection string

6. Click "Create Web Service"

7. Copy your backend URL (e.g., `https://personality-analyser-api.onrender.com`)

#### Step 3: Update Frontend API URLs

Update all API calls in your frontend JavaScript files to use your Render backend URL:

**Files to update:**
- `frontend/js/auth.js`
- `frontend/js/register.js`
- `frontend/js/test.js`
- `frontend/js/dashboard.js`

**Change from:**
```javascript
fetch("http://localhost:5000/api/auth/login", ...)
```

**Change to:**
```javascript
fetch("https://your-render-app.onrender.com/api/auth/login", ...)
```

#### Step 4: Update CORS in Backend

Update `backend/server.js` to allow your GitHub Pages domain:
```javascript
app.use(cors({
  origin: ['https://sarannagasai.github.io', 'http://localhost:3000'],
  credentials: true
}));
```

#### Step 5: Push Changes
```bash
git add .
git commit -m "Configure for production deployment"
git push origin main
```

Render will automatically redeploy when you push to GitHub!

---

### Option 2: Railway.app (Alternative)

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add MongoDB Atlas connection string as environment variable
6. Railway will auto-detect Node.js and deploy

---

### Option 3: Vercel (For Backend)

1. Install Vercel CLI: `npm install -g vercel`
2. In backend folder: `vercel`
3. Follow prompts
4. Add MongoDB Atlas connection in Vercel dashboard

---

## MongoDB Atlas Setup (Required for All Options)

### Step 1: Create Free MongoDB Atlas Cluster

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create a free M0 cluster (512MB)
4. Choose a cloud provider and region (closest to you)

### Step 2: Configure Database Access

1. Database Access → Add New Database User
2. Create username and password (save these!)
3. Set privileges to "Read and write to any database"

### Step 3: Configure Network Access

1. Network Access → Add IP Address
2. Click "Allow Access from Anywhere" (0.0.0.0/0)
3. Confirm

### Step 4: Get Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `personality-analyser`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/personality-analyser?retryWrites=true&w=majority
```

---

## Quick Setup Script

Create this file as `backend/.env.example`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/personality-analyser
PORT=5000
NODE_ENV=production
```

Then copy to `.env` and fill in your actual values.

---

## Testing Your Deployment

1. **Test Backend API**: Visit `https://your-backend-url.onrender.com/api/test/stats`
   - Should return JSON with test statistics

2. **Test Frontend**: Visit your GitHub Pages site
   - Register a new user
   - Login
   - Take the test
   - View dashboard

---

## Environment Variables Summary

**Backend (.env file):**
```
MONGODB_URI=your-mongodb-atlas-connection-string
PORT=5000
NODE_ENV=production
```

**Frontend (hardcoded in JS files):**
```javascript
const API_URL = "https://your-backend-url.onrender.com";
```

---

## Troubleshooting

### Issue: "Backend not reachable"
- Check if backend is running on Render
- Verify API URL in frontend files is correct
- Check CORS settings in backend

### Issue: "MongoDB connection failed"
- Verify MongoDB Atlas connection string
- Check IP whitelist (should be 0.0.0.0/0)
- Verify database user credentials

### Issue: "CORS error"
- Add your GitHub Pages URL to CORS whitelist in backend
- Ensure credentials are properly configured

---

## Cost Summary

- **MongoDB Atlas**: Free (M0 cluster - 512MB)
- **Render.com**: Free tier (spins down after inactivity, cold starts)
- **GitHub Pages**: Free (static hosting)

**Total Cost: $0/month** ✅

---

## Next Steps

1. Set up MongoDB Atlas
2. Deploy backend to Render
3. Update frontend API URLs
4. Test the complete application
5. Share your live link!
