import { Schema, model } from "mongoose";
import { IPropertyFeature, PropertyFeatureDocument } from "../interface/property_features.interface";
import { toJSON } from "./plugin/toJSON.plugin";

const PropertyFeatureSchema = new Schema<IPropertyFeature>({
  propertyId: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true
  },
  featureIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Feature",
      required: true
    }
  ]
});

PropertyFeatureSchema.plugin(toJSON);

const PropertyFeatureModel = model<PropertyFeatureDocument>("PropertyFeature", PropertyFeatureSchema);
export default PropertyFeatureModel;
