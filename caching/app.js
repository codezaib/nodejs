const { default: axios } = require("axios");
const express = require("express");
const app = express();
const Redis = require("redis");
const redisClient = Redis.createClient();
const DEFAULT_EXPIRATION = 3600;
redisClient.on("error", (err) => console.error("Redis Client Error", err));
redisClient.connect();
app.get("/photos", async (req, res) => {
  const albumId = req.query.albumId;
  const photos = await getSetRedis(`photos?albumId=${albumId}`, async () => {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/photos",
      { params: { albumId } }
    );
    if (!data) {
      throw new Error("could nor fetch data");
    }
    return data;
  });
  res.json(photos);
});

app.get("/photos/:id", async (req, res) => {
  const photoId = req.params.id;
  const photo = await getSetRedis(`photos:${photoId}`, async () => {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/photos/${photoId}`
    );
    if (!data) throw new Error("could not fetch photo");
    return data;
  });
  res.json(photo);
});

const getSetRedis = async (key, cb) => {
  const data = await redisClient.get(key);
  if (data) return JSON.parse(data);
  const result = await cb();
  await redisClient.set(key, JSON.stringify(result), {
    EX: DEFAULT_EXPIRATION,
  });
  return result;
};
app.listen(3000, () => console.log("server is listening on port 3000"));
