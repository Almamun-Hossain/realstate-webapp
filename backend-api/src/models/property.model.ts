import { Schema, Types, model } from "mongoose";
import { IProperty } from "../interface/property.interface";
import { toJSON } from "./plugin/toJSON.plugin";

const PropertySchema = new Schema<IProperty>(
  {
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
    },
    property_types: {
      type: Types.ObjectId,
      ref: "PropertyTypes"
    },
    property_size: {
      type: Number,
      required: true
    },
    block_size: {
      type: Number,
      required: true
    },
    num_bedrooms: {
      type: Number,
      required: true
    },
    num_bathrooms: {
      type: Number,
      required: true
    },
    num_carspace: {
      type: Number,
      required: true
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

PropertySchema.plugin(toJSON);

let PropertyModel = model<IProperty>("Property", PropertySchema);
export default PropertyModel;
