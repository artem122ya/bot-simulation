import { NextFunction, Request, Response } from "express";
import BotsService from "../services/bots.service";

class BotsController {
  constructor(private botsService: BotsService) {}

  public getAllBots(req: Request, res: Response) {
    const bots = this.botsService.getAllBots();
    res.status(200).json(bots);
  }

  public async createBot(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const bot = await this.botsService.createBot(name);
      res.status(201).json(bot);
    } catch (error) {
      next(error);
    }
  }
}

export default BotsController;
