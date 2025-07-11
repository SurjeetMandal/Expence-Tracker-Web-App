require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const incomeRoute = require("./routes/incomeRoutes");
const expenceRoute = require("./routes/expenceRoutes");
const dashboardRoute = require("./routes/dashboardRoutes");

const app = express();

// ✅ Define your allowed origin (frontend URL)
const allowedOrigin = "https://expence-tracker-web-app-frontend.onrender.com";

// ✅ Enable CORS
app.use(cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

// ✅ Handle preflight requests
app.options("*", cors());

// ✅ Body parser
app.use(express.json());

// ✅ Connect to DB
connectDB();

// ✅ Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoute);
app.use("/api/v1/expence", expenceRoute);
app.use("/api/v1/dashboard", dashboardRoute);

// ✅ Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
