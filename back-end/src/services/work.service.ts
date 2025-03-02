import { InMemoryEventBus } from "./in-memory-event-bus.service";
import { EVENTS, TaskFinishEvent, TaskStartEvent } from "../events/event.types";
import TaskRepository from "../repositories/task.repository";
import { TaskStatus } from "../interfaces/task.interface";

class WorkService {
  constructor(
    private eventBus: InMemoryEventBus,
    private taskRepository: TaskRepository,
  ) {
    this.eventBus.subscribe(EVENTS.TASK.START, this.handleTaskStart.bind(this));
    this.eventBus.subscribe(
      EVENTS.TASK.FINISH,
      this.handleTaskFinish.bind(this),
    );
  }

  async handleTaskStart(event: TaskStartEvent) {
    const task = this.taskRepository.findOneAndUpdate(
      { uid: event.taskUid },
      { status: TaskStatus.IN_PROGRESS },
    );

    if (!task) {
      console.error(`Task with UID ${event.taskUid} not found`);
      return;
    }

    await this.eventBus.publish(EVENTS.NOTIFICATION.TASK_STARTED, {
      taskUid: event.taskUid,
      botUid: event.botUid,
    });

    // Simulate task execution
    setTimeout(async () => {
      await this.eventBus.publish(EVENTS.TASK.FINISH, {
        taskUid: event.taskUid,
        botUid: event.botUid,
        nextTaskUids: event.nextTaskUids,
      });
    }, task.duration);
  }

  async handleTaskFinish(event: TaskFinishEvent) {
    const task = this.taskRepository.findOne({ uid: event.taskUid });

    if (!task) {
      console.error(`Task with UID ${event.taskUid} not found`);
      return;
    }
    await this.eventBus.publish(EVENTS.NOTIFICATION.TASK_FINISHED, {
      taskUid: event.taskUid,
      botUid: event.botUid,
    });

    this.taskRepository.delete(event.taskUid);

    const nextTaskUid = event.nextTaskUids.shift();
    if (nextTaskUid) {
      await this.eventBus.publish(EVENTS.TASK.START, {
        taskUid: nextTaskUid,
        botUid: event.botUid,
        nextTaskUids: event.nextTaskUids,
      });
    }
  }
}

export default WorkService;
