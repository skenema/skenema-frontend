import type { Movie, Seat, ShowtimeReservation } from "./types";

// TODO: Use date for start time
export const movies: Movie[] = [
  {
    id: "UUID12",
    title: "Sadman 2023",
    description: "Sad",
    cinema: "A32",
    showtimes: [{ id: "SD123", startTime: "15:30" }],
  },
  {
    id: "UUID39",
    title: "Chainsaw Meow",
    description: "Chainsaw Time",
    cinema: "A32",
    showtimes: [{ id: "SD124", startTime: "16:30" }],
  },
  {
    id: "UUID38",
    title: "Chainsaw Meow 2",
    description: "Chainsaw Time but second chance",
    cinema: "A12",
    showtimes: [{ id: "SD134", startTime: "17:30" }],
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
