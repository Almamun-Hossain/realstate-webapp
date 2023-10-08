import { Request, Response } from "express";
import * as propertyFeatureSevices from "../services/property_features.services";

export const getAllPropertyFearture = async (req: Request, res: Response) => {
  let allPropertyFeature = await propertyFeatureSevices.getAllPropertyFeature();
  res.json(allPropertyFeature).status(200);
};
export const createPropertyFearture = async (req: Request, res: Response) => {
  let { propertyId, featureIds } = req.body;
  let propertyFeatures = await propertyFeatureSevices.createOrUpdatePropertyFeature(propertyId, featureIds);
  res.json(propertyFeatures).status(200);
};
export const getPropertyFeartureById = async (req: Request, res: Response) => {
  let { id } = req.params;
  let propertyFeature = await propertyFeatureSevices.getPropertyFeatureById(id);
  return res.json(propertyFeature).status(200);
};
export const updatePropertyFearturbyId = async (req: Request, res: Response) => {
  let { id } = req.params;
  let { featureIds } = req.body;
  let update = await propertyFeatureSevices.updatePropertyFeature(id, featureIds);
  return res.json(update).status(200);
};
export const deletePropertyFearturebyId = async (req: Request, res: Response) => {
  let { id } = req.params;
  let propertyFeature = await propertyFeatureSevices.deleteAllPropertyFeature(id);
  return res.json(propertyFeature).status(200);
};
