import express, { Router } from "express";
import { Request, Response, NextFunction } from "express";
import propertyRoutes from "./property.routes";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";
import propertyTypes from "./property_types.routes";
let router: Router = express.Router();

router.get("/health", (req: Request, res: Response, next: NextFunction) => {
  console.log("health route");

  res.send("app health is ok").status(200);
});

router.use(userRoutes);
router.use(authRoutes);
router.use(propertyRoutes);
router.use(propertyTypes);

export default router;
