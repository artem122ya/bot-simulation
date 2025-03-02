import { useQuery } from "@tanstack/react-query";
import httpClient from "../utils/httpClient.ts";
import BotWithTasks from "../interfaces/bot-with-tasks.interface.ts";

export const useGetBots = () => {
  return useQuery({
    queryKey: ["bots"],
    queryFn: () => httpClient.get<BotWithTasks[]>("/bots"),
    refetchOnWindowFocus: false,
  });
};
