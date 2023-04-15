import React from "react"
import Ticket from "./Ticket";

interface Props {
    title: string;
    seats: number[];
    showtime: string;
}

const TicketSheet = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    return (
        <div ref={ref}>
            {props.seats.map(seat => (
                <Ticket title={props.title} seat={seat} showtime={props.showtime} />
            ))}
        </div>
    )
})

export default TicketSheet
