import { useAtom } from "jotai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAtom } from "../auth";

function login(username: string, password: string) {
  return fetch("/api/auth/token/", {
    method: "POST",
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
}
const Login = () => {
  // I do not use form library because I will run out of time.
  // - Pontakorn Paesaeng
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [accessToken, setAccessToken] = useAtom(authAtom)
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault()
    login(username, password)
      .then((response) => {
        // Invalid username or password
        if (!response.ok && response.status === 401) {
          setErrorMessage("Invalid username or password");
          return;
        }
        if (!response.ok) {
          setErrorMessage(`Error ${response.status} ${response.statusText}`);
          return;
        }
        response.json().then((res) => {
          // Please remember that storing this way is very unsafe.
          // I don't know other way yet. Cookie is too difficult.
          // - Pontakorn Paesaeng
          setAccessToken(res.access)
          navigate("/admin")
        });
      })
      .catch((e) => {
        setErrorMessage(`Unexpected error: ${e.message}`);
      });
  };

  const handleChangeUsername: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value)
  }
  const handleChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value)
  }


  return (
    <div className="flex flex-col min-h-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-base-200 rounded-md w-1/3 mt-8 p-8 mx-auto">
        {errorMessage.length != 0 && <p className="text-error">{errorMessage}</p>}
        <label htmlFor="username">Username</label>
        <input id="username" value={username} onChange={handleChangeUsername} type="text" className="input w-full " />
        <label htmlFor="password">Password</label>
        <input id="password" value={password} onChange={handleChangePassword} type="password" className="input w-full " />
        <input type="submit" value="Login" className="btn btn-success" />
      </form>
    </div>
  );
};

export default Login;
