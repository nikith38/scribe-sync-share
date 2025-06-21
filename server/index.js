const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// Document storage (in-memory)
const documents = {};

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // For development
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  let currentDocId;
  
  // Join document room
  socket.on('join-document', ({ documentId, username }) => {
    currentDocId = documentId;
    
    // Create document if it doesn't exist
    if (!documents[documentId]) {
      documents[documentId] = {
        content: '<p>Start typing your document...</p>',
        title: 'Untitled Document',
        users: []
      };
    }
    
    // Add user to document with random color
    const colors = ['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const initials = username.substring(0, 2).toUpperCase();
    
    const user = { id: socket.id, name: username, color: randomColor, initials };
    documents[documentId].users.push(user);
    
    // Join the room
    socket.join(documentId);
    
    // Send document to the new user
    socket.emit('load-document', documents[documentId]);
    
    // Broadcast updated users list
    io.to(documentId).emit('users-changed', documents[documentId].users);
  });
  
  // Handle content changes
  socket.on('content-change', (content) => {
    if (currentDocId) {
      documents[currentDocId].content = content;
      socket.to(currentDocId).emit('receive-content-change', content);
    }
  });
  
  // Handle title changes
  socket.on('title-change', (title) => {
    if (currentDocId) {
      documents[currentDocId].title = title;
      socket.to(currentDocId).emit('receive-title-change', title);
    }
  });
  
  // Handle disconnect
  socket.on('disconnect', () => {
    if (currentDocId && documents[currentDocId]) {
      // Remove user from document
      documents[currentDocId].users = documents[currentDocId].users.filter(user => user.id !== socket.id);
      
      // Broadcast updated users list
      io.to(currentDocId).emit('users-changed', documents[currentDocId].users);
      
      console.log('User disconnected:', socket.id);
    }
  });
});

// Create new document endpoint
app.get('/api/create-document', (req, res) => {
  const documentId = Math.random().toString(36).substring(2, 10);
  documents[documentId] = {
    content: '<p>Start typing your document...</p>',
    title: 'Untitled Document',
    users: []
  };
  res.json({ documentId });
});

// Start server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 