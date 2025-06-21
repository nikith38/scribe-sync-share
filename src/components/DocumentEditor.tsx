import React, { useState, useRef, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import DocumentHeader from './DocumentHeader';
import Toolbar from './Toolbar';
import { useToast } from '@/components/ui/use-toast';

// For development use localhost, for production use the Render URL
const SERVER_URL = import.meta.env.PROD 
  ? "https://scribe-sync-share.onrender.com" 
  : "http://localhost:3001";

interface User {
  id: string;
  name: string;
  color: string;
  initials: string;
}

interface DocumentEditorProps {
  documentId: string;
}

const DocumentEditor: React.FC<DocumentEditorProps> = ({ documentId }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Untitled Document');
  const [collaborators, setCollaborators] = useState<User[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Connect to WebSocket server on mount
  useEffect(() => {
    const username = localStorage.getItem("username") || "Anonymous";
    const newSocket = io(SERVER_URL);
    
    newSocket.on('connect', () => {
      console.log('Connected to server');
      
      // Join document room
      newSocket.emit('join-document', {
        documentId,
        username
      });
    });
    
    // Load initial document data
    newSocket.on('load-document', (document) => {
      if (editorRef.current) {
        editorRef.current.innerHTML = document.content;
      }
      setTitle(document.title);
      setContent(document.content);
    });
    
    // Listen for content changes from other users
    newSocket.on('receive-content-change', (newContent) => {
      if (editorRef.current && editorRef.current.innerHTML !== newContent) {
        editorRef.current.innerHTML = newContent;
        setContent(newContent);
      }
    });
    
    // Listen for title changes from other users
    newSocket.on('receive-title-change', (newTitle) => {
      setTitle(newTitle);
    });
    
    // Update collaborators list when users change
    newSocket.on('users-changed', (users) => {
      setCollaborators(users);
      toast({
        title: "Collaboration update",
        description: `${users.length} ${users.length === 1 ? 'person' : 'people'} currently editing`,
      });
    });
    
    setSocket(newSocket);
    
    // Cleanup on unmount
    return () => {
      newSocket.disconnect();
    };
  }, [documentId, toast]);
  
  // Throttle function to limit update frequency
  const throttle = useCallback((callback: Function, delay: number) => {
    let previousCall = 0;
    return (...args: any[]) => {
      const now = Date.now();
      if (now - previousCall > delay) {
        previousCall = now;
        callback(...args);
      }
    };
  }, []);
  
  // Send content changes to server (throttled)
  const sendContentChange = useCallback(
    throttle((newContent: string) => {
      if (socket) {
        socket.emit('content-change', newContent);
      }
    }, 50),
    [socket, throttle]
  );
  
  // Handle content changes
  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setContent(newContent);
      sendContentChange(newContent);
    }
  };
  
  // Handle title changes
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    if (socket) {
      socket.emit('title-change', newTitle);
    }
  };
  
  // Apply formatting commands
  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
      handleContentChange();
    }
  };
  
  // Set initial content if empty
  useEffect(() => {
    if (editorRef.current && !content) {
      editorRef.current.innerHTML = '<p>Start typing your document...</p>';
    }
  }, []);
  
  // Generate a share link for the document
  const getShareLink = () => {
    return `${window.location.origin}/document/${documentId}`;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <DocumentHeader 
        title={title} 
        setTitle={handleTitleChange} 
        documentId={documentId}
        shareLink={getShareLink()}
        collaborators={collaborators}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Toolbar onCommand={handleCommand} />
          
          <div className="p-8">
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning={true}
              onInput={handleContentChange}
              className="min-h-[600px] outline-none text-gray-800 leading-relaxed"
              style={{
                fontSize: '16px',
                lineHeight: '1.6',
                fontFamily: 'system-ui, -apple-system, sans-serif'
              }}
            />
          </div>
        </div>
        
        {/* Status bar */}
        <div className="mt-4 text-sm text-gray-500 text-center">
          {collaborators.length} {collaborators.length === 1 ? 'person' : 'people'} currently editing • Document ID: {documentId}
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
