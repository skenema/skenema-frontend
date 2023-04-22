import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { authAtom, fetchWithAuth } from "../../auth";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [accessToken] = useAtom(authAtom)
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cinema, setCinema] = useState("");
  const [file, setFile] = useState<File>();
  useEffect(() => {
    if (!accessToken) {
      navigate("/login")
    }
  }, [accessToken])
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleCinemaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCinema(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmission: FormEventHandler =(e) => {
    // NOTE: THIS IS A FINAL VERSION
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("cinema", cinema)
    formData.append("description", description)
    if (file) {
      formData.append("thumbnail", file)
    }
    fetchWithAuth("/api/movies/create", accessToken!, {
      body: formData
    }).then(res => {
      if (res.status === 401 || res.status === 403) {
        navigate("/login")
      } else {
        navigate("/admin")
      }
    })
  }
  return (
    <div className="mt-8 w-1/2 mx-auto">
      <h1 className="text-4xl font-bold">Add movie</h1>
      <form onSubmit={handleSubmission} className="form-control">
        <label className="label" htmlFor="title">
          Title
        </label>
        <input value={title} onChange={handleTitleChange} type="text" id="title" className="input input-bordered" />
        <label className="label" htmlFor="cinema">
          Cinema
        </label>
        <input value={cinema} onChange={handleCinemaChange} type="text" id="cinema" className="input input-bordered" />
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea value={description} onChange={handleDescriptionChange} className="textarea textarea-bordered" id="description" />
        <label className="label" htmlFor="thumbnail">
          Thumbnail
        </label>
        <input
          type="file"
          className="file-input file-input-bordered"
          id="thumbnail"
          onChange={handleFileChange}
        />
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
