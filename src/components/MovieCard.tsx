import React from 'react'
import { Link } from 'react-router-dom'
import { Movie } from '../mocks/types'

interface props {
    movieDetail: Movie
}

const MovieCard = ({ movieDetail }: props) => {
    console.log(movieDetail)
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
                    {movieDetail.showtimes.map((showtimes) => {
                        return <Link to={`/movie/${movieDetail.title.replace(' ', '')}/${showtimes.startTime.toString()}/reservation`}>
                            <button key={showtimes.id} className="btn btn-success">{showtimes.startTime.toString()}</button>
                        </Link>
                    })}
                </div>
            </div>
        </div>
    )
}

export default MovieCard