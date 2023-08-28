import app from "./config/express";
import { connectDb } from "./config/mongoose";
import variables from "./config/variables";

connectDb();

app.listen(variables.port, () => {
  console.log(`Server started on http://localhost:${variables.port}`);
});
