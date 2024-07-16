import React, { createContext, useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import {SOCKET_BASE_URL} from "./components/appConfig";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_BASE_URL);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};