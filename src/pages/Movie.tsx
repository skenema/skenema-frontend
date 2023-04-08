import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard";
import { movies } from "../mocks/handlers";
import { Movie } from "../mocks/types"

const Movie = () => {
    const [data, setData] = useState<Movie[]>(movies);

    return (
        <div className="w-full h-full grid place-content-center overflow-scroll">
            {data.map((movie) => {
                return <MovieCard key={movie.id} movieDetail={data![0]}/>
            })}
        </div>
    )
}

export default Movie