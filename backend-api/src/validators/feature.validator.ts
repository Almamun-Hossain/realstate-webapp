import { object, string } from "zod";

let body = object({
  name: string(),
  description: string().nullable()
});

let params = object({
  featureId: string()
});

export const getFeatureValidator = object({ params });
export const createFeatureValidator = object({ body });
export const updateFeatureValidator = object({ body, params });
export const deleteFeatureValidator = object({ params });
