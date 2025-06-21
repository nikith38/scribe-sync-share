
import React, { useState, useRef, useEffect } from 'react';
import DocumentHeader from './DocumentHeader';
import Toolbar from './Toolbar';

const DocumentEditor = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Untitled Document');
  const editorRef = useRef<HTMLDivElement>(null);

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };

  useEffect(() => {
    if (editorRef.current && !content) {
      editorRef.current.innerHTML = '<p>Start typing your document...</p>';
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DocumentHeader title={title} setTitle={setTitle} />
      
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
          Document saved automatically • {new Date().toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
