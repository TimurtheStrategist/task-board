import { Link } from 'react-router-dom'
export const Navbar = () => {
    return (
        <div className="container justify-content-start col-md-8">
            <nav className="navbar navbar-expand">
            
                <Link className='navbar-brand' to="/">
                            <h4>TaskBoard</h4>
                        </Link>
                    <div className="navbar-nav">
                        <Link className='nav-link' to="/completed">
                        <h5>Completed Tasks</h5>
                        </Link>
                        <Link className='nav-link' to='/tags'>
                            <h5>Tags</h5>
                        </Link>
                    </div>
            </nav>
        </div>
    )
}
//container-fluid d-flex justify-content-start col-md-8