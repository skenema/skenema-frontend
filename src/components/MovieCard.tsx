import React from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '../types/responses'

interface props {
    movieDetail: Movie
}

function isoStringToNormalDate(isoString: string): string {
    return new Date(isoString).toLocaleString("en-GB")
}

const MovieCard = ({ movieDetail }: props) => {
    return (
        <div className='w-[50rem] h-[20rem] bg-gray-100 mt-[7rem]'>
            <div className='w-full h-full grid grid-cols-[40%,60%] items-center'>
                <div className='flex justify-center'>
                    <div className='bg-black w-[10rem] h-[10rem]'></div>
                </div>
                <div>
                    <p>{movieDetail.title} </p>
                    <p>{movieDetail.description}</p>
                </div>
                <div className='text-center'>{movieDetail.cinema}</div>
                <div className='flex justify-start items-center p-3'>
                    {movieDetail.showtimes.map((showtime, id) => {
                        return <Link to={`/movie/reservation`} state={{showtime: showtime.start_time, movie: movieDetail}}>
                            <button key={showtime.id} className="btn btn-success">{isoStringToNormalDate(showtime.start_time)}</button>
                        </Link>
                    })}
                </div>
            </div>
        </div>
    )
}

export default MovieCard
