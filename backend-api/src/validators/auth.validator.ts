import { object, string } from "zod";

let body = object({
  email: string().email(),
  password: string().min(8)
});

export const loginValidator = object({ body });
