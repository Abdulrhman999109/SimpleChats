"use client";

import ChatForm from "../components/Chat/ChatForm";
import ChatMessage from "../components/Chat/ChatMessage";
import { useEffect, useState } from "react";
import { socket } from "../../lib/sicketClient";

export default function ChatPage() {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState<{ sender: string; message: string }[]>([]);
  const [userName, setUserName] = useState("");
  const [users, setUsers] = useState<string[]>([]);

  const handleSubmit = (message: string) => {
    const data = { room, message, sender: userName };
    setMessage((prev) => [...prev, { sender: userName, message }]);
    socket.emit("message", data);
  };

  useEffect(() => {
    socket.on("message", (data) => {
      setMessage((prev) => [...prev, data]);
    });

    socket.on("user_joined", (message) => {
      setMessage((prev) => [...prev, { sender: "system", message }]);
    });

    socket.on("user_list", (userList) => {
      setUsers(userList);
    });

    socket.on("error", (errorMessage) => {
      alert(errorMessage);
    });

    return () => {
      socket.off("user_joined");
      socket.off("message");
      socket.off("user_list");
      socket.off("error");
    };
  }, []);

  const handleJoinRoom = () => {
    if (!userName || !room) {
      alert("Please enter both username and room.");
      return;
    }
    socket.emit("join-room", { room, username: userName });
    setJoined(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {!joined ? (
        <div className="flex flex-col items-center space-y-6 bg-yellow-50 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900">Enter Username & Room</h2>
          <div className="space-y-4 w-full">
            <input
              type="text"
              placeholder="Username"
              className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-200 text-black"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room Number"
              className="p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring focus:ring-yellow-200 text-black"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </div>
          <button
            onClick={handleJoinRoom}
            className="px-6 py-2 bg-yellow-300 text-gray-900 rounded-md hover:bg-yellow-400 transition-all"
          >
            Join Room
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="mb-4 text-3xl font-bold text-yellow-300">Room: {room}</h1>
          <div className="mb-4">
            <h3 className="font-bold text-yellow-200">Users in Room:</h3>
            <ul className="list-disc ml-6 text-gray-300">
              {users.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
          <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-700 border border-gray-600 rounded-lg">
            {message.map((msg, index) => (
              <ChatMessage key={index} sender={msg.sender} message={msg.message} isOwnMessage={msg.sender === userName} />
            ))}
          </div>
          <ChatForm onSendMessage={handleSubmit} />
        </div>
      )}
    </div>
  );
}
