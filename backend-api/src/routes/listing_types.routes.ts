import express, { Router } from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware";
import {
  addNewListingTypes,
  delteListingTypesById,
  getAllListingTypes,
  getListingTypesById,
  updateListingTypes
} from "../controllers/listing_types.controller";
import validateRequest from "../middleware/validateRequest.middleware";
import {
  createListingTypesValidator,
  deleteListingTypesValidator,
  getListingTypesValidator,
  updateListingTypesValidator
} from "../validators/listing_types.validator";

let router: Router = express.Router();

router
  .route("/listing-types")
  .get(getAllListingTypes)
  .post(validateRequest(createListingTypesValidator), isAuthenticated, isAdmin, addNewListingTypes);

router
  .route("/listing-type/:listingTypesId")
  .get(validateRequest(getListingTypesValidator), getListingTypesById)
  .put(validateRequest(updateListingTypesValidator), isAuthenticated, isAdmin, updateListingTypes)
  .delete(validateRequest(deleteListingTypesValidator), isAuthenticated, isAdmin, delteListingTypesById);

export default router;
