import { Types } from "mongoose";
export interface IProperty {
  title: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  country: string;
  price: number;
  thumbnail?: string;
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
