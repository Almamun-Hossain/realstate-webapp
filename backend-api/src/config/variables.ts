import path from "path";
import z from "zod";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = z
  .object({
    MONGO_URI: z.string(),
    MONGO_USER: z.string(),
    MONGO_PASSWORD: z.string(),

    PORT: z.string().default("4000")
  })
  .required();

const parsedEnv = envVarsSchema.parse(process.env);

let envVars = {
  ...parsedEnv,
  PORT: parseInt(parsedEnv.PORT)
};

export default {
  port: envVars.PORT,
  mongoose: {
    username: envVars.MONGO_USER,
    password: envVars.MONGO_PASSWORD,
    uri: envVars.MONGO_URI
  }
};
