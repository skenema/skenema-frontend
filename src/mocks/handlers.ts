import { DefaultBodyType, PathParams, rest } from "msw";
import { APIError, Movie, Seat } from "./types";
import { movies, showtimes } from "./consts";

export const handlers = [
  rest.get<DefaultBodyType, PathParams, Movie[]>("/api/movies", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(movies));
  }),
  rest.get<DefaultBodyType, {id: string}, Movie | APIError>("/api/movies/:id", (req, res, ctx) => {
    const movieId = req.params.id
    const movie = movies.find(m => m.id === movieId)
    if (movie) {
        return res(ctx.status(200), ctx.json(movie))
    }
    return res(ctx.status(404), ctx.json({"message": "Movie does not exist"}))
  }),
  rest.get<DefaultBodyType, {id: string}, Seat[] | APIError>("/api/showtimes/:id", (req, res, ctx) => {
    const showtimeId = req.params.id
    const showtime = showtimes[showtimeId]
    if (showtime) {
        return res(ctx.status(200), ctx.json(showtime))
    }
    return res(ctx.status(404), ctx.json({"message": "Invalid showtime"}))
  })

  // TODO: Include other services
];
