import { PropertyFeatureDocument } from "../interface/property_features.interface";
import PropertyFeatureModel from "../models/property_feature.model";
import { ObjectId, Types } from "mongoose";

export const getAllPropertyFeature = async () => {
  let allPropertyFeature = await PropertyFeatureModel.find({}).populate(["propertyId", "featureIds"]);
  return allPropertyFeature;
};

// Create a new PropertyFeature
async function createOrUpdatePropertyFeature(propertyId: string, featureIds: string[]): Promise<PropertyFeatureDocument> {
  //check if property is exist in feature
  let propertyFeature = await PropertyFeatureModel.findOne({ propertyId });

  if (propertyFeature) {
    //process and filter duplicate fearture id
    let uniqueFeature = processUniqueFeatureId(propertyFeature.featureIds, featureIds);

    propertyFeature.featureIds = uniqueFeature;
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
async function updatePropertyFeature(id: string, featureIds: string[]): Promise<PropertyFeatureDocument | null> {
  const updatedPropertyFeature = await PropertyFeatureModel.findOneAndUpdate(
    { $or: [{ _id: id }, { propertyId: id }] },
    { featureIds },
    { new: true }
  ).populate(["propertyId", "featureIds"]);

  return updatedPropertyFeature;
}

// Delete a PropertyFeature by its ID
async function deleteAllPropertyFeature(id: string): Promise<PropertyFeatureDocument | null> {
  const deletedPropertyFeature = await PropertyFeatureModel.findOneAndDelete({ $or: [{ _id: id }, { propertyId: id }] });
  return deletedPropertyFeature;
}

const processUniqueFeatureId = (objectFeatureIds: Types.ObjectId[], stringFeatureIds: string[]): Types.ObjectId[] => {
  //initialize an empty string array
  let objectToStringIds: string[] = [];
  //convert object array to sring array
  objectFeatureIds.map((item) => objectToStringIds.push(item.toString()));

  //filter using string id's using sort method, and type is string
  let uniqueFeature = Array.from(new Set([...objectToStringIds, ...stringFeatureIds]));
  // now convert string unique feature id to mongoose object id
  let updateUniqueFeature = uniqueFeature.map((item) => (typeof item === "string" ? new Types.ObjectId(item) : item));

  return updateUniqueFeature;
};

export { createOrUpdatePropertyFeature, getPropertyFeatureById, updatePropertyFeature, deleteAllPropertyFeature };
