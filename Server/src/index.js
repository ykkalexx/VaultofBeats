import { db } from "./config/db.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", router);

const PORT = process.env.PORT || 3000;

// Test database connection
async function testConnection() {
  try {
    const client = await db.connect();
    console.log("Database connected successfully");
    client.release();
  } catch (err) {
    console.error("Unable to connect to database:", err);
  }
}

testConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
