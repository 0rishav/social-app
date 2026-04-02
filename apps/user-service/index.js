import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import http from "http";
import cookieParser from "cookie-parser";
import { connectDB, getDB } from "./src/config/db.js";
import { ErrorMiddleware } from "./src/middlewares/error.js";
import userRouter from "./src/routes/user.routes.js";
// import { trimLabData } from "./src/utils/fillDatabase.js";
import { generateLabData } from "./src/utils/fillDatabase.js";
import { getTopSkills } from "./src/services/user.service.js";
// import "./src/utils/readQuery.js";
// import {
//   findUsersByAge,
//   findUsersByEmailExists,
//   findUsersByExperience,
//   findUsersByIsActive,
//   findUsersByIsDeleted,
//   findUsersByIsPremium,
//   findUsersByName,
//   findUsersBySalary,
//   findUsersBySalaryBetweenXtoY,
//   findUsersByTagsArrayLength,
// } from "./src/utils/readQuery.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API WORKING",
  });
});

app.set("trust proxy", true);

const corsOptions = {
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:5174",
  ],
  credentials: true,
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type, Authorization, Origin, Accept",
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

app.use(cookieParser());

app.use("/api/v1/user", userRouter);

app.use(ErrorMiddleware);

if (process.env.NODE_ENV !== "test") {
  const startServer = async () => {
    try {
      await connectDB();
      // await generateLabData()
      //    await trimLabData();
      //   findUsersByAge()
      //   findUsersByIsActive()
      //   findUsersByIsPremium();
      //   findUsersByName();
      // findUsersBySalary()
      // findUsersByExperience()
      //   findUsersBySalaryBetweenXtoY();
      //   findUsersByIsDeleted();
      //   findUsersByEmailExists();
      // findUsersByTagsArrayLength()
      // const db = getDB();
      // await db.collection("labdata").createIndex({ age: 1 }, { background: true });

      // await db.collection("labdata").createIndex({ age: 1, isActive: 1 , createdAt:-1}, { background: true });

      // console.log("✅ Index on age created")
      getTopSkills()

      server.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
      });
    } catch (err) {
      console.error("Startup failed:", err);
      process.exit(1);
    }
  };

  startServer();
}

export default app;
