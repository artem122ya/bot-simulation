import express from "express";
import BotsController from "../controllers/bots.controller";

const botRoutes = (botsController: BotsController) => {
  const router = express.Router();

  router.get("/", botsController.getAllBots.bind(botsController));
  router.post("/", botsController.createBot.bind(botsController));
  return router;
};

export default botRoutes;
