import Task, { TaskStatus } from "../interfaces/task.interface";
import TaskRepository from "../repositories/task.repository";

class TasksService {
  constructor(private tasksRepository: TaskRepository) {}

  initialiseTasksForBot(botUid: string): Task[] {
    const task1 = this.tasksRepository.findOneAndUpdate(
      { status: TaskStatus.NOT_STARTED, botUid: null },
      { botUid },
    );
    const task2 = this.tasksRepository.findOneAndUpdate(
      { status: TaskStatus.NOT_STARTED, botUid: null },
      { botUid },
    );

    return [task1, task2].filter((task) => task !== undefined);
  }

  getTasksForBot(botUid: string): Task[] {
    return this.tasksRepository.find({ botUid });
  }
}

export default TasksService;
