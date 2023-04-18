import { getSeatBackgroundColor } from "../Reservation";
const MovieDetail = () => {
  return (
    <div className="w-1/2 mx-auto mt-8 space-y-4">
      <h1 className="text-4xl font-bold">Movie detail</h1>
      <h2 className="text-3xl font-semibold">Sadman 2023</h2>
      <p className="text-lg">Cinema A32</p>

      <h2 className="text-3xl font-bold">Showtimes</h2>
      <ul>
        <li>29 September 2023 - 16:00 <button className="btn btn-info">Detail</button></li>
      </ul>

      <div className="flex justify-end gap-8">
        <button className="btn btn-primary">Add showtime</button>
        <button className="btn btn-error">Delete</button>
      </div>
    </div>
  );
};

export default MovieDetail;
