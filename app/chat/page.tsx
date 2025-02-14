"use client";

import { useEffect, useState } from "react";
import ChatForm from "../components//Chat/ChatForm";
import ChatMessage from "../components/Chat/ChatMessage";

export default function ChatPage() {
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState<string[]>([]);
  const [messages, setMessages] = useState<{ sender: string; message: string }[]>([]);

  useEffect(() => {
    if (joined) {
      const eventSource = new EventSource(`/api/server?room=${room}`);
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setUsers(data.users);
        setMessages(data.messages);
      };

      return () => eventSource.close();
    }
  }, [joined]);

  const joinRoom = async () => {
    const response = await fetch("/api/server", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "join",
        data: { room, username: userName },
      }),
    });

    if (response.ok) {
      setJoined(true);
      setMessages((prev) => [
        ...prev,
        { sender: "system", message: `${userName} has joined the room.` },
      ]);
    }
  };

  const sendMessage = async (message: string) => {
    await fetch("/api/server", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "message",
        data: { room, username: userName, message },
      }),
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-gray-50">
      {!joined ? (
        <div className="flex flex-col space-y-4 bg-gray-800 p-8 rounded-lg shadow-2xl">
          <h2 className="text-3xl font-bold text-yellow-300 mb-4">Join a Room</h2>
          <input
            type="text"
            placeholder="Room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full p-3 border border-gray-600 rounded bg-gray-700 text-gray-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            onClick={joinRoom}
            className="w-full p-3 bg-yellow-400 text-gray-900 rounded font-bold hover:bg-yellow-500 transition-all shadow-md"
          >
            Join
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl flex flex-col space-y-6">
          <h1 className="text-4xl font-extrabold text-yellow-300 text-center">Room: {room}</h1>
          <div className="p-6 bg-gray-800 rounded shadow-md">
            <h2 className="text-2xl font-bold text-yellow-300">Users in Room:</h2>
            <ul className="mt-4 space-y-2">
              {users.map((user, idx) => (
                <li key={idx} className="text-lg text-gray-200 bg-gray-700 p-2 rounded">{user}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 bg-gray-800 rounded shadow-md h-64 overflow-y-auto">
            {messages.map((msg, idx) => (
              <ChatMessage
                key={idx}
                sender={msg.sender}
                message={msg.message}
                isOwnMessage={msg.sender === userName}
              />
            ))}
          </div>
          <ChatForm onSendMessage={sendMessage} />
        </div>
      )}
    </div>
  );
}
