import { io } from "socket.io-client";

export const initSocketConnection = () => {
  const socket = io("http://3.139.8.146:80/", {
    transports: ["websocket"],
  });

  return socket;
};

export const socket = io("http://3.139.8.146:80/");

// // "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:4000';
