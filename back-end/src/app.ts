import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as http from "node:http";
import indexRouter from "./routes/index";
import { WebSocketService } from "./services/websocket.service";
import { InMemoryEventBus } from "./services/in-memory-event-bus.service";
import TaskRepository from "./repositories/task.repository";
import BotRepository from "./repositories/bot.repository";
import initialiseTasks from "./utils/initialiseTasks";
import WorkService from "./services/work.service";
import TasksService from "./services/tasks.service";
import BotsService from "./services/bots.service";
import BotsController from "./controllers/bots.controller";
import botRoutes from "./routes/bots.routes";

// Load environment variables
dotenv.config();

const app: Express = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// repositories
const botRepository = new BotRepository();
const taskRepository = new TaskRepository(initialiseTasks());

// services
const eventBus = new InMemoryEventBus();
const webSocketService = new WebSocketService(server, eventBus);
const tasksService = new TasksService(taskRepository);
const botsService = new BotsService(botRepository, tasksService, eventBus);
const workService = new WorkService(eventBus, taskRepository);

// controllers
const botsController = new BotsController(botsService);

app.use("/", indexRouter);
app.use("/bots", botRoutes(botsController));

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

export default app;
