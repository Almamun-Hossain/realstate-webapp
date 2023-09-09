import { Types } from "mongoose";
export interface IProperty {
  title: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  country: string;
  price: number;
  thumbnail?: string;
  property_types?: Types.ObjectId;
  property_size: number;
  block_size: number;
  num_bedrooms: number;
  num_bathrooms: number;
  num_carspace: number;
  description?: string;
}

export interface IPropertyWithId {
  id: Types.ObjectId;
  address_line1: string;
  address_line2?: string;
  city: string;
  country: string;
  price: number;
  thumbnail?: string;
}
