const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const readStream = fs.createReadStream(path.join(__dirname, "input.txt"), {
  encoding: "utf-8",
});

readStream.on("data", (chunk) => {
  console.log("chunk received: ", chunk);
});

readStream.on("end", () => {
  console.log("finished reading");
});

readStream.on("error", (err) => {
  console.log("Ooops Error occured: ", err);
});

// app.listen(3000, () => {
//   console.log("server is listening oon port 3000");
// });
