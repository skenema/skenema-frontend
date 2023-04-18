import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { Link, useLocation } from "react-router-dom";
import { allSeat } from "../mocks/seat";
import { Movie, Seat, Showtime } from "../types/responses";
import { fetchJSON } from "../utils";

export function getSeatBackgroundColor(
  isReserving: boolean,
  isAvailable: boolean
): string {
  if (!isAvailable) {
    return "#986AD3";
  }
  return isReserving ? "#dbd118" : "#A94545";
}

const Reservation = () => {
  const movie: Movie = useLocation().state.movie;
  const showtime: Showtime = useLocation().state.showtime;
  const { data: seats, error } = useSWR<Seat[]>(
    `/api/reservation/${movie.id}/${showtime.id}`,
    fetchJSON
  );

  // A bit inefficient but it is probably OK for a small project.
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  function reserveSeat(seatId: number) {
    if (selectedItems.includes(seatId)) {
      setSelectedItems((s) => s.filter((s) => s != seatId));
    } else {
      setSelectedItems((s) => [...s, seatId]);
    }
  }

  return (
    <div className="p-3 flex justify-center">
      <div className="w-[60vw] h-[80vh] bg-gray-100 p-[5rem] relative">
        <div className="grid grid-cols-[20%,80%] gap-20">
          <div className="bg-black w-[10rem] h-[10rem]"></div>
          <p className="text-center w-full text-4xl flex items-center justify-center">
            {movie.title}
          </p>
        </div>
        <div className="gap-2 grid grid-cols-12 auto-rows-[3rem] mt-[3rem] items-center">
          {error && <p>{error.toString()}</p>}
          {!seats && <p>Loading</p>}
          {seats &&
            seats.map((seat, id) => {
              return (
                <div
                  key={seat.seat_id}
                  data-id={seat.seat_id}
                  className="h-[2rem] w-[2rem] cursor-pointer"
                  onClick={
                    seat.is_available
                      ? () => reserveSeat(seat.seat_id)
                      : undefined
                  }
                  style={{
                    backgroundColor: getSeatBackgroundColor(selectedItems.includes(seat.seat_id), seat.is_available),
                  }}
                ></div>
              );
            })}
        </div>
        <div className="mt-6">
          <p className="text-lg font-semibold">Selected Items:</p>
          <ul className="flex gap-2 font-medium">
            {selectedItems.sort((a, b) => a - b).map((itemId) => (
              <li key={itemId}>{itemId}</li>
            ))}
          </ul>
        </div>
        <Link
          to={`/movie/confirm`}
          state={{ seat: selectedItems, movie: movie, showtime: showtime }}
        >
          <button disabled={selectedItems.length === 0} className="btn btn-active btn-primary absolute bottom-3 right-3">
            ยืนยัน
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Reservation;
