import httpStatus from "http-status";
import FeatureModel from "../models/feature.model";
import CustomError from "../ErrorHandler/customError";
import { IFeature } from "../interface/feature.interface";

export const getAllFeature = async () => {
  let types = await FeatureModel.find({});
  return types;
};

export const createANewFeature = async (bodyData: IFeature) => {
  let type = await FeatureModel.create(bodyData);
  return type;
};

export const getAFeatureById = async (featureId: string) => {
  let type = await FeatureModel.findById(featureId);
  if (!type) throw new CustomError("Feature not found", httpStatus.NOT_FOUND);
  return type;
};

export const updateFeatureBytId = async (bodyData: IFeature, featureId: string) => {
  let type = await FeatureModel.findByIdAndUpdate(featureId, bodyData, {
    runValidators: true,
    new: true
  });

  if (!type) throw new CustomError("Feature not found", httpStatus.NOT_FOUND);

  return type;
};

export const deleteFeatureById = async (featureId: string) => {
  let type = await FeatureModel.findByIdAndDelete(featureId);

  if (!type) throw new CustomError("Feature not found", httpStatus.NOT_FOUND);

  return type;
};
