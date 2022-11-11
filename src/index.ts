import express from "express";
import logger from "morgan";
import helmet from "helmet";

const app = express();
app.use(helmet());
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

export default app;
