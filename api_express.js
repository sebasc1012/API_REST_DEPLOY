import express, { json } from "express";
import { moviesRouter } from "./routes/movies.js";
import { middlewareCors } from "./middleware/cors.js";

const app = express();
const PORT = process.env.PORT || 4321;
const HOST = "0.0.0.0";
app.disable("x-powered-by");
app.use(json()); // midewire for json
app.use(middlewareCors()); // middleware for CORS
app.use("/movies", moviesRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
