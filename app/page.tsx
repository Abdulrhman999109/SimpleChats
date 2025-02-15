"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const navigateToChat = () => {
    router.push("/chat");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-50">
      <h1 className="text-5xl font-extrabold text-yellow-300 mb-6 text-center">
        Welcome to QuickChats
      </h1>

      <p className="text-lg text-gray-300 text-center max-w-2xl mb-10 leading-relaxed">
        QuickChats is a real-time public chat platform where everyone connects in one shared room. 
        Just enter your username and start chatting instantly with others in real-time!
      </p>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center mb-10">
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">How It Works</h2>
        <ol className="list-decimal text-left text-gray-300 text-base space-y-2">
          <li>
            <span className="font-semibold">Enter Your Username:</span> This will be your display name in the public chat room.
          </li>
          <li>
            <span className="font-semibold">Join the Chat:</span> Once you enter your username, you’ll be connected to the public chat room.
          </li>
          <li>
            <span className="font-semibold">Start Chatting:</span> Send and receive messages instantly in the shared room with everyone.
          </li>
        </ol>
      </div>

      <button
        onClick={navigateToChat}
        className="px-8 py-4 bg-yellow-300 text-gray-900 rounded-md hover:bg-yellow-400 transition-all text-lg font-bold shadow-md"
      >
        Start Chatting
      </button>
    </div>
  );
}
