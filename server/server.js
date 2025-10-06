// server/server.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dbConnect } from "./config/dbConnect.js";
import blogsRouter from "./routes/blogsRoute.js";
import Blog from "./models/blogModel.js"; // ← בשביל syncIndexes (TTL)

// טען .env רק כשלא בפרודקשן
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./server/.env" });
}

const app = express();
const PORT = process.env.PORT || 5000;

// __dirname ב-ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// חיבור למסד
await dbConnect();

// ודא שאינדקסי המודל מסונכרנים (TTL וכו')
await Blog.syncIndexes();

// בריאות/בדיקה
app.get("/", (_req, res) => {
  res.send({ message: "Hello World from MERN Stack Blog Application API" });
});

// API
app.use("/api/blogs", blogsRouter);

// Production: הגשת ה-Client (../client/dist)
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
