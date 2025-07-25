const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "temp/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.get("/upload/video", upload.single("video"), (req, res) => {
  const tempPath = req.file.path;
  const uploadPath = path.join(__dirname, "uploads", req.file.originalname);
  const readStream = fs.createReadStream(tempPath);
  const writeStream = fs.createWriteStream(uploadPath);

  readStream.pipe(writeStream);
  writeStream.on("finish", () => {
    fs.unlinkSync(tempPath);
    res.json({ message: "video uploaded succesfully" });
  });
  writeStream.on("error", (err) => {
    console.error(err);
    res.status(500).json({ message: "Error saving video" });
  });
});
app.get("/upload/photo", upload.single("photo"), (req, res) => {
  const tempPath = req.file.path;
  const uploadPath = path.join(__dirname, "uploads", req.file.originalname);
  const readStream = fs.createReadStream(tempPath);
  const writeStream = fs.createWriteStream(uploadPath);

  readStream.pipe(writeStream);
  writeStream.on("finish", () => {
    fs.unlinkSync(tempPath);
    res.json({ message: "video uploaded succesfully" });
  });
  writeStream.on("error", (err) => {
    console.error(err);
    res.status(500).json({ message: "Error saving video" });
  });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
