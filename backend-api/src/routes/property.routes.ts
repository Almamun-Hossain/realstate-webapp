import express from "express";
import {
  createProperty,
  deleteProperty,
  getProperty,
  readProperty,
  updateProperty
} from "../controllers/property.controller";
import validateRequest from "../middleware/validateRequest.middleware";
import {
  createPropertyValidator,
  deletePropertyValidator,
  getPropertyValidator,
  updatePropertyValidator
} from "../validators/property.validator";
import { isAuthenticated } from "../middleware/auth.middleware";

let router = express.Router();

router.route("/property").get(getProperty).post(isAuthenticated, validateRequest(createPropertyValidator), createProperty);

router
  .route("/property/:propertyId")
  .get(validateRequest(getPropertyValidator), readProperty)
  .put(isAuthenticated, validateRequest(updatePropertyValidator), updateProperty)
  .delete(isAuthenticated, validateRequest(deletePropertyValidator), deleteProperty);

export default router;
