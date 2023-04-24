import { Link } from "react-router-dom";
import useSWR from 'swr'
import { fetchJSON } from "../../utils";
import Movie from "../Movie";

const List = () => {
  const { data, error } = useSWR<Movie[]>('/api/movies/', fetchJSON)
  if (error) {
    <div className="mt-8 w-1/2 mx-auto">
      <h1 className="text-4xl font-bold text-error">Error: {error.toString()}</h1>
    </div>
  }
  return (
    <div className="mt-8 w-1/2 mx-auto">
      <h1 className="text-4xl font-bold">All movies</h1>
      <div className="space-x-8 py-8">
        <Link to="/admin/add-movie">
          <a className="btn btn-primary">Add movie</a>
        </Link>
      </div>
      <div className="flex flex-col gap-8">
        {!data && <div>Loading...</div>}
        {data && data.map(movie => (
        <div key={movie.id} className="grid grid-cols-[40%,60%] bg-base-200">
          <div className="flex justify-center">
            {movie.thumbnail.length === 0 && (
            <div className="bg-black w-[10rem] h-[10rem] flex">
              <p className="text-white m-auto">No image</p>
            </div>
            )}
            {movie.thumbnail.length > 0 && (
              <img className="w-full h-auto max-w-[300px]" src={movie.thumbnail} alt={movie.title} />
            )}
          </div>
          <div className="space-y-4 py-4 pr-4">
            <h2>{movie.title}</h2>
            <p>Cinema: {movie.cinema}</p>
            <div className="flex">
              <Link to={`/admin/movies/${movie.id}`}>
                <button className="btn btn-info ml-auto">Detail</button>
              </Link>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default List;
