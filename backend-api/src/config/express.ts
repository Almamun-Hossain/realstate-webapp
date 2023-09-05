import express, { Application, ErrorRequestHandler, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "../routes";
import CustomError from "../ErrorHandler/customError";
import globalError from "../ErrorHandler/globalError";
const app: Application = express();

console.log(process.cwd() + "/public");

app.use(express.static(process.cwd() + "/public"));

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//router
app.use("/api/v1", router);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  let error = new CustomError(`Can't find ${req.originalUrl}`, 404);
  next(error);
});

app.use(globalError);
export default app;
