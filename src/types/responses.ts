export interface Showtime {
    id: number;
    start_time: string; // Python convention
}
export interface Movie {
    id: number;  // Use this ID as key. Do not ever render it.
    title: string;
    description: string;
    cinema: string;
    // showtimes: Showtime[];
}

export interface ShowtimeReservation {
    id: string; // Assume UUID
    seats: Seat[]
}

export interface Seat {
    seatNumber: string; // Imagine H02 or something like that.
    isAvailable: boolean;
}

export const enum TicketStatus {
    Valid,
    Expired,
    Invalid
}

export interface Ticket {
    id: string;
    seatTicket: string; // Same as seatNumber
    showtime: Showtime['start_time']
}

// Not error in this context but from API
export interface APIError {
    message: string;
}
