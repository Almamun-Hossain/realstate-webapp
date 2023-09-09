import express, { Router } from "express";
import validateRequest from "../middleware/validateRequest.middleware";
import {
  createFeatureValidator,
  deleteFeatureValidator,
  getFeatureValidator,
  updateFeatureValidator
} from "../validators/feature.validator";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware";
import {
  addNewFeature,
  deleteFeatureById,
  getAllFeature,
  getFeatureById,
  updateFeature
} from "../controllers/feature.controller";

const router: Router = express.Router();

router
  .route("/features")
  .get(getAllFeature)
  .post(validateRequest(createFeatureValidator), isAuthenticated, isAdmin, addNewFeature);

router
  .route("/feature/:featureId")
  .get(validateRequest(getFeatureValidator), getFeatureById)
  .put(validateRequest(updateFeatureValidator), isAuthenticated, isAdmin, updateFeature)
  .delete(validateRequest(deleteFeatureValidator), isAuthenticated, isAdmin, deleteFeatureById);

export default router;
