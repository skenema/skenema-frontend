import { useEffect, useState } from "react"
import { Movie } from "../mocks/types"

const Movie = () => {
    const [data, setData] = useState<Movie[]>();

    useEffect(() => {
        const movieFetch = async () => {
            const movies: Movie[] = await (await fetch("http://localhost:5173/movies")).json()
        }
        movieFetch()
    }, []);

    return (
        <div>Movie</div>
    )
}

export default Movie