import { Link, useLocation, useNavigate } from "react-router-dom";
import { Movie, Showtime } from "../types/responses";
import { getCustomDateFormat } from "../utils";
import { FormEventHandler, MouseEventHandler } from "react";

const Confirm = () => {
  const selectedSeat: number[] = useLocation().state.seat;
  const movie: Movie = useLocation().state.movie;
  const showtime: Showtime = useLocation().state.showtime;
  const date = new Date(showtime.start_time);
  const navigate = useNavigate();

  const handleSubmitReservation: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    fetch(`/api/reservation/${movie.id}/${showtime.showtime_id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seat_id: selectedSeat }),
    }).then((res) => {
      if (res.ok) {
        navigate("/movie/summary", {
          state: {
            selectedSeat: selectedSeat,
            title: movie.title,
            showtime: showtime,
          },
        });
      }
    });
  };

  const detailTable = (prefix: string, detail: string) => {
    return (
      <div className="grid grid-cols-[10%,90%] text-2xl mt-10">
        <div className="flex justify-center">{prefix}</div>
        <div className="flex justify-end">{detail}</div>
      </div>
    );
  };
  return (
    <div className="p-3 flex justify-center">
      <div className="w-[60vw] h-[80vh] bg-gray-100 p-[5rem] relative">
        <div className="grid grid-cols-[20%,80%] gap-20">
          <div className="bg-black w-[10rem] h-[10rem]"></div>
          <p className="text-center w-full text-4xl flex items-center justify-center">
            {movie.title}
          </p>
        </div>
        <div className="mt-10 ">
          {detailTable("Cinema", movie.cinema)}
          {detailTable(
            "Seat",
            selectedSeat
              .sort((a, b) => a - b)
              .map((s) => s.toString())
              .join(", ")
          )}
          {detailTable("Showtime", getCustomDateFormat(date))}
        </div>
          <button onClick={handleSubmitReservation} className="btn btn-active btn-primary absolute bottom-3 right-3">
            ยืนยัน
          </button>
      </div>
    </div>
  );
};

export default Confirm;
