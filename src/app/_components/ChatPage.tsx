import React, { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./chatheader";
import { ChatMessage } from "./chatmessage";
import { ChatMessageProps } from "./chatmessage/ChatMessage";
import { ChatInput } from "./chatinput";
import ChatDisplayProps from "./chatdisplay/ChatDisplay";

export interface ChatPageProps {
  chatMessageProps: ChatMessageProps[];
}

const ChatPage: React.FC<ChatPageProps> = ({ chatMessageProps }) => {
  const [newMessage, setNewMessage] = useState<string>("");
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [messages, setMessages] = useState<any[]>([]);
  const endOfChatRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the end of the chat
  const scrollToBottom = () => {
    if (endOfChatRef.current) {
      // Check if ref is not null before accessing current
      endOfChatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle sending a new message
  const handleSendMessage = (message: string) => {
    // Add the new message to the messages state
    setMessages([
      ...messages,
      { message, timestamp: new Date().toLocaleTimeString() },
    ]);
    // Clear the input field after sending the message
    setNewMessage("");
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800">
      {/* Header Container */}
      <div className="sticky top-0 z-10">
        <ChatHeader />
      </div>

      {/* Chat Display */}
      <div
        className="flex-1 overflow-y-auto px-4 py-8 space-y-4 bg-blue-100 dark:bg-blue-800"
        style={{ paddingBottom: "6rem" }} // Add bottom padding to create buffer space
      >
        {/* Render replies */}
        {chatMessageProps.map((reply, index) => (
          <ChatMessage key={`reply-${index}`} {...reply} />
        ))}
        {/* Render ChatDisplayProps */}
        {messages.map((msg, index) => (
          <ChatDisplayProps
            key={`message-${index}`}
            username="User 1"
            message={msg.message}
            userImage="https://i.ibb.co/gvynGqz/clipart1363971.png"
            timestamp={msg.timestamp}
          />
        ))}
        {/* Dummy div to ensure scrolling to the bottom */}
        <div ref={endOfChatRef} />
      </div>

      {/* Chat Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
    </div>
  );
};

export default ChatPage;
