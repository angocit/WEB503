import express from "express";
const app = express();
const port = 4000;
const videos = [
  {
    id: 1,
    title: "An apple mobile which is nothing like apple&quot",
    duration: "12:05",
    thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg&quot",
  },
  {
    id: 2,
    title: "Samsung Universe 9",
    duration: "10:25",
    thumbnail: "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg&quot",
  },
  {
    id: 3,
    title: "Samsung Galaxy Book",
    duration: "06:51",

    thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg&quot",
  },
];

app.get("/videos", (req, res) => {
  res.json(videos);
});
app.listen(port, () => {
  console.log(`Endpoint http://localhost:${port}/videos`);
});
