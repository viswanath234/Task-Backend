import "reflect-metadata";

import express, { Request, Response, Express } from "express";
import { addRoutes } from "./src/config/routes.config";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { responseFormatter } from "./src/middleware/responseFormatter.middleware";
import cors, { CorsOptions } from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: "https://task-frontend-theta-lac.vercel.app",
    credentials: true,
  })
);

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(responseFormatter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the backend server!");
});

addRoutes(app);

async function bootstrap() {
  try {
    await mongoose.connect(process.env.DATABASE_URL || "", {
      dbName: process.env.DATABASE_NAME,
    });
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Backend server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

bootstrap();
