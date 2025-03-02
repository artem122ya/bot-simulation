import Bot from "../interfaces/bot.interface";
import { randomUUID } from "node:crypto";

class BotRepository {
  constructor(private bots: Bot[] = []) {}

  getByUid(uid: string): Bot | undefined {
    return this.bots.find((bot) => bot.uid === uid);
  }

  getAll(): Bot[] {
    return this.bots;
  }

  findOne(props: Partial<Bot>): Bot | undefined {
    return this.bots.find((bot) => {
      return Object.entries(props).every(
        ([key, value]) => bot[key as keyof Bot] === value,
      );
    });
  }

  update(uid: string, data: Partial<Bot>): Bot | undefined {
    const bot = this.getByUid(uid);
    if (bot) {
      Object.assign(bot, data);
    }
    return bot;
  }

  create(bot: Omit<Bot, "uid">): Bot {
    const newBot = {
      ...bot,
      uid: randomUUID(),
    };
    this.bots.push(newBot);
    return newBot;
  }
}

export default BotRepository;
