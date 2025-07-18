import express from "express";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const port = 3000;
const server = app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.status(201).send("Hello this is my website");
});
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("new user connected");
  socket.emit("newMessage", "<h1>this is response from socket</h1>");
  socket.on("message", (message) => {
    console.log("new message");
    io.emit("response", "yes i know this is your message");
  });
  socket.on("disconnect", () => {
    console.log("user disonnected");
  });
});
