"use client";

import React, { useState } from "react";
import supabase from "../../supabaseClient";

const ChatForm = ({
  userId,
  setMessages,
}: {
  userId: string;
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    if (!message.trim()) return;

    const { error } = await supabase
      .from("messages")
      .insert([{ content: message, user_id: userId }]);

    if (error) {
      console.error("Error sending message:", error);
      return;
    }

    setMessage("");
  };

  return (
    <div className="mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="w-full p-3 text-black border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
      />
      <button
        onClick={sendMessage}
        className="w-full bg-gray-900 text-yellow-50 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all"
      >
        Send
      </button>
    </div>
  );
};

export default ChatForm;
