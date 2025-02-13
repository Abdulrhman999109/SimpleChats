"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const navigateToChat = () => {
    router.push("/chat");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-50">
      {/* العنوان الرئيسي */}
      <h1 className="text-5xl font-extrabold text-yellow-300 mb-6 text-center">
        Welcome to ChatSphere
      </h1>

      {/* الوصف */}
      <p className="text-lg text-gray-300 text-center max-w-2xl mb-10 leading-relaxed">
        ChatSphere is a real-time chat platform where you can connect with others in shared rooms.
        Simply enter your username, choose a room, and start chatting instantly!
      </p>

      {/* شرح كيفية الاستخدام */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center mb-10">
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">How It Works</h2>
        <ol className="list-decimal text-left text-gray-300 text-base space-y-2">
          <li>
            <span className="font-semibold">Enter a Username:</span> This will be your display name in the chat room.
          </li>
          <li>
            <span className="font-semibold">Choose a Room Number:</span> You can join an existing room or create a new one.
          </li>
          <li>
            <span className="font-semibold">Start Chatting:</span> Communicate with others in real-time.
          </li>
        </ol>
      </div>

      {/* الزر */}
      <button
        onClick={navigateToChat}
        className="px-8 py-4 bg-yellow-300 text-gray-900 rounded-md hover:bg-yellow-400 transition-all text-lg font-bold shadow-md"
      >
        Start Chatting
      </button>

      {/* تصميم جمالي إضافي */}
      <div className="absolute bottom-4 right-4 text-yellow-300 text-sm">
        <p>Designed for simplicity and speed 🚀</p>
      </div>
    </div>
  );
}
