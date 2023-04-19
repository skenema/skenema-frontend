import { Link, useParams } from "react-router-dom";
import { getSeatBackgroundColor } from "../Reservation";
import useSWR from "swr";
import { fetchJSON, getCustomDateFormat } from "../../utils";
import { Movie, Showtime } from "../../types/responses";
const MovieDetail = () => {
  const params = useParams();
  const movieId = params.movieId;
  // No 404 handling on the routing part due to time limit
  const { data: movie, error: movieError } = useSWR<Movie>(`/api/movies/${movieId}`, fetchJSON);
  const { data: showtimes, error: showtimeError} = useSWR<Showtime[]>(`/api/reservation/${movieId}`, fetchJSON)
  if (movieError) {
    return (
      <div className="w-1/2 mx-auto mt-8">
        <h1 className="text-4xl font-bold text-error">
          Error: {movieError.toString()}
        </h1>
      </div>
    );
  }
  return (
    <div className="w-1/2 mx-auto mt-8 space-y-4">
      {!movie && <p>Loading...</p>}
      {movie && (
        <>
          <h1 className="text-4xl font-bold">Movie detail</h1>
          <h2 className="text-3xl font-semibold">{movie.title}</h2>
          <p className="text-lg">Cinema {movie.cinema}</p>

          <h2 className="text-3xl font-bold">Showtimes</h2>
          {showtimeError && <p className="text-error">{showtimeError.toString()}</p>}
          {(!showtimeError && !showtimes) && <p>Loading...</p>}
          <ul>
          {showtimes && showtimes.map(showtime => (
            <li key={showtime.id}>
              {getCustomDateFormat(new Date(showtime.start_time))}{" "}
              <button className="btn btn-info">Detail</button>
            </li>
          ))}
          </ul>

          <div className="flex justify-end gap-8">
            <button className="btn btn-primary">Add showtime</button>
            <button className="btn btn-error">Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
