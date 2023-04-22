export interface Showtime {
    showtime_id: number;
    start_time: string; // Python convention
}
export interface Movie {
    id: number;  // Use this ID as key. Do not ever render it.
    title: string;
    description: string;
    cinema: string;
    thumbnail: string
    // showtimes: Showtime[];
}

export interface ShowtimeReservation {
    id: string; // Assume UUID
    seats: Seat[]
}

export interface Seat {
    seat_id: number; // Imagine H02 or something like that.
    is_available: boolean;
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

export interface AuthResponse {
    access: string;
    refresh: string;
}

export type RefreshResponse = Omit<AuthResponse, 'refresh'>

// Not error in this context but from API
export interface APIError {
    message: string;
    code?: string;
}

// 'id': ticket.id,
// 'seatNumber': ticket.seatNumber,
// 'cinema': ticket.cinema,
// 'showtime': ticket.showtime

export interface TicketValidationResponse {
    id: number;
    seatNumber: number;
    cinema: string;
    showtime: string;
}
