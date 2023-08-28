import { Schema, model } from "mongoose";
import { IProperty } from "../interface/property.interface";

const PropertySchema = new Schema<IProperty>({
  title: {
    required: [true, "Property title is missing"],
    type: String
  },
  address_line1: {
    required: true,
    type: String
  },
  address_line2: {
    required: false,
    default: null,
    type: String
  },
  city: {
    required: true,
    type: String
  },
  country: {
    required: true,
    type: String
  },
  price: {
    required: true,
    type: Number
  },
  thumbnail: {
    type: String,
    required: false,
    default: null
  }
});

let PropertyModel = model<IProperty>("Property", PropertySchema);
export default PropertyModel;
