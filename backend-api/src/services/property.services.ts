import { Types } from "mongoose";
import { IProperty, IPropertyWithId } from "../interface/property.interface";
import PropertyModel from "../models/property.model";

const createProperty = async (data: IProperty) => {
  let property = await PropertyModel.create(data);
  return property;
};

const allProperty = async () => {
  let properties = await PropertyModel.find({});

  return properties;
};

const readPropertyById = async (id: string) => {
  let isValidId = Types.ObjectId.isValid(id);
  if (!isValidId) return { message: "Invalid Property Id" };
  let property = await PropertyModel.findById(id);
  return property;
};

const updateProperty = async (id: string, data: IProperty) => {
  let property = await PropertyModel.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true
  });

  return property;
};

const deletePropertyById = async (id: string) => {
  let property = await PropertyModel.findByIdAndDelete(id);
  return property;
};

export { createProperty, allProperty, readPropertyById, updateProperty, deletePropertyById };
