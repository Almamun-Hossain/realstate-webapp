import { Types } from "mongoose";

export interface IPropertyFeature {
  propertyId: Types.ObjectId;
  featureIds: Types.ObjectId[];
}

export interface IPropertyFeatureWithId {
  id: Types.ObjectId;
  propertyId: Types.ObjectId;
  featureIds: Types.ObjectId[];
}
export interface PropertyFeatureDocument extends Document, IPropertyFeature {}
