const z = require("zod");

const movieSquema = z.object({
  Title: z.string(),
  Year: z.string(),
  Rated: z.string(),
  title: z.string(),
  Runtime: z.string(),
  Genre: z.string(),
  Director: z.string(),
  Writer: z.string(),
  Actors: z.string(),
  Plot: z.string(),
  Language: z.string(),
  Country: z.string(),
  Awards: z.string(),
  imdbRating: z.string(),
  imdbVotes: z.string(),
  Type: z.string(),
  totalSeasons: z.string(),
});

function validateSquema(objet) {
  return movieSquema.safeParse(objet);
}
// partial() allows to validate only some properties of the object
// this is useful when we want to update an object
function validateEditSquema(obj) {
  return movieSquema.partial().safeParse(obj);
}

module.exports = { validateSquema, validateEditSquema };
