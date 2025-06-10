import React, { useState, FormEvent, useEffect } from "react";
import socket from "@/config/socket";

type PropType = {
  roomId: string;
  userEmail: string;
};
type MessageType = PropType & {
  message: string;
};

export default function Chat({ roomId, userEmail }: PropType) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState("");
  const handleSendPrivateMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("privateMessage", { roomId, userEmail, message });
    setMessage("");
  };
  useEffect(() => {
    socket.on("privateMessage", (data: MessageType) => {
      setMessages((prev) => [...prev, data]);
    });
  }, [socket]);
  return (
    <div>
      <div className="p-5 border gap-3 flex flex-col space-y-4  bg-white dark:bg-gray-900 h-screen overflow-y-auto">
        {messages.map((el, index) => (
          <div
            key={index}
            className={`border-2 rounded-xl p-3 max-w-xs ${
              userEmail === el.userEmail
                ? "ml-auto bg-blue-100 border-blue-300 text-right"
                : "mr-auto bg-gray-100 border-gray-300 text-left"
            } shadow-sm`}
          >
            <h2 className="text-base font-medium text-blue-600 break-words">
              {el.message}
            </h2>
            <p className="text-xs text-gray-500 mt-1">{el.userEmail}</p>
          </div>
        ))}
        <form onSubmit={handleSendPrivateMessage}>
          <input
            type="text"
            placeholder="Send Message"
            className="flex border-2 border-gray-300 rounded-md px-4 py-2 w-full max-w-[150px] m-auto focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm bg-white"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </form>
      </div>
    </div>
  );
}
