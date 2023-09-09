import { number, object, string, TypeOf } from "zod";

let body = object({
  title: string({ required_error: "Property title is missing" }),
  address_line1: string({ required_error: "Address Line-1 is  missing" }),
  address_line2: string().optional().nullable(),
  city: string({
    required_error: "City is missing"
  }),
  country: string({ required_error: "Country is missing" }),
  price: number({
    required_error: "Price is missing",
    invalid_type_error: "Price should be number"
  }),
  thumbnail: string().optional().nullable(),
  property_types: string(),
  property_size: number(),
  block_size: number(),
  num_bedrooms: number(),
  num_bathrooms: number(),
  num_carspace: number(),
  description: string().optional().nullable()
});

let params = object({
  propertyId: string({ required_error: "Property ID is missing" })
});

export const getPropertyValidator = object({ params });
export const createPropertyValidator = object({ body });
export const updatePropertyValidator = object({ body, params });
export const deletePropertyValidator = object({ params });
