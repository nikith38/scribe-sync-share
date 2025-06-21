import React, { useState } from 'react';
import { Users, Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface User {
  id: string;
  name: string;
  color: string;
  initials: string;
}

interface DocumentHeaderProps {
  title: string;
  setTitle: (title: string) => void;
  documentId: string;
  shareLink: string;
  collaborators: User[];
}

const DocumentHeader = ({ title, setTitle, documentId, shareLink, collaborators }: DocumentHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [copied, setCopied] = useState(false);

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

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          
          <div className="text-sm text-gray-500">
            ID: {documentId.slice(0, 6)}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Collaborator avatars */}
          {collaborators.length > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {collaborators.slice(0, 3).map((user) => (
                      <div 
                        key={user.id} 
                        className={`w-8 h-8 ${user.color} rounded-full border-2 border-white flex items-center justify-center`}
                      >
                        <span className="text-white text-xs font-bold">{user.initials}</span>
                      </div>
                    ))}
                    {collaborators.length > 3 && (
                      <div className="w-8 h-8 bg-gray-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-white text-xs font-bold">+{collaborators.length - 3}</span>
                      </div>
                    )}
                  </div>
                  <Users className="w-5 h-5 text-gray-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2">
                  <p className="font-semibold">Collaborators:</p>
                  <ul className="mt-1">
                    {collaborators.map(user => (
                      <li key={user.id}>{user.name}</li>
                    ))}
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          )}

          {/* Share button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Share this document</DialogTitle>
              </DialogHeader>
              <p className="text-sm text-gray-500">
                Share this link with others to collaborate in real-time
              </p>
              <div className="flex items-center space-x-2 mt-4">
                <Input readOnly value={shareLink} />
                <Button onClick={copyShareLink}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default DocumentHeader;
