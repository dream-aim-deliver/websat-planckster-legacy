import React, { useState, useEffect } from "react";

export interface ChatMessageProps {
  senderName: string;
  senderImage: string;
  message: string;
  sentTime: string;
  isDelivered?: boolean; // prop for delivered status
  repliedToId?: string; // prop for ID of replied-to message
  role?: "user" | "llm"; // prop for specifying alignment
}

export interface Message {
  senderName: string;
  senderImage: string;
  message: string;
  sentTime: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  senderName,
  senderImage,
  message,
  sentTime,
  isDelivered,
  repliedToId,
  role = "user", // default to "user" role if not specified
}) => {
  const [repliedToMessage, setRepliedToMessage] = useState<Message | null>(
    null,
  );

  // Fetch replied-to message details (when backend connected)
  useEffect(() => {
    const fetchRepliedToMessage = async () => {
      if (!repliedToId) return; // Exit if no repliedToId provided

      try {
        const response = await fetch(`/api/messages/${repliedToId}`);
        if (response.ok) {
          const data = await response.json();
          setRepliedToMessage(data);
        } else {
          console.error("Failed to fetch replied-to message:", response.status);
        }
      } catch (error) {
        console.error("Error fetching replied-to message:", error);
      }
    };
    fetchRepliedToMessage();
  }, [repliedToId]);

  // Determine container alignment class based on role prop
  const containerClass =
    role === "user"
      ? "items-end gap-2.5 justify-end" // Align right for user
      : "items-start gap-2.5 justify-start"; // Align left for llm

  // Determine message container background color based on role prop
  const messageContainerClass =
    "bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700 border border-gray-200"; // Use same background color for both roles

  return (
    <div className={`flex ${containerClass}`}>
      {role === "llm" && (
        <img
          className="w-8 h-8 rounded-full"
          src={senderImage}
          alt={`${senderName} image`}
        />
      )}
      <div className="relative">
        <div
          className={`flex flex-col max-w-[320px] leading-1.5 p-4 border-gray-200 ${messageContainerClass}`}
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {senderName}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {sentTime}
            </span>
          </div>
          {repliedToId && repliedToMessage && (
            <ReplyReference repliedToMessage={repliedToMessage} />
          )}
          <p
            className="text-sm font-normal py-2.5 text-gray-900 dark:text-white"
            style={{ wordWrap: "break-word" }}
          >
            {message}
          </p>
          {isDelivered && (
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Delivered
            </span>
          )}
        </div>
      </div>
      {role === "user" && (
        <img
          className="w-8 h-8 rounded-full"
          src={senderImage}
          alt={`${senderName} image`}
        />
      )}
    </div>
  );
};

const ReplyReference: React.FC<{ repliedToMessage: Message }> = ({
  repliedToMessage,
}) => {
  return (
    <div className="flex items-start gap-2.5 bg-gray-200 dark:bg-gray-800 p-2.5 rounded-md mt-2">
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          In reply to
        </span>
        <img
          className="w-5 h-5 rounded-full"
          src={repliedToMessage.senderImage}
          alt={`${repliedToMessage.senderName} image`}
        />
        <span className="text-xs font-semibold text-gray-900 dark:text-white">
          {repliedToMessage.senderName}
        </span>
      </div>
      <p className="text-sm font-normal text-gray-700 dark:text-gray-300">
        {repliedToMessage.message}
      </p>
    </div>
  );
};

export default ChatMessage;
