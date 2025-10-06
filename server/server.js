// server/server.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dbConnect } from "./config/dbConnect.js";
import blogsRouter from "./routes/blogsRoute.js";

// טוען משתני סביבה (בלוקלי). ב-Render מומלץ להגדיר ב-Dashboard.
dotenv.config({ path: "./server/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// __dirname בסביבת ESM (תיקיית הקובץ הנוכחי = server/)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// חיבור למסד (Top-level await נתמך ב-ESM)
await dbConnect();

// בדיקת API
app.get("/", (_req, res) => {
  res.send({ message: "Hello World from MERN Stack Blog Application API" });
});

// ראוטים של בלוגים
app.use("/api/blogs", blogsRouter);

// Production: הגשת קבצי ה-Client (../client/dist)
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "..", "client", "dist");
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Backend Server running on http://localhost:${PORT}`);
});
