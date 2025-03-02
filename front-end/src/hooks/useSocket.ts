import { useEffect, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

export interface TaskEvent {
  taskUid: string;
  botUid: string;
  type: "started" | "finished";
}

export const useSocket = ({
  onTaskStarted,
  onTaskFinished,
}: {
  onTaskStarted: (event: TaskEvent) => void;
  onTaskFinished: (event: TaskEvent) => void;
}) => {
  const [, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [taskEvents, setTaskEvents] = useState<TaskEvent[]>([]);

  useEffect(() => {
    const socketInstance = io(
      import.meta.env.VITE_API_URL || "http://localhost:3000",
    );

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setIsConnected(false);
    });

    socketInstance.on("task:started", (event) => {
      const taskEvent: TaskEvent = {
        ...event,
        type: "started",
      };
      setTaskEvents((prev) => [...prev, taskEvent]);
      onTaskStarted(taskEvent);
    });

    socketInstance.on("task:finished", (event) => {
      const taskEvent: TaskEvent = {
        ...event,
        type: "finished",
      };
      setTaskEvents((prev) => [...prev, taskEvent]);
      onTaskFinished(taskEvent);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const clearEvents = useCallback(() => {
    setTaskEvents([]);
  }, []);

  return {
    isConnected,
    taskEvents,
    clearEvents,
  };
};
