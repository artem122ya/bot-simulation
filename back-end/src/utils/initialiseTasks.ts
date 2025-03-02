import Task, { TaskStatus } from "../interfaces/task.interface";
import { randomUUID } from "node:crypto";

const initialiseTasks: () => Task[] = () => {
  return [
    {
      uid: randomUUID(),
      description: "process invoice",
      duration: 1500,
      status: TaskStatus.NOT_STARTED,
      botUid: null,
    },
    {
      uid: randomUUID(),
      description: "categorize transactions",
      duration: 2750,
      status: TaskStatus.NOT_STARTED,
      botUid: null,
    },
    {
      uid: randomUUID(),
      description: "extract statement data",
      duration: 18000,
      status: TaskStatus.NOT_STARTED,
      botUid: null,
    },
    {
      uid: randomUUID(),
      description: "amortize loan payments",
      duration: 2573,
      status: TaskStatus.NOT_STARTED,
      botUid: null,
    },
    {
      uid: randomUUID(),
      description: "depreciate fixed assets",
      duration: 7454,
      status: TaskStatus.NOT_STARTED,
      botUid: null,
    },
    {
      uid: randomUUID(),
      description: "calculate payroll allocations",
      duration: 37473,
      status: TaskStatus.NOT_STARTED,
      botUid: null,
    },
    {
      uid: randomUUID(),
      description: "generate month end report",
      duration: 34332,
      status: TaskStatus.NOT_STARTED,
      botUid: null,
    },
    {
      uid: randomUUID(),
      description: "audit for discrepancies",
      duration: 6765,
      status: TaskStatus.NOT_STARTED,
      botUid: null,
    },
    {
      uid: randomUUID(),
      description: "close the books",
      duration: 3643,
      status: TaskStatus.NOT_STARTED,
      botUid: null,
    },
    {
      uid: randomUUID(),
      description: "perform reconciliation",
      duration: 4542,
      status: TaskStatus.NOT_STARTED,
      botUid: null,
    },
  ];
};

export default initialiseTasks;
