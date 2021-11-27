import { Link } from 'react-router-dom'
import './navbar_style.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi-chat navbar-brand-icon h3"></i>
          <span className='h3'>ChatUp!</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar_content">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar_content">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">HOME</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chatrooms/">CHATROOMS</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chatrooms/new-chatroom/">NEW CHATROOM</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
