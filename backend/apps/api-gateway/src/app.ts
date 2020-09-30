import express from "express";
import createError from "http-errors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import usersRouter from "./routes/users";
import authRouter from "./routes/auth";
import errorMiddleware from "./middlewares/error.middleware";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  next(createError(404));
});
app.use(errorMiddleware);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Api-gateway is listening on the port ${PORT}`);
});
