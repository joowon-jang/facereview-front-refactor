import { io } from "socket.io-client";

export const initSocketConnection = () => {
  const socket = io("https://api.facereview.net", {
    transports: ["websocket"],
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionDelayMax: 1000,
    reconnectionAttempts: Infinity,
  });

  return socket;
};

export const socket = io("https://api.facereview.net");

// // "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
