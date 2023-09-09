import httpStatus from "http-status";
import handleAsyncError from "../ErrorHandler/handleAsyncError";
import { listingTypesService } from "../services";
import { Request, Response } from "express";

export const getAllListingTypes = handleAsyncError(async (req: Request, res: Response) => {
  let types = await listingTypesService.getAllListingTypes();
  res.json(types).status(httpStatus.OK);
});

export const addNewListingTypes = handleAsyncError(async (req: Request, res: Response) => {
  let types = await listingTypesService.createANewListingTypes(req.body);
  res.json(types).status(httpStatus.OK);
});

export const getListingTypesById = handleAsyncError(async (req: Request, res: Response) => {
  let types = await listingTypesService.getAListingTypesById(req.params.listingTypesId);
  res.json(types).status(httpStatus.OK);
});

export const updateListingTypes = handleAsyncError(async (req: Request, res: Response) => {
  let types = await listingTypesService.updateListingTypesBytId(req.body, req.params.listingTypesId);
  res.json(types).status(httpStatus.OK);
});

export const delteListingTypesById = handleAsyncError(async (req: Request, res: Response) => {
  let types = await listingTypesService.deleteListingTypesById(req.params.listingTypesId);
  res.json({ success: true, message: "Listing Types has been deleted successfully", types }).status(httpStatus.OK);
});
