import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { userLogout } from '../../redux/action/auth';

const Navbar = ({ userLogout }) => {
  return (
    <div className='navbar-container'>
      <img src={logo} alt='logo' />
      <div className='menu'>
        <Link className='btn bg-secondary' to='/order'>
          Order
        </Link>
        <Link className='btn bg-secondary' to='/profile'>
          Profile
        </Link>
        <span className='btn bg-secondary' onClick={() => userLogout()}>
          Logout
        </span>
      </div>
    </div>
  );
};

export default connect(null, { userLogout })(Navbar);
