export enum TaskStatus {
  NOT_STARTED = "not-started",
  IN_PROGRESS = "in-progress",
  COMPLETED = "completed",
}

interface Task {
  uid: string;
  description: string;
  duration: number;
  status: string;
  botUid: string | null;
}

export default Task;
