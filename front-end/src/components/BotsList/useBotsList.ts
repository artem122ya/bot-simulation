import { useEffect, useState } from "react";
import BotWithTasks from "../../interfaces/bot-with-tasks.interface.ts";
import { useGetBots } from "../../queries/useGetBots.ts";
import { TaskEvent, useSocket } from "../../hooks/useSocket.ts";
import { TaskStatus } from "../../interfaces/task.interface.ts";

const useBotsList = () => {
  const [botsList, setBotsList] = useState<BotWithTasks[]>([]);
  const { data, isLoading, error } = useGetBots();
  useSocket({
    onTaskStarted: (event: TaskEvent) => {
      setBotsList((list) => {
        const bot = list.find((bot) => bot.uid === event.botUid);
        if (bot) {
          bot.tasks = bot?.tasks.map((task) => {
            if (task.uid === event.taskUid) {
              return { ...task, status: TaskStatus.IN_PROGRESS };
            }
            return task;
          });
        }

        return [...list];
      });
    },
    onTaskFinished: (event: TaskEvent) => {
      setBotsList((list) => {
        const bot = list.find((bot) => bot.uid === event.botUid);
        if (bot) {
          bot.tasks = bot?.tasks.filter((task) => task.uid !== event.taskUid);
        }

        return [...list];
      });
    },
  });
  useEffect(() => {
    if (data) {
      setBotsList(data);
    }
  }, [data]);

  return { botsList, isLoading, error };
};

export default useBotsList;
