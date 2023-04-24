import { Link, useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetchJSON, getCustomDateFormat } from "../../utils";
import { Movie, Showtime } from "../../types/responses";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import dayjs from 'dayjs'
import { authAtom } from "../../auth";
import { useAtom } from "jotai";
const MovieDetail = () => {
  const navigate = useNavigate()
  const [accessToken] = useAtom(authAtom)
  const params = useParams();
  const movieId = params.movieId;
  const [numSeats, setNumSeats] = useState(0)
  const [date, setDate] = useState(dayjs())
  const handleDateChange =(v: dayjs.Dayjs | null) => {
    setDate(v as dayjs.Dayjs)
  }
  const handleNumSeatsChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNumSeats(parseInt(e.target.value, 10))
  }

  const handleSubmit: FormEventHandler = (e) => {

    e.preventDefault()
    console.log(accessToken)
    fetch(`/api/reservation/${movieId}/create`,  {
      method: "post",
      headers: {
        'Content-Type': "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        // TODO: Use input number instead
        amount_of_seats: numSeats,
        start_time: date.toISOString()
      })
    } ).then(res => {
      if (res.status === 401 || res.status === 403) {
        navigate("/login")
      }
      if (res.ok) {
      navigate(-1)
      }
    })
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
          {(showtimes) && showtimes.length == 0 && <p className="text-info">There is no showtime for this movie.</p>}
          {(showtimes && showtimes.length > 1) && (
          <ul>
          {showtimes && showtimes.map(showtime => (
            <li key={showtime.showtime_id}>
              {getCustomDateFormat(new Date(showtime.start_time))}{" "}
            </li>
          ))}
          </ul>
          )
           }

          <form onSubmit={handleSubmit} className="form-control">
            <label className="label" htmlFor="num-seats">Number of seats</label>
            <input value={numSeats} onChange={handleNumSeatsChange} type="number" min={1} max={30} id="num-seats" className="input input-bordered" />
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
