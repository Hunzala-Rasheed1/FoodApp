import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../Screen/Cart';


const Navbar = () => {
  const [cartView, setCartView] = useState(false)
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
     
      setAuthToken(localStorage.getItem('authToken'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem('authToken');
    setAuthToken(null);
    navigate('/signup');
  };

  const loadCart = () => {
    setCartView(true)
}

 

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: 'green' }}>
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">Food Fusion</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active fs-4" aria-current="page" to="/">Home</Link>
            </li>
            {authToken && (
              <li className="nav-item">
                <Link className="nav-link active fs-4" aria-current="page" to="/MyOrder">My Order
                
                </Link>
              </li>
            )}
          </ul>
          {!authToken ? (
            <div className='d-flex'>
              {/* <Link className="btn bg-white text-success mx-1" to="/signup">Login</Link> */}
              <Link className="btn bg-white text-success mx-1" to="/signup">Sign Up/Login</Link>
            </div>
          ) : (
            <div>
              <div className="btn bg-white text-success mx-2 " onClick={loadCart}>Cart
              {" "}
              <Badge pill bg='danger'>2</Badge>
              </div>
              {/* {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""} */}
                {cartView? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal>:""}
              <div className="btn bg-white text-success mx-1" onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
