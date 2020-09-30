import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import userRoutes from "./routes/user";
import nats from "./controllers/nats.user.controller";
dotenv.config();
nats();

const app = express();
app.use(bodyParser.json());
app.use("/", userRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`User service is listening on the port ${PORT}`);
});
