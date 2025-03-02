import { useMutation } from "@tanstack/react-query";
import httpClient from "../utils/httpClient.ts";
import Bot from "../interfaces/bot.interface.ts";
import { AxiosError } from "axios";

export const useCreateBot = () => {
  return useMutation<Bot, AxiosError, { name: string }>({
    mutationFn: (data) => httpClient.post("/bots", data),
  });
};
