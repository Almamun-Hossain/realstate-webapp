import express, { Router } from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware";
import {
  createPropertyFearture,
  deletePropertyFearturebyId,
  getAllPropertyFearture,
  getPropertyFeartureById,
  updatePropertyFearturbyId
} from "../controllers/property_feature.controller";

let router: Router = express.Router();

router
  .route("/property-features")
  .get(isAuthenticated, isAdmin, getAllPropertyFearture)
  .post(isAuthenticated, isAdmin, createPropertyFearture);

router
  .route("/property-feature/:id")
  .get(getPropertyFeartureById)
  .put(isAuthenticated, isAdmin, updatePropertyFearturbyId)
  .delete(isAuthenticated, isAdmin, deletePropertyFearturebyId);

export default router;
