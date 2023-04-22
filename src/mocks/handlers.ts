import { DefaultBodyType, PathParams, rest } from "msw";
import {
  APIError,
  Movie,
  Seat,
  Showtime,
  TicketValidationResponse,
} from "../types/responses";
import { movies, showtimes } from "./consts";

export const handlers = [
  rest.get<DefaultBodyType, PathParams, Movie[]>(
    "/api/movies",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(movies));
    }
  ),
  rest.get<DefaultBodyType, { id: string }, Movie | APIError>(
    "/api/movies/:id",
    (req, res, ctx) => {
      const movieId = parseInt(req.params.id, 10);
      const movie = movies.find((m) => m.id === movieId);
      if (movie) {
        return res(ctx.status(200), ctx.json(movie));
      }
      return res(
        ctx.status(404),
        ctx.json({ message: "Movie does not exist" })
      );
    }
  ),
  rest.get<DefaultBodyType, { movieId: string }, Showtime[] | APIError>(
    "/api/reservation/:movieId",
    (req, res, ctx) => {
      const movieId = parseInt(req.params.movieId, 10);
      const movie = movies.find((m) => m.id === movieId);
      if (!movie) {
        return res(
          ctx.status(404),
          ctx.json({ message: "The movie does not exist." })
        );
      }
      return res(ctx.status(200), ctx.json(movie.showtimes));
    }
  ),
  rest.get<
    DefaultBodyType,
    { movieId: string; showtimeId: string },
    Seat[] | APIError
  >("/api/reservation/:movieId/:showtimeId", (req, res, ctx) => {
    const movieId = parseInt(req.params.movieId, 10);
    const movie = movies.find((m) => m.id === movieId);
    if (!movie) {
      return res(
        ctx.status(404),
        ctx.json({ message: "The movie does not exist." })
      );
    }
    const showtimeId = parseInt(req.params.showtimeId, 10);
    const showtime = movie.showtimes.find((s) => s.id === showtimeId);
    if (!showtime) {
      return res(
        ctx.status(404),
        ctx.json({ message: "There is no showtime." })
      );
    }
    const seats = showtimes[showtimeId];
    return res(ctx.status(200), ctx.json(seats));
  }),
  rest.post<{ seat_id: number[] }, { movieId: string; showtimeId: string }, {}>(
    "/api/reservation/:movieId/:showtimeId",
    (req, res, ctx) => {
      const movieId = parseInt(req.params.movieId, 10);
      const movie = movies.find((m) => m.id === movieId);
      if (!movie) {
        return res(
          ctx.status(404),
          ctx.json({ message: "The movie does not exist." })
        );
      }
      const showtimeId = parseInt(req.params.showtimeId, 10);
      const showtime = movie.showtimes.find((s) => s.id === showtimeId);
      if (!showtime) {
        return res(
          ctx.status(404),
          ctx.json({ message: "There is no showtime." })
        );
      }
      const seats = showtimes[showtimeId];
      return res(ctx.status(200), ctx.json(seats));
    }
  ),
  rest.get<DefaultBodyType, PathParams, TicketValidationResponse | APIError>(
    "/api/ticket/validate-ticket",
    (req, res, ctx) => {
      const ticketId = req.url.searchParams.get("ticketId");
      if (!ticketId) {
        return res(ctx.status(400), ctx.json({ message: "invalid param" }));
      }

      if (!/^\d+$/.test(ticketId)) {
        return res(ctx.status(400), ctx.json({ message: "invalid param" }));
      }
      // ticket can be validated now.
      // In this mock, if ticket ID is 3, it is expired.
      const ticketNum = parseInt(ticketId, 10);
      if (ticketNum === 3) {
        return res(
          ctx.status(403),
          ctx.json({ message: "Expired ticket", code: "ticket_expired" })
        );
      }
      return res(
        ctx.status(200),
        ctx.json({
          id: ticketNum,
          seatNumber: 9,
          cinema: "A32",
          showtime: new Date(2023, 10, 12, 16, 30).toISOString(),
        })
      );
    }
  ),
];

