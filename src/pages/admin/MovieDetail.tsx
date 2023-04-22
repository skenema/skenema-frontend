import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetchJSON, getCustomDateFormat } from "../../utils";
import { Movie, Showtime } from "../../types/responses";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { useState } from "react";
import dayjs from 'dayjs'
const MovieDetail = () => {
  const params = useParams();
  const movieId = params.movieId;
  const [date, setDate] = useState(dayjs())
  const handleDateChange =(v: dayjs.Dayjs | null) => {
    setDate(v as dayjs.Dayjs)
  }
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
            </li>
          ))}
          </ul>

          <form className="form-control">
            <label className="label">Start Time</label>
            <DateTimePicker value={date} onChange={handleDateChange} />
            <input type="submit" value="Add showtime" className="btn btn-primary ml-auto max-w-xs"></input>
          </form>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
