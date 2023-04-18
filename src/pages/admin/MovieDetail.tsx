import { getSeatBackgroundColor } from "../Reservation";
const seats = Array(10).fill(9).map((x, index) => ({seat_id: index, is_available: true}))
const MovieDetail = () => {
    return (
        <div className="w-1/2 mx-auto mt-8 space-y-4">
            <h1 className="text-4xl font-bold">Movie detail</h1>
            <h2 className="text-3xl font-semibold">Sadman 2023</h2>
            <p className="text-lg">Cinema A32</p>
        <div className="gap-2 grid grid-cols-12 auto-rows-[3rem] mt-[3rem] items-center">
{seats &&
            seats.map((seat, id) => {
              return (
                <div
                  key={seat.seat_id}
                  data-id={seat.seat_id}
                  className="h-[2rem] w-[2rem] cursor-pointer"
                  style={{
                    backgroundColor: getSeatBackgroundColor(false, seat.is_available),
                  }}
                ></div>
              );
            })}
        </div>
        <div className="flex justify-end gap-8">
           <button className="btn btn-error" >Delete</button>
        </div>

        </div>
    )
}

export default MovieDetail
