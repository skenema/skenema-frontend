import { Link } from 'react-router-dom'
function Index() {
  // TODO: Do the real thing.
  return (
    <div>
      <h1 className="font-bold text-4xl">Welcome to SKENEMA</h1>
      <Link className="btn btn-primary" to="/dev">Go to Dev Testing Page</Link>
      <Link className="btn btn-primary" to="/movie">UI Page</Link>
    </div>
  )
}

export default Index
