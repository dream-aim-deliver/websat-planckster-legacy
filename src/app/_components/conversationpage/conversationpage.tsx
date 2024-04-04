import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/card";
import { Modal } from "@/components/modal";
import { Navbar } from "../navbar";

interface Conversation {
  id: number;
  title: string;
}

interface ConversationPageProps {
  convs: Conversation[];
  apiUrl: string;
  onAddConversationClick: () => void;
}

const ConversationPage: React.FC<ConversationPageProps> = ({
  convs,
  apiUrl,
  onAddConversationClick,
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch conversations from the backend when component mounts
    const fetchConversations = async () => {
      try {
        const response = await axios.get(apiUrl);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [apiUrl]);

  useEffect(() => {
    // Update conversations if convs prop changes
    setConversations(convs);
  }, [convs]);

  const addConversation = async (title: string) => {
    try {
      const response = await axios.post("/api/conversations", { title });
      const newConversation: Conversation = response.data;
      // Append the new conversation to the existing conversations array
      setConversations([...conversations, newConversation]);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding conversation:", error);
    }
  };

  return (
    <div className="conversation-page relative">
      <Navbar role="Conversations" />

      <div className="grid justify-center gap-4 mt-8">
        {conversations.map((conversation) => (
          <Card
            id={conversation.id}
            title={conversation.title}
            key={conversation.id}
            description=""
          />
        ))}
      </div>
      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        addConversation={addConversation}
      />
      <button
        onClick={() => {
          setShowModal(true);
          onAddConversationClick();
        }}
        className="fixed bottom-10 right-10 z-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        + New Conversation
      </button>
    </div>
  );
};

export default ConversationPage;
