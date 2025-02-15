"use client";

import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import ChatForm from "../components/Chat/ChatForm";
import ChatMessage from "../components/Chat/ChatMessage";

interface Message {
  id: number;
  content: string;
  created_at: string;
  users: {
    username: string;
  };
}

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const createUser = async () => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
        return;
      }

      const username = prompt("Enter your username:");
      if (!username) return;

      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("username", username)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error fetching user:", fetchError);
        return;
      }

      if (existingUser) {
        alert(`Welcome back, ${existingUser.username}!`);
        setUserId(existingUser.id);
        localStorage.setItem("userId", existingUser.id);
      } else {
        const { data: newUser, error: insertError } = await supabase
          .from("users")
          .insert([{ username }])
          .select()
          .single();

        if (insertError) {
          console.error("Error creating user:", insertError);
          return;
        }

        alert(`Welcome, ${newUser.username}!`);
        setUserId(newUser.id);
        localStorage.setItem("userId", newUser.id);
      }
    };

    createUser();
  }, []);

  useEffect(() => {
    fetchMessages();

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload: { new: any }) => {
          const newMessage = payload.new;

          const isDuplicate = messages.some((msg) => msg.id === newMessage.id);
          if (isDuplicate) return;

          const { data: userData, error } = await supabase
            .from("users")
            .select("username")
            .eq("id", newMessage.user_id)
            .single();

          if (error) {
            console.error("Error fetching user for new message:", error);
            return;
          }

          const formattedMessage = {
            id: newMessage.id,
            content: newMessage.content,
            created_at: newMessage.created_at,
            users: {
              username: userData?.username || "Unknown User",
            },
          };

          setMessages((prevMessages) => [...prevMessages, formattedMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select(`
        id,
        content,
        created_at,
        users (
          username
        )
      `)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching messages:", error);
      return;
    }

    if (data) {
      const formattedMessages = data.map((msg) => ({
        id: msg.id,
        content: msg.content,
        created_at: msg.created_at,
        users: Array.isArray(msg.users) ? msg.users[0] : msg.users,
      }));
      setMessages(formattedMessages as Message[]);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Chat Room</h1>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="messages-container max-h-96 overflow-y-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>
      </div>
      <div className="w-full max-w-3xl">
        <ChatForm userId={userId} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default ChatPage;
