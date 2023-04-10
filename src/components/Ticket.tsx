interface props {
    title: string
    seat: string
    showtime: string
}

const Ticket = ({title, seat, showtime}: props) => {
  return (
    <div className="w-full h-[20vh] p-3 grid grid-cols-[20%,80%] bg-[#D9D9D9] gap-10">
        <div className="w-full h-full">
            <div className="bg-black w-full h-full"></div>
        </div>
        <div className="grid items-center">
            <p className="text-3xl">{title} - {seat}</p>
            <p className="text-xl">{showtime}</p>
        </div>
    </div>
  )
}

export default Ticket