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
