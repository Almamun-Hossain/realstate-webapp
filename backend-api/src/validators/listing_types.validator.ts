import { object, string } from "zod";

let body = object({
  name: string()
});
let params = object({
  listingTypesId: string()
});

export const getListingTypesValidator = object({ params });
export const createListingTypesValidator = object({ body });
export const updateListingTypesValidator = object({ body, params });
export const deleteListingTypesValidator = object({ params });
