import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const SOCKET_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://10.10.7.7:5000";

export const initializeSocket = (token: string) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      auth: {
        token: token,
      },
      extraHeaders: {
        token: token,
      },
      transports: ["websocket"],
      path: "/socket.io/",
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
