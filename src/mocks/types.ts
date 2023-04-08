export interface Showtime {
    id: string;
    startTime: string | Date;
}
export interface Movie {
    id: string; // Assuming UUID
    title: string;
    description: string;
    cinema: string;
    showtimes: Showtime[];
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
    showtime: Showtime['startTime']
}

// Not error in this context but from API
export interface APIError {
    message: string;
}
