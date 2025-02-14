'use client'
import { useState } from "react";
interface ChatFormProps {
  onSendMessage: (message: string) => void;
}

export default function ChatForm({ onSendMessage }: ChatFormProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow p-3 border border-gray-600 rounded-l bg-gray-700 text-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <button
        type="submit"
        className="p-3 bg-yellow-400 text-gray-900 rounded-r font-bold hover:bg-yellow-500 transition-all shadow-md"
      >
        Send
      </button>
    </form>
  );
}
