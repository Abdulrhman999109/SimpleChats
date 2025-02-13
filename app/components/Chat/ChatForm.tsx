"use client";
import React, { useState } from "react";

export default function ChatForm({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg shadow-md"
    >
      <input
        type="text"
        className="flex-1 px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring focus:ring-yellow-300 bg-gray-700 text-gray-200"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        type="submit"
        className="px-6 py-2 bg-yellow-300 text-gray-900 font-bold rounded-lg shadow hover:bg-yellow-400 transition-all focus:ring focus:ring-yellow-300"
      >
        Send
      </button>
    </form>
  );
}
