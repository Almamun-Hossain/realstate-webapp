import httpStatus from "http-status";
import handleAsyncError from "../ErrorHandler/handleAsyncError";
import { featureService } from "../services";
import { Request, Response } from "express";

export const getAllFeature = handleAsyncError(async (req: Request, res: Response) => {
  let types = await featureService.getAllFeature();
  res.json(types).status(httpStatus.OK);
});

export const addNewFeature = handleAsyncError(async (req: Request, res: Response) => {
  let types = await featureService.createANewFeature(req.body);
  res.json(types).status(httpStatus.OK);
});

export const getFeatureById = handleAsyncError(async (req: Request, res: Response) => {
  let types = await featureService.getAFeatureById(req.params.featureId);
  res.json(types).status(httpStatus.OK);
});

export const updateFeature = handleAsyncError(async (req: Request, res: Response) => {
  let types = await featureService.updateFeatureBytId(req.body, req.params.featureId);
  res.json(types).status(httpStatus.OK);
});

export const deleteFeatureById = handleAsyncError(async (req: Request, res: Response) => {
  let types = await featureService.deleteFeatureById(req.params.featureId);
  res.json({ success: true, message: "Feature has been deleted successfully", types }).status(httpStatus.OK);
});
