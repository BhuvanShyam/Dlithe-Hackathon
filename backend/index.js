import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRoutes from "./routes/authRoutes.js";
import buyerDashboardRoutes from "./routes/buyerDashboard.js";
import farmerDashboardRoutes from "./routes/farmerdashboardRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import cropRoutes from "./routes/cropRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import contractRoutes from "./routes/contractRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/buyerDashboard", buyerDashboardRoutes);
app.use("/api/v1/farmerdashboard", farmerDashboardRoutes);
app.use("/api/v1/notification", notificationRoutes);
app.use("/api/v1/crop", cropRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/request", requestRoutes);
app.use("/api/v1/contract", contractRoutes);

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
