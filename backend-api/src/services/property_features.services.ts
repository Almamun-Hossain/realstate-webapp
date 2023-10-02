import { PropertyFeatureDocument } from "../interface/property_features.interface";
import PropertyFeatureModel from "../models/property_feature.model";
import { Types } from "mongoose";

export const getAllPropertyFeature = async () => {
  let allPropertyFeature = await PropertyFeatureModel.find({});
  return allPropertyFeature;
};

// Create a new PropertyFeature
async function createOrUpdatePropertyFeature(propertyId: string, featureIds: string[]): Promise<PropertyFeatureDocument> {
  //check if property is exist in feature
  let propertyFeature = await PropertyFeatureModel.findOne({ propertyId });

  if (propertyFeature) {
    let stringIds: string[] = [];
    propertyFeature.featureIds.map((item) => stringIds.push(item.toString()));
    //get unique feature id
    let uniqueFeature = Array.from(new Set([...stringIds, ...featureIds]));

    //convert the unique feature string id to mongoose object id
    propertyFeature.featureIds = uniqueFeature.map((item) => (typeof item === "string" ? new Types.ObjectId(item) : item));
  } else {
    propertyFeature = new PropertyFeatureModel({
      propertyId,
      featureIds
    });
  }

  const savedPropertyFeature = (await propertyFeature.save()).populate(["propertyId", "featureIds"]);
  return savedPropertyFeature;
}

// Get a PropertyFeature by its ID
async function getPropertyFeatureById(id: string): Promise<PropertyFeatureDocument | null> {
  const propertyFeature = await PropertyFeatureModel.findOne({ $or: [{ propertyId: id }, { _id: id }] }).populate([
    "propertyId",
    "featureIds"
  ]);
  return propertyFeature;
}

// Update a PropertyFeature by its ID
async function updatePropertyFeature(
  id: string,
  propertyId: string,
  featureIds: string[]
): Promise<PropertyFeatureDocument | null> {
  const updatedPropertyFeature = await PropertyFeatureModel.findByIdAndUpdate(
    id,
    { propertyId, featureIds },
    { new: true }
  ).exec();

  return updatedPropertyFeature;
}

// Delete a PropertyFeature by its ID
async function deletePropertyFeature(id: string): Promise<PropertyFeatureDocument | null> {
  const deletedPropertyFeature = await PropertyFeatureModel.findByIdAndDelete(id);
  return deletedPropertyFeature;
}

export { createOrUpdatePropertyFeature, getPropertyFeatureById, updatePropertyFeature, deletePropertyFeature };
