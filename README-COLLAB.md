# Real-time Collaborative Editor with WebSockets

This project demonstrates a real-time collaborative document editor using WebSockets. Multiple users can edit the same document simultaneously and see each other's changes in real time.

## Features

- Real-time collaborative text editing
- Multiple users can edit the same document
- Format text with bold, italic, lists, and more
- Share documents via links
- See who's editing a document in real time

## How to Run Locally

1. Install dependencies:
```bash
npm install
```

2. Start both the client and server:

**On Windows:**
```bash
npm start
```
or directly run:
```bash
start.bat
```

**On macOS/Linux:**
```bash
# Start the server
cd server && npm start
# In another terminal
npm run dev
```

This will start:
- The Vite development server at http://localhost:8080
- The WebSocket server at http://localhost:3001

## How to Use

1. Open the app in your browser at http://localhost:8080
2. Enter your name and either:
   - Create a new document
   - Enter a document ID to join an existing document
3. Share the URL with others to collaborate in real time
4. Format text using the toolbar options

## Deployment

### Client (Frontend)

Deploy the client to any static hosting provider like Vercel, Netlify, or GitHub Pages.

### Server (Backend)

The WebSocket server can be deployed to Render:

1. Push your code to a GitHub repository
2. Create a new Web Service on Render
3. Connect to your repository
4. Set the following options:
   - Build Command: `npm install`
   - Start Command: `npm run server`
5. After deployment, update the `SERVER_URL` in the frontend code to point to your Render URL.

## Technical Implementation

- **Frontend**: React, TypeScript, TailwindCSS, Socket.io Client
- **Backend**: Express, Socket.io
- **Real-time Communication**: WebSockets via Socket.io
- **Document Editing**: contentEditable with execCommand 