import path from "path";
import z from "zod";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = z
  .object({
    MONGO_URI: z.string(),
    MONGO_USER: z.string(),
    MONGO_PASSWORD: z.string(),

    PORT: z.string().default("4000"),
    JWT_SECRET: z.string(),
    JWT_EXPIRE: z.string(),
    COOKIE_EXPIRE: z.string().transform(Number),

    MAIL_MAILER: z.string(),
    MAIL_SERVICE: z.string(),
    MAIL_HOST: z.string(),
    MAIL_PORT: z.string().transform(Number),
    MAIL_USERNAME: z.string(),
    MAIL_PASSWORD: z.string(),
    MAIL_ENCRYPTION: z.string(),
    MAIL_FROM_ADDRESS: z.string()
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
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    expire: envVars.JWT_EXPIRE
  },
  cookie: {
    expire: envVars.COOKIE_EXPIRE
  },
  mail: {
    mailer: envVars.MAIL_MAILER,
    service: envVars.MAIL_SERVICE,
    host: envVars.MAIL_HOST,
    port: envVars.MAIL_PORT,
    username: envVars.MAIL_USERNAME,
    password: envVars.MAIL_PASSWORD,
    encryption: envVars.MAIL_ENCRYPTION,
    fromAddress: envVars.MAIL_FROM_ADDRESS
  }
};
