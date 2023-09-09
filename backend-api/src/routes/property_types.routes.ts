import express, { Router } from "express";
import { isAdmin, isAuthenticated } from "../middleware/auth.middleware";
import {
  addNewPropertyTypes,
  deltePropertyTypesById,
  getAllPropertyTypes,
  getPropertyTypesById,
  updatePropertyTypes
} from "../controllers/property_types.controller";

const router: Router = express.Router();

router.route("/property-types").get(getAllPropertyTypes).post(isAuthenticated, isAdmin, addNewPropertyTypes);

router
  .route("/property-types/:propertyTypesId")
  .get(getPropertyTypesById)
  .put(isAuthenticated, isAdmin, updatePropertyTypes)
  .delete(isAuthenticated, isAdmin, deltePropertyTypesById);

export default router;
