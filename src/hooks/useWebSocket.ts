import { useEffect, useRef, useState } from "react";

export function useWebSocket(url: string) {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<Event | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onmessage = (event) => setData(event.data);
    socket.onerror = (event) => setError(event);

    return () => socket.close();
  }, [url]);

  const sendMessage = (msg: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(msg);
    }
  };

  return { data, error, sendMessage };
}
