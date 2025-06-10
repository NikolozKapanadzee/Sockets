"use client";

import socket from "@/config/socket";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const [echo, setEcho] = useState("");
  const [echos, setEchos] = useState<string[]>([]);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("echoReciver", echo);
    setEcho("");
  };
  useEffect(() => {
    socket.on("echoSender", (data) => {
      setEchos((prev) => [...prev, data]);
    });
  }, [socket]);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="echo"
          className="border-2"
          value={echo}
          onChange={(e) => setEcho(e.target.value)}
        />
        <h1></h1>
      </form>
    </div>
  );
}
