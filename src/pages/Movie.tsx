import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard";
import { Movie } from "../types/responses"
import useSWR from 'swr'
import { fetchJSON } from "../utils";

const Movie = () => {
    // const [data, setData] = useState<Movie[]>(movies);
    const { data, error } = useSWR<Movie[]>('/api/movies', fetchJSON)
    if (error) return (
        <div className="w-full h-full grid place-content-center overflow-scroll">
            <h1 className="text-error font-bold text-xl">Error</h1>
            <p>{error.toString()}</p>
        </div>
    )

    return (
        <div className="w-full h-full grid place-content-center overflow-scroll">
            {!data && <p>Loading...</p>}
            {data && data.map((movie) => {
                return <MovieCard key={movie.id} movieDetail={movie}/>
            })}
        </div>
    )
}

export default Movie
