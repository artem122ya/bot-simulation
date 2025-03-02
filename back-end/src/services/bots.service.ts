import Bot from "../interfaces/bot.interface";
import TasksService from "./tasks.service";
import BotRepository from "../repositories/bot.repository";
import BotWithTasks from "../interfaces/bot-with-tasks.interface";
import { InMemoryEventBus } from "./in-memory-event-bus.service";
import { EVENTS } from "../events/event.types";

class BotsService {
  constructor(
    private botsRepository: BotRepository,
    private tasksService: TasksService,
    private eventBus: InMemoryEventBus,
  ) {}

  populateBotWithTasks(bot: Bot): BotWithTasks {
    const tasks = this.tasksService.getTasksForBot(bot.uid);
    return {
      ...bot,
      tasks,
    };
  }

  getAllBots(): BotWithTasks[] {
    return this.botsRepository
      .getAll()
      .map((bot) => this.populateBotWithTasks(bot));
  }

  async createBot(name: string): Promise<BotWithTasks> {
    const bot = this.botsRepository.create({ name });
    const tasks = this.tasksService.initialiseTasksForBot(bot.uid);

    if (tasks.length > 0) {
      await this.eventBus.publish(EVENTS.TASK.START, {
        taskUid: tasks[0].uid,
        botUid: bot.uid,
        nextTaskUids: tasks.slice(1).map((task) => task.uid),
      });
    }

    return {
      ...bot,
      tasks,
    };
  }
}

export default BotsService;
