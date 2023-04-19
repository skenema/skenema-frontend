import { useParams } from "react-router-dom";
import { getSeatBackgroundColor } from "../Reservation";
import useSWR from "swr";
import { fetchJSON } from "../../utils";
import { Movie } from "../../types/responses";
const MovieDetail = () => {
  const params = useParams();
  const movieId = params.movieId;
  // No 404 handling on the routing part due to time limit
  const { data: movie, error } = useSWR<Movie>(`/api/movies/${movieId}`, fetchJSON);
  if (error) {
    return (
      <div className="w-1/2 mx-auto mt-8">
        <h1 className="text-4xl font-bold text-error">
          Error: {error.toString()}
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
          <ul>
            <li>
              29 September 2023 - 16:00{" "}
              <button className="btn btn-info">Detail</button>
            </li>
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
