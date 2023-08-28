import express from "express";
import {
  createProperty,
  deleteProperty,
  getProperty,
  readProperty,
  updateProperty
} from "../controllers/property.controller";
import validateRequest from "../middleware/validateRequest";
import {
  createPropertyValidator,
  deletePropertyValidator,
  getPropertyValidator,
  updatePropertyValidator
} from "../validators/property.validator";

let router = express.Router();

router.route("/property").get(getProperty).post(validateRequest(createPropertyValidator), createProperty);

router
  .route("/property/:propertyId")
  .get(validateRequest(getPropertyValidator), readProperty)
  .put(validateRequest(updatePropertyValidator), updateProperty)
  .delete(validateRequest(deletePropertyValidator), deleteProperty);

export default router;
