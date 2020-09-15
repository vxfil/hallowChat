import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/user";
import nats from "./controllers/nats.user.controller";

dotenv.config();
nats();

mongoose.connect(`${process.env.MONGO_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));

const app = express();
app.use(bodyParser.json());
app.use("/", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`User service is listening on the port ${PORT}`);
});
