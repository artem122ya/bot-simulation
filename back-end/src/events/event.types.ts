export const EVENTS = {
  TASK: {
    START: "task:start",
    FINISH: "task:finish",
  },
  NOTIFICATION: {
    TASK_STARTED: "notification:task:started",
    TASK_FINISHED: "notification:task:finished",
  },
} as const;

export type EventName =
  | typeof EVENTS.TASK.START
  | typeof EVENTS.TASK.FINISH
  | typeof EVENTS.NOTIFICATION.TASK_STARTED
  | typeof EVENTS.NOTIFICATION.TASK_FINISHED;

export interface TaskStartEvent {
  taskUid: string;
  botUid: string;
  nextTaskUids: string[];
}

export interface TaskFinishEvent {
  taskUid: string;
  botUid: string;
  nextTaskUids: string[];
}

export interface NotifyTaskStartedEvent {
  taskUid: string;
  botUid: string;
}

export interface NotifyTaskFinishedEvent {
  taskUid: string;
  botUid: string;
}

export interface EventPayloadMap {
  [EVENTS.TASK.START]: TaskStartEvent;
  [EVENTS.TASK.FINISH]: TaskFinishEvent;
  [EVENTS.NOTIFICATION.TASK_STARTED]: NotifyTaskStartedEvent;
  [EVENTS.NOTIFICATION.TASK_FINISHED]: NotifyTaskFinishedEvent;
}
