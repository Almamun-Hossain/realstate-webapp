import { object, string } from "zod";

const body = object({
  name: string(),
  email: string().email(),
  phoneNumber: string(),
  password: string().min(8)
});

const params = object({
  userId: string()
});

export const createUserValidator = object({ body });
export const getUserInfoValidator = object({ params });
export const updateUserValidator = object({ body, params });
export const deleteUserValidator = object({ params });
