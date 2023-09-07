import httpStatus from "http-status";
import CustomError from "../ErrorHandler/customError";
import { IPropertyTypes, IPropertyTypesWithID } from "../interface/property_types.interface";
import PropertyTypesModel from "../models/property_types.model";

export const getAllTypes = async () => {
  let types = await PropertyTypesModel.find({});
  return types;
};

export const createANewTypes = async (bodyData: IPropertyTypes) => {
  let type = await PropertyTypesModel.create(bodyData);
  return type;
};

export const getATypesById = async (typesId: string) => {
  let type = await PropertyTypesModel.findById(typesId);
  if (!type) throw new CustomError("Propety Types not found", httpStatus.NOT_FOUND);
  return type;
};

export const updateTypesBytId = async (bodyData: IPropertyTypes, typesId: string) => {
  let type = await PropertyTypesModel.findByIdAndUpdate(typesId, bodyData, {
    runValidators: true,
    new: true
  });

  if (!type) throw new CustomError("Property types not found", httpStatus.NOT_FOUND);

  return type;
};

export const deleteTypesById = async (typesId: string) => {
  let type = await PropertyTypesModel.findByIdAndDelete(typesId);

  if (!type) throw new CustomError("Property types not found", httpStatus.NOT_FOUND);

  return type;
};
