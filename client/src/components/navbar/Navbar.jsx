import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { userLogout } from '../../redux/action/auth';
import Dropdown from './Dropdown';

const Navbar = ({ userLogout, auth: { loading, user } }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    const closeHandler = (e) => {
      if (wrapperRef.current) {
        if (!wrapperRef.current.contains(e.target)) {
          setOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', closeHandler);
  }, [wrapperRef]);

  const dropHandler = (e) => {
    setOpen(!open);
  };
  return (
    <div className='navbar-container'>
      <div className='logo'>
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
      </div>
      <div className='menu'>
        <Link to='/upload'>
          <div className='btn btn-primary'>Upload</div>
        </Link>
        <div className='avatar' onClick={dropHandler} ref={wrapperRef}>
          {!loading ? <img src={user.avatar} alt='avatar' className='avatar' /> : null}
          {open ? <Dropdown user={user} logout={userLogout} /> : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { userLogout })(Navbar);
