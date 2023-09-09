import httpStatus from "http-status";
import ListingTypesModel from "../models/listing_types.model";
import CustomError from "../ErrorHandler/customError";
import { IListingTypes } from "../interface/listing_types.interface";

export const getAllListingTypes = async () => {
  let types = await ListingTypesModel.find({});
  return types;
};

export const createANewListingTypes = async (bodyData: IListingTypes) => {
  let type = await ListingTypesModel.create(bodyData);
  return type;
};

export const getAListingTypesById = async (typesId: string) => {
  let type = await ListingTypesModel.findById(typesId);
  if (!type) throw new CustomError("Listing Types not found", httpStatus.NOT_FOUND);
  return type;
};

export const updateListingTypesBytId = async (bodyData: IListingTypes, typesId: string) => {
  let type = await ListingTypesModel.findByIdAndUpdate(typesId, bodyData, {
    runValidators: true,
    new: true
  });

  if (!type) throw new CustomError("Listing types not found", httpStatus.NOT_FOUND);

  return type;
};

export const deleteListingTypesById = async (typesId: string) => {
  let type = await ListingTypesModel.findByIdAndDelete(typesId);

  if (!type) throw new CustomError("Listing types not found", httpStatus.NOT_FOUND);

  return type;
};
