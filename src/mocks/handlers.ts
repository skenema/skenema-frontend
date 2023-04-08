import { DefaultBodyType, PathParams, rest } from "msw";
import type { Movie } from "./types";

// TODO: Use date for start time
export const movies: Movie[] = [
    {
        id: "UUID12",
        title: "Sadman 2023",
        description: "Sad",
        cinema: "A32",
        showtimes: [{ id: "SD123", startTime: "15:30" }],
    },
    {
        id: "UUID39",
        title: "Chainsaw Meow",
        description: "Chainsaw Time",
        cinema: "A32",
        showtimes: [
            {id: "SD124", startTime: "16:30"}
        ]
    },
    {
        id: "UUID38",
        title: "Chainsaw Meow 2",
        description: "Chainsaw Time but second chance",
        cinema: "A12",
        showtimes: [
            {id: "SD134", startTime: "17:30"}
        ]
    },
];

// TODO: Do seats

export const handlers = [
  rest.get<DefaultBodyType, PathParams, Movie[]>("/movies", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(movies)
    );
  }),
  // TODO: Include other services
];
