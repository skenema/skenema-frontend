import QRCode from "react-qr-code"
import { getCustomDateFormat } from "../utils"

interface props {
    title: string
    seat: number
    showtime: string
    ticketId: number
}

const Ticket = ({title, seat, showtime, ticketId}: props) => {
  return (
    <div className="w-full h-[20vh] p-3 grid grid-cols-[20%,80%] bg-[#D9D9D9] gap-10">
        <div className="w-full h-full">
          <QRCode style={{maxWidth: "100%", height: "auto", width: "100%"}} value={`${import.meta.env.VITE_BASE_URL}/validate-ticket/${ticketId}`} />
        </div>
        <div className="grid items-center">
            <p className="text-3xl">{title} - Seat {seat}</p>
            <p className="text-xl">{getCustomDateFormat(new Date(showtime))}</p>
        </div>
    </div>
  )
}

export default Ticket
