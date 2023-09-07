import { Request, Response } from "express";
import httpStatus from "http-status";
import handleAsyncError from "../ErrorHandler/handleAsyncError";
import { propertyTypesService } from "../services";

export const getAllPropertyTypes = handleAsyncError(async (req: Request, res: Response) => {
  let types = await propertyTypesService.getAllTypes();
  res.json(types).status(httpStatus.OK);
});

export const addNewPropertyTypes = handleAsyncError(async (req: Request, res: Response) => {
  let types = await propertyTypesService.createANewTypes(req.body);
  res.json(types).status(httpStatus.OK);
});

export const getPropertyTypesById = handleAsyncError(async (req: Request, res: Response) => {
  let types = await propertyTypesService.getATypesById(req.params.propertyTypesId);
  res.json(types).status(httpStatus.OK);
});

export const updatePropertyTypes = handleAsyncError(async (req: Request, res: Response) => {
  let types = await propertyTypesService.updateTypesBytId(req.body, req.params.propertyTypesId);
  res.json(types).status(httpStatus.OK);
});

export const deltePropertyTypesById = handleAsyncError(async (req: Request, res: Response) => {
  let types = await propertyTypesService.deleteTypesById(req.params.propertyTypesId);
  res.json({ success: true, message: "Property Types has been deleted successfully", types }).status(httpStatus.OK);
});
