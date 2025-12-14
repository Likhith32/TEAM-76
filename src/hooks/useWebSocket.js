// src/hooks/useWebSocket.js
import { useEffect, useRef } from "react";

const useWebSocket = (url, onMessage) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!url) return;

    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      onMessage && onMessage(event.data);
    };

    socketRef.current.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socketRef.current && socketRef.current.close();
    };
  }, [url]);

  return socketRef;
};

export default useWebSocket;
