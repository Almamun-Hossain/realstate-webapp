import { Schema, model } from "mongoose";
import { toJSON } from "./plugin/toJSON.plugin";
import { IListingTypes } from "../interface/listing_types.interface";

const ListingTypesSchem = new Schema<IListingTypes>(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

ListingTypesSchem.plugin(toJSON);

const ListingTypesModel = model<IListingTypes>("ListingTypes", ListingTypesSchem);

export default ListingTypesModel;
