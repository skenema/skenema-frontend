import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard";
import { movies } from "../mocks/handlers";
import { Movie } from "../mocks/types"

const Movie = () => {
    const [data, setData] = useState<Movie[]>(movies);

    return (
        <div className="w-full h-full grid place-content-center overflow-scroll">
            {data.map((movie, id) => {
                return <MovieCard key={id} movieDetail={movie}/>
            })}
        </div>
    )
}

export default Movie