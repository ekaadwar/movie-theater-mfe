const express = require("express");
const moviesData = require("./moviesData.json");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5555;

app.use(cors());
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "public/images")));

app.get("/movies", (req, res) => {
  res.json(moviesData);
});

app.get("/movies/:id", (req, res) => {
  const movieId = Number(req.params.id);

  const movie = moviesData.find((item) => item.id === movieId);

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found",
    });
  }

  return res.json(movie);
});

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}`);
});
