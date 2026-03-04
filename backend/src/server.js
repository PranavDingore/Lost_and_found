import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import itemRoutes from "./routes/itemRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// no /api (as you wanted)
app.use("/items", itemRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/items`);
});
