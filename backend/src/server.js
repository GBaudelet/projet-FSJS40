import "dotenv/config";
import express from "express";

import cors from "cors";

import router from "./router/index.routes.js";

const app = express();
const PORT = process.env.LOCAL_PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(["/api/v1", "/"], router);

app.listen(PORT, () =>
  console.log(`Server is running at http://localhost:${PORT}`)
);
