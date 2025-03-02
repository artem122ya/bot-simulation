import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the TypeScript Express API",
    status: "Server is running",
  });
});

router.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
  });
});

export default router;
