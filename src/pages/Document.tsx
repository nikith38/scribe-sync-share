import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DocumentEditor from "@/components/DocumentEditor";

const Document = () => {
  const { id } = useParams<{ id: string }>();

  // Check if user has a name
  useEffect(() => {
    let username = localStorage.getItem("username");
    if (!username) {
      username = prompt("Enter your name to join this document") || "Anonymous";
      localStorage.setItem("username", username);
    }
  }, []);

  return <DocumentEditor documentId={id || ""} />;
};

export default Document; 