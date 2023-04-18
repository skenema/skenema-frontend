const AddMovie = () => {
  return (
    <div className="mt-8 w-1/2 mx-auto">
      <h1 className="text-4xl font-bold">Add movie</h1>
      <form className="form-control">
        <label className="label" htmlFor="title">
          Title
        </label>
        <input type="text" id="title" className="input input-bordered" />
        <label className="label" htmlFor="cinema">
          Cinema
        </label>
        <input type="text" id="cinema" className="input input-bordered" />
        <label className="label" htmlFor="number-seats">
          Number of seats
        </label>
        <input
          type="number"
          id="number-seats"
          className="input input-bordered max-w-xs"
        />
        <label className="label" htmlFor="thumbnail">Thumbnail</label>
        <input type="file" className="file-input file-input-bordered" id="thumbnail" />
        <input
          type="submit"
          className="btn my-4 btn-primary"
          value="Create movie"
        ></input>
      </form>
    </div>
  );
};

export default AddMovie;
