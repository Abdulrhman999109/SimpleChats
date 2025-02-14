interface ChatMessageProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
}

export default function ChatMessage({ sender, message, isOwnMessage }: ChatMessageProps) {
  return (
    <div
      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`max-w-xs p-3 rounded-lg shadow-md text-sm text-gray-50 ${
          isOwnMessage ? "bg-yellow-500 text-gray-900" : "bg-gray-700"
        }`}
      >
        <span className="block font-bold mb-1">{sender}</span>
        <span>{message}</span>
      </div>
    </div>
  );
}
