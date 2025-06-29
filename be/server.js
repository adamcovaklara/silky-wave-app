const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 4000;

app.use(cors());
app.use("/processed", express.static(path.join(__dirname, "processed")));

const upload = multer({ dest: "uploads/" });

app.post("/api/process-image", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const inputPath = req.file.path;
    const outputFilename = `processed_${Date.now()}.png`;
    const outputPath = path.join(__dirname, "processed", outputFilename);

    const colorize = req.query.colorize === "true";

    // Resize for consistency
    const transformer = sharp(inputPath).resize(500).rotate() // <-- THIS auto-rotates based on EXIF

    if (colorize) {
      transformer.tint({ r: 150, g: 100, b: 200 }); // Apply a purple tint
    }

    await transformer.toFile(outputPath);
    fs.unlinkSync(inputPath); // Cleanup uploaded file

    res.json({
      message: "Image processed successfully!",
      processedImageUrl: `http://localhost:${PORT}/processed/${outputFilename}`
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Processing failed." });
  }
});

app.listen(PORT, () => {
  console.log(`Image processing backend running at http://localhost:${PORT}`);
});
