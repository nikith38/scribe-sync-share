
import React, { useState } from 'react';
import { Users, Share2, Settings } from 'lucide-react';

interface DocumentHeaderProps {
  title: string;
  setTitle: (title: string) => void;
}

const DocumentHeader = ({ title, setTitle }: DocumentHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);

  const handleTitleSubmit = () => {
    setTitle(tempTitle);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    }
    if (e.key === 'Escape') {
      setTempTitle(title);
      setIsEditing(false);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            
            {isEditing ? (
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={handleTitleSubmit}
                onKeyDown={handleKeyPress}
                className="text-lg font-medium text-gray-800 bg-transparent border-b border-blue-500 outline-none px-1"
                autoFocus
              />
            ) : (
              <h1
                className="text-lg font-medium text-gray-800 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded transition-colors"
                onClick={() => setIsEditing(true)}
              >
                {title}
              </h1>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Collaboration indicators */}
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">JD</span>
              </div>
              <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs font-bold">AS</span>
              </div>
            </div>
            <Users className="w-5 h-5 text-gray-500" />
          </div>

          {/* Action buttons */}
          <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default DocumentHeader;
