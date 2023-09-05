import { NextFunction, Request, Response } from "express";
import handleAsyncError from "../ErrorHandler/handleAsyncError";
import { propertyServices } from "../services";
import httpStatus from "http-status";

// create new property
const createProperty = handleAsyncError(async (req: Request, res: Response) => {
  let property = await propertyServices.createProperty(req.body);

  return res.status(httpStatus.CREATED).send(property);
});

// get all property

const getProperty = handleAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  let data = await propertyServices.allProperty();
  return res.send(data).status(201);
});

const readProperty = handleAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  let property = await propertyServices.readPropertyById(req.params.propertyId);

  if (!property)
    return res
      .json({
        message: `Property with id ${req.params.propertyId} not found`
      })
      .status(404);
  return res.json(property).status(201);
});

const updateProperty = handleAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  let exist = await propertyServices.readPropertyById(req.params.propertyId);
  if (!exist)
    return res
      .json({
        message: `Property with id ${req.params.propertyId} not found`
      })
      .status(404);

  let property = await propertyServices.updateProperty(req.params.propertyId, req.body);

  return res.send(property).status(httpStatus.OK);
});

const deleteProperty = handleAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  let exist = await propertyServices.readPropertyById(req.params.propertyId);
  if (!exist)
    return res
      .json({
        message: `Property with id ${req.params.propertyId} not found`
      })
      .status(404);

  let property = await propertyServices.deletePropertyById(req.params.propertyId);

  return res.json({ success: true, message: "Deleted successfully" }).status(httpStatus.NO_CONTENT);
});

export { createProperty, getProperty, readProperty, updateProperty, deleteProperty };
