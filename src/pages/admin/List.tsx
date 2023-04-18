const List = () => {
  return (
    <div className="mt-8 w-1/2 mx-auto">
      <h1 className="text-4xl font-bold">All movies</h1>
      <div className="space-x-8 py-8">
        <button className="btn btn-primary">Add movie</button>
      </div>
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-[40%,60%] bg-base-200">
          <div className="flex justify-center">
            <div className="bg-black w-[10rem] h-[10rem]"></div>
          </div>
          <div className="space-y-4 py-4 pr-4">
            <h2>Titanic</h2>
            <p>Cinema: A32</p>
            <div className="flex">
            <button className="btn btn-info ml-auto">Detail</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
