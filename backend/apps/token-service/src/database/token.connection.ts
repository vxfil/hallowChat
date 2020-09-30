import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default function () {
  mongoose.connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
}
