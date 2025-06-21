# Deployment Guide for Scribe Sync Share

This guide explains how to deploy the Scribe Sync Share collaborative editor to Render as a single web service.

## Deployment URL

The application will be deployed at:
**https://scribe-sync-share.onrender.com**

## Deployment Steps

### 1. Push Your Code to GitHub

Make sure your code is committed and pushed to a GitHub repository.

### 2. Sign Up for Render

If you don't already have a Render account:
1. Go to [render.com](https://render.com)
2. Sign up for a new account

### 3. Deploy to Render

#### Option 1: Using the Dashboard (Recommended)

1. Log in to your Render dashboard
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Fill in these settings:
   - **Name**: scribe-sync-share
   - **Environment**: Node
   - **Region**: Choose the one closest to you
   - **Branch**: main (or your default branch)
   - **Build Command**: `npm run render-build`
   - **Start Command**: `npm run render-start`
   - **Plan**: Free

5. Click "Create Web Service"

### 4. Access Your Application

Once the deployment is complete, your application will be available at:
**https://scribe-sync-share.onrender.com**

## How It Works

This deployment uses a combined approach where:

1. The frontend (React) is built during the deployment process
2. The server serves both the API endpoints and the static frontend files
3. WebSocket connections work seamlessly without additional configuration

## Troubleshooting

If you encounter any issues:

- Check the Render logs for errors
- Ensure all dependencies are correctly listed in package.json
- Verify that your server.js file is set up correctly to serve both API and static files

## Local Development

To run the application locally:

```bash
# Install dependencies
npm install

# Run both client and server
npm start
``` 