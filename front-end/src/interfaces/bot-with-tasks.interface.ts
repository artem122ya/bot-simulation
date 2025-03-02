import Bot from "./bot.interface";
import Task from "./task.interface";

interface BotWithTasks extends Bot {
  tasks: Task[];
}

export default BotWithTasks;
