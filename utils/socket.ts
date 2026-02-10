// // utils/socket.ts
// import { io, Socket } from "socket.io-client";

// let socket: Socket | null = null;

// const SOCKET_URL = process.env.NEXT_PUBLIC_IMAGE_URL!;

// export const initializeSocket = (token: string) => {
//   if (!socket) {
//     socket = io(SOCKET_URL, {
//       auth: { token },
//       transports: ["websocket"],
//       path: "/socket.io/",
//       autoConnect: true,
//     });

//     socket.on("connect", () => {
//       console.log("✅ Socket connected:", socket?.id);
//     });

//     socket.on("disconnect", () => {
//       console.log("⚠️ Socket disconnected");
//     });

//     socket.on("connect_error", (err) => {
//       console.error("❌ Socket error:", err.message);
//     });
//   }

//   return socket;
// };

// export const getSocket = () => socket;

// // ❌ DO NOT auto disconnect in components
// export const disconnectSocket = () => {
//   socket?.disconnect();
//   socket = null;
// };

import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (token: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_IMAGE_URL!, {
      transports: ["websocket"],
      auth: {
        token, // secure auth
      },

      autoConnect: false,
    });
    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
