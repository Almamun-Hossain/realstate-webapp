import { Request, Response, NextFunction } from "express";

const handleAsyncError = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((error) => next(error));
};

export default handleAsyncError;
