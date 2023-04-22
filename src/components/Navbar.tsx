import { useAtom } from "jotai";
import React from "react";
import { authAtom } from "../auth";

const Navbar = () => {
  const [accessToken, setAccessToken] = useAtom(authAtom);
  function logout() {
    setAccessToken(null);
    // This is the only way to navigate without React Router
    window.location.href = "/";
  }
  return (
    <div className="navbar bg-base-200">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost normal-case text-xl">
          Home
        </a>
      </div>
      <div className="navbar-end">
        {!accessToken ? (
          <a href="/login" className="btn btn-ghost normal-case text-xl">
            Login
          </a>
        ) : (
          <button
            onClick={logout}
            className="btn btn-ghost normal-case text-xl"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
