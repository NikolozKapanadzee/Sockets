"use client";

import socket from "@/config/socket";
import { FormEvent, useEffect, useState } from "react";
import Chat from "@/components/Chat";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("joinRoom", { roomId, userEmail });
    setShowChat(true);
  };
  return (
    <div>
      {showChat ? (
        <Chat roomId={roomId} userEmail={userEmail} />
      ) : (
        <>
          <form
            className="mt-10 max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md space-y-4"
            onSubmit={handleJoinRoom}
          >
            <input
              type="text"
              placeholder="RommId"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-white"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="UserEmail"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-white"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 font-semibold shadow-sm">
              Join Room
            </button>
          </form>
        </>
      )}
    </div>
  );
}
