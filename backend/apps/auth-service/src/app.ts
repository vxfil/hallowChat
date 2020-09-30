import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route";
import nats from "./controllers/nats.auth.controller";

dotenv.config();
nats();

const app = express();
app.use(bodyParser.json());
app.use("/", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () =>
  console.log(`Auth service is listening on port ${PORT}`)
);
