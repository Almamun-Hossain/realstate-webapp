import express from "express";
import { Request, Response, NextFunction } from "express";
import propertyRoutes from "./property.routes";

let router = express.Router();

router.get("/health", (req: Request, res: Response, next: NextFunction) => {
  console.log("health route");

  res.send("app health is ok").status(200);
});

router.use(propertyRoutes);

export default router;
