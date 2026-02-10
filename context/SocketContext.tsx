"use client";

import { disconnectSocket, getSocket } from "@/utils/socket";
import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({
  token,
  children,
}: {
  token: string;
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    const s = getSocket(token);
    s.connect();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSocket(s);

    return () => {
      disconnectSocket();
      setSocket(null);
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
