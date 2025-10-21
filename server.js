import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5173;

// STATIC FILES
app.use(express.static(path.resolve(__dirname, "dist"), {
  extensions: ["html", "htm"],
}));

// SPA fallback
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(port, () => console.log(`✅ Server running on port ${port}`));
