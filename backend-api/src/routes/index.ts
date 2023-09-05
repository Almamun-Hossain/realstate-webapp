import express from "express";
import { Request, Response, NextFunction } from "express";
import propertyRoutes from "./property.routes";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
let router = express.Router();

router.get("/health", (req: Request, res: Response, next: NextFunction) => {
  console.log("health route");

  res.send("app health is ok").status(200);
});

router.use(userRoutes);
router.use(authRoutes);
router.use(propertyRoutes);

export default router;
