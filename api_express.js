const express = require("express");
const movies = require("./movies.json");
const crypto = require("node:crypto");
const app = express();
const PORT = process.env.PORT ?? 4321;
const { validateSquema, validateEditSquema } = require("./squemas/movieSquema");
app.disable("x-powered-by");

app.use(express.json()); // midewire for json

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Express</h1>");
});

app.get("/movies", (req, res) => {
  // Allow CORS
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  const { genre } = req.query;

  if (genre) {
    const genderMovie = movies.filter((gender) =>
      gender.Genre.toLowerCase().includes(genre.toLowerCase())
    );
    return res.json(genderMovie);
  }
  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.imdbID === id);
  if (movie) return res.json(movie);
  res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => {
  // validate the request body
  const result = validateSquema(req.body);
  if (result.error) {
    return res.status(422).json({ message: JSON.parse(result.error.message) });
  }
  const newMovie = {
    imdbID: crypto.randomUUID(), // create a unique
    ...result.data, // data from the request
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.patch("/movies/:id", (req, res) => {
  const resul = validateEditSquema(req.body);
  if (resul.error) {
    return res.status(422).json({ message: JSON.parse(resul.error.message) });
  }
  const { id } = req.params;

  const movieFind = movies.findIndex((movie) => movie.imdbID === id);

  // validation to know if the movie exists
  if (movieFind === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  const updateMovie = {
    ...movies[movieFind],
    ...resul.data,
  };

  movies[movieFind] = updateMovie;
  res.status(200).json(updateMovie);
});

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const findMovie = movies.findIndex((movie) => {
    return movie.imdbID === id;
  });
  if (findMovie === -1) {
    // validation to know if the movie exists
    return res.status(404).json({ message: "Movie not found" });
  }
  movies.splice(findMovie, 1);
  res.status(204).json({ message: "Movie deleted" });
});

// CORS middleware app.options help ud to allow the PUT PATCH POST petitions dosent have problems with CORS
app.options("/movies/:id", (req, res) => {
  const origin = req.get("origin"); // Correct way to get the origin
  if (origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    res.header("Access-Control-Allow-Headers", "Content-Type");
  }
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
