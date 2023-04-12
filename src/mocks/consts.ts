import type { Movie, Seat, ShowtimeReservation } from "./types";

// TODO: Use date for start time
export const movies: Movie[] = [
  {
    id: 1,
    title: "Sadman 2023",
    description: "Sad",
    cinema: "A32",
    showtimes: [{ id: "SD123", start_time: '2023-04-23T09:30:00.000Z' }],
  },
  {
    id: 2,
    title: "Chainsaw Meow",
    description: "Chainsaw Time",
    cinema: "A32",
    showtimes: [{ id: "SD124", start_time: "2023-04-24T09:30:00.000Z" }],
  },
  {
    id: 3,
    title: "Chainsaw Meow 2",
    description: "Chainsaw Time but second chance",
    cinema: "A12",
    showtimes: [{ id: "SD134", start_time: "2023-04-24T09:30:00.000Z" }],
  },
];
// Modified from ChatGPT output
function generateSeatNumber(alphabet: string, num: number): string[] {
  const seatNumbers: string[] = [];
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const startNum = 1;
  const endNum = startNum + num - 1;

  for (let i = startNum; i <= endNum; i++) {
    const seatNum = `${alphabet}${i.toString().padStart(2, "0")}`;
    seatNumbers.push(seatNum);
  }

  return seatNumbers;
}
// We have A - H and 01 to 20
const allAvailableSeat = "ABCDEFGH"
  .split("")
  .flatMap((alphabet) => generateSeatNumber(alphabet, 20))
  .map((seat) => ({ seatNumber: seat, isAvailable: true } as Seat));
export const showtimes = {
  [movies[0].showtimes[0].id]: [...allAvailableSeat],
  [movies[1].showtimes[0].id]: [...allAvailableSeat],
  [movies[2].showtimes[0].id]: [...allAvailableSeat],
};
