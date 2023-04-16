const Login = () => {
    return (
        <div className="flex flex-col min-h-full">
            <form className="flex flex-col gap-4 bg-base-200 rounded-md w-1/3 mt-8 p-8 mx-auto">
                <label htmlFor="username">Username</label>
                <input id="username" type="text" className="input w-full " />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" className="input w-full " />
                <input type="submit" value="Login" className="btn btn-success" />
            </form>
        </div>
    )
}

export default Login
