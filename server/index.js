import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/AuthRouter.js";
import gigRoutes from "./routes/GigRoutes.js";
import { orderRoutes } from "./routes/OrderRoutes.js";
import { messageRoutes } from "./routes/MessageRoutes.js";
import { dashboardRoutes } from "./routes/DashboardRoutes.js";

dotenv.config();

const app = express();
const post = process.env.POST;
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});

const corsOptions = {
  origin: [process.env.ORIGIN],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/uploads", express.static("uploads"));
app.use("/uploads/profiles", express.static("uploads/profiles"));

app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.listen(post, () => {
  console.log(`Server is running at http://localhot:${post}`);
});
