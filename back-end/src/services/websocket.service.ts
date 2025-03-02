import { Server as SocketIOServer } from "socket.io";
import { Server } from "http";
import { InMemoryEventBus } from "./in-memory-event-bus.service";
import {
  EVENTS,
  NotifyTaskFinishedEvent,
  NotifyTaskStartedEvent,
} from "../events/event.types";

export class WebSocketService {
  private io: SocketIOServer;

  constructor(
    server: Server,
    private eventBus: InMemoryEventBus,
  ) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    });

    this.initialize();
  }

  private initialize(): void {
    this.io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
      });
    });

    this.subscribeToTaskEvents();
  }

  private subscribeToTaskEvents(): void {
    this.eventBus.subscribe(
      EVENTS.NOTIFICATION.TASK_STARTED,
      (event: NotifyTaskStartedEvent) => {
        this.io.emit("task:started", {
          taskUid: event.taskUid,
          botUid: event.botUid,
          timestamp: new Date().toISOString(),
        });
      },
    );

    this.eventBus.subscribe(
      EVENTS.NOTIFICATION.TASK_FINISHED,
      (event: NotifyTaskFinishedEvent) => {
        this.io.emit("task:finished", {
          taskUid: event.taskUid,
          botUid: event.botUid,
          timestamp: new Date().toISOString(),
        });
      },
    );
  }
}
