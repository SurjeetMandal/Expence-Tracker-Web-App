require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes")
const incomeRoute = require("./routes/incomeRoutes")
const expenceRoute = require("./routes/expenceRoutes")
const dashboardRoute = require("./routes/dashboardRoutes")

const app = express()

//Middleware to handle CORS
app.use(
    cors({
        origin:process.env.CLIENT_URL || "*",
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    })
);

app.use(express.json())

connectDB()

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/income", incomeRoute)
app.use("/api/v1/expence", expenceRoute)
app.use("/api/v1/dashboard", dashboardRoute)

//Server upload folder
app.use("/uploads",express.static(path.join(__dirname, "uploads")))

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
