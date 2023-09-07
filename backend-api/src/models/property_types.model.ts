import { Schema, model } from "mongoose";
import { IPropertyTypes } from "../interface/property_types.interface";
import { toJSON } from "./plugin/toJSON.plugin";

const PropertyTypesSchema = new Schema<IPropertyTypes>(
  {
    title: {
      type: String,
      required: [true, "Provide Property Types Title"]
    },
    notes: {
      type: String,
      required: false,
      default: null
    }
  },
  {
    timestamps: true
  }
);

PropertyTypesSchema.plugin(toJSON);

const PropertyTypesModel = model("PropertyTypes", PropertyTypesSchema);
export default PropertyTypesModel;
