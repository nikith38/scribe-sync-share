import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

// For development use localhost, for production use the Render URL
const SERVER_URL = import.meta.env.PROD 
  ? "https://scribe-sync-share.onrender.com" 
  : "http://localhost:3001";

const Index = () => {
  const [username, setUsername] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const createDocument = async () => {
    if (!username) {
      alert("Please enter your name");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`${SERVER_URL}/api/create-document`);
      const data = await response.json();
      
      // Save username to localStorage
      localStorage.setItem("username", username);
      
      // Navigate to document page
      navigate(`/document/${data.documentId}`);
    } catch (error) {
      console.error("Error creating document:", error);
      alert("Failed to create document. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const joinDocument = () => {
    if (!username) {
      alert("Please enter your name");
      return;
    }
    
    if (!documentId) {
      alert("Please enter a document ID");
      return;
    }
    
    // Save username to localStorage
    localStorage.setItem("username", username);
    
    // Navigate to document page
    navigate(`/document/${documentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Scribe Sync Share</CardTitle>
          <p className="text-gray-500">Real-time collaborative document editor</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">Your Name</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="mt-1"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium">Document ID (Optional)</label>
            <Input
              value={documentId}
              onChange={(e) => setDocumentId(e.target.value)}
              placeholder="Enter document ID to join"
              className="mt-1"
            />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button onClick={createDocument} disabled={isLoading || !username}>
            {isLoading ? "Creating..." : "Create New Document"}
          </Button>
          <Button variant="outline" onClick={joinDocument} disabled={!documentId || !username || isLoading}>
            Join Document
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
