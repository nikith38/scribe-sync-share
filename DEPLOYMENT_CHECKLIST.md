# Deployment Checklist for Scribe Sync Share

## Pre-Deployment

- [x] Update server URL in frontend code
- [x] Create combined server.js file
- [x] Update package.json with render-build and render-start scripts
- [x] Add necessary dependencies to package.json
- [x] Configure server to serve static files from the dist directory
- [x] Create render.yaml configuration file

## Render Deployment Steps

1. Push your code to GitHub
2. Log in to your Render dashboard: https://dashboard.render.com/
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: scribe-sync-share
   - **Environment**: Node
   - **Region**: Choose closest to your users
   - **Branch**: main
   - **Build Command**: `npm run render-build`
   - **Start Command**: `npm run render-start`
   - **Plan**: Free
6. Click "Create Web Service"

## Post-Deployment

- [ ] Verify the application is working at https://scribe-sync-share.onrender.com
- [ ] Test document creation
- [ ] Test real-time collaboration between multiple users
- [ ] Test document sharing functionality
- [ ] Monitor server logs for any errors

## Troubleshooting

If you encounter issues:

1. Check Render logs for errors
2. Verify WebSocket connections are established
3. Check browser console for frontend errors
4. Ensure the server is correctly serving the static files

## Future Improvements

- Add persistent storage for documents
- Implement user authentication
- Add document access controls
- Improve conflict resolution for concurrent edits 