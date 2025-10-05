// server/server.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { dbConnect } from "./config/dbConnect.js";
import blogsRouter from "./routes/blogsRoute.js";

// טוען משתני סביבה (שים לב לנתיב)
dotenv.config({ path: "./server/.env" });

const app = express();
const PORT = process.env.PORT || 5000;

// כדי להשתמש ב-__dirname ב-ESM
// (path.resolve() מספיק כאן כי אנחנו רוצים את תיקיית העבודה הנוכחית)
const __dirname = path.resolve();

// בקשות JSON
app.use(express.json());

// חיבור למסד
await dbConnect();

// בדיקה בסיסית
app.get("/", (_req, res) => {
  res.send({ message: "Hello World from MERN Stack Blog Application API" });
});

// ראוטים של בלוגים
app.use("/api/blogs", blogsRouter);

/**
 * Production: הגשת קבצי ה-Client הסטטיים
 * נניח שהתיקייה client/dist נמצאת בשורש הפרויקט (אח לרמת server/)
 * אם ה-client בתוך השורש לצד server/, צריך ../client/dist
 * אל תתחיל במחרוזת עם "/" כדי ש-path.join לא יזרוק את __dirname.
 */
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "../client/dist");
  app.use(express.static(clientDist));

  // כל ראוט שלא תואם ל-API יחזיר את index.html של ה-Client (SPA fallback)
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Backend Server running on http://localhost:${PORT}`);
});
