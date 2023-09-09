import { Schema, model } from "mongoose";
import { toJSON } from "./plugin/toJSON.plugin";
import { IFeature } from "../interface/feature.interface";

const FeatureSchema = new Schema<IFeature>(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false,
      default: null
    }
  },
  { timestamps: true }
);

FeatureSchema.plugin(toJSON);

const FeatureModel = model<IFeature>("Feature", FeatureSchema);

export default FeatureModel;
