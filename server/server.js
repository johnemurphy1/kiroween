import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { login, signup } from "./auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// API
app.post("/api/signup", signup);
app.post("/api/login", login);

// Serve frontend
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname, "../dist/index.html"))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
