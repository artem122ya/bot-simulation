import Task from "../interfaces/task.interface";

class TaskRepository {
  constructor(private tasks: Task[]) {}

  getByUid(uid: string): Task | undefined {
    return this.tasks.find((task) => task.uid === uid);
  }

  getAll(): Task[] {
    return this.tasks;
  }

  findOne(props: Partial<Task>): Task | undefined {
    return this.tasks.find((task) => {
      return Object.entries(props).every(
        ([key, value]) => task[key as keyof Task] === value,
      );
    });
  }

  find(props: Partial<Task>): Task[] {
    return this.tasks.filter((task) => {
      return Object.entries(props).every(
        ([key, value]) => task[key as keyof Task] === value,
      );
    });
  }

  update(uid: string, data: Partial<Task>): Task | undefined {
    const task = this.getByUid(uid);
    if (task) {
      Object.assign(task, data);
    }
    return task;
  }

  findOneAndUpdate(
    props: Partial<Task>,
    data: Partial<Task>,
  ): Task | undefined {
    const task = this.findOne(props);
    if (task) {
      Object.assign(task, data);
    }
    return task;
  }

  delete(uid: string): Task | undefined {
    const task = this.getByUid(uid);
    if (task) {
      this.tasks = this.tasks.filter((task) => task.uid !== uid);
    }
    return task;
  }
}

export default TaskRepository;
