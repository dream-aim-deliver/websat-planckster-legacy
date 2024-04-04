import React from "react";

interface ChatDisplayProps {
  username: string;
  message: string;
  userImage: string;
  timestamp: string;
}

const ChatDisplayProps: React.FC<ChatDisplayProps> = ({
  username,
  message,
  userImage,
  timestamp,
}) => {
  return (
    <div className="bg-lightBlue-100 p-4 rounded-lg">
      {/* Background div */}
      <div className="flex items-end justify-end gap-2.5">
        <div className="flex flex-col gap-1 w-full max-w-[320px]">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {username}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {timestamp}
            </span>
          </div>
          <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
            <p className="text-sm font-normal text-gray-900 dark:text-white overflow-hidden overflow-ellipsis">
              {message}
            </p>
          </div>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Sent
          </span>
        </div>
        <img className="w-8 h-8 rounded-full" src={userImage} alt={username} />
      </div>
    </div>
  );
};

export default ChatDisplayProps;
