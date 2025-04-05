import cors from "cors";

export const middlewareCors = () =>
  cors({
    origin: (origin, callback) => {
      if (origin) {
        callback(null, origin);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  });
// This middleware will allow CORS for all origins and methods
