import { Link, useLocation } from 'react-router-dom'
import { Movie, Showtime } from '../types/responses'

const Confirm = () => {
    const selectedSeat: number[] = useLocation().state.seat
    const movie: Movie = useLocation().state.movie
    const showtime: Showtime = useLocation().state.showtime
    const date = new Date(showtime.start_time)

    const detailTable = (prefix: string, detail: string) => {
        return (<div className='grid grid-cols-[10%,90%] text-2xl mt-10'>
            <div className='flex justify-center'>{prefix}</div>
            <div className='flex justify-end'>{detail}</div>
        </div>)
    }
    return (
        <div className="p-3 flex justify-center">
            <div className="w-[60vw] h-[80vh] bg-gray-100 p-[5rem] relative">
                <div className="grid grid-cols-[20%,80%] gap-20">
                    <div className="bg-black w-[10rem] h-[10rem]"></div>
                    <p className="text-center w-full text-4xl flex items-center justify-center">
                        {movie.title}
                    </p>
                </div>
                <div className='mt-10 '>
                    {detailTable("Cinema", movie.cinema)}
                    {detailTable("Seat", selectedSeat.sort((a, b) => a - b).map(s => s.toString()).join(', '))}
                    {detailTable("Showtime", `${date.getDate()} ${date.toLocaleString('en-GB', {month: 'long'})} ${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`)}
                </div>
                <Link to={"/movie/summary"} state={{ selectedSeat: selectedSeat, title: movie.title, showtime: showtime }}>
                    <button className="btn btn-active btn-primary absolute bottom-3 right-3">ยืนยัน</button>
                </Link>
            </div>
        </div>
    )
}

export default Confirm
