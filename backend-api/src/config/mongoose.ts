import mongoose from "mongoose";
import variables from "./variables";

mongoose.connection.on("error", (err) => {
  console.log("Error on database connection establishing" + err);
  process.exit(-1);
});

export const connectDb = () => {
  mongoose
    .connect(`mongodb+srv://${variables.mongoose.username}:${variables.mongoose.password}@${variables.mongoose.uri}`, {
      dbName: "PropertyManegment"
    })
    .then(() => console.log("Database connection established"));
};
