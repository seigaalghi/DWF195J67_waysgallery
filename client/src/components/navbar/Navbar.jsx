import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { userLogout } from '../../redux/action/auth';
import Loading from '../Loading';

const Navbar = ({ userLogout, auth: { loading, user } }) => {
  return loading ? (
    <Loading />
  ) : (
    <div className='navbar-container'>
      <Link to='/'>
        <img src={logo} alt='logo' />
      </Link>
      <div className='menu'>
        <Link className='btn bg-primary' to='/order'>
          Order
        </Link>
        <Link className='btn bg-primary' to={`/profile/${user.id}`}>
          Profile
        </Link>
        <span className='btn bg-primary' onClick={() => userLogout()}>
          Logout
        </span>
        <div className='avatar'>
          <img src={`/api/v1/files/${user.avatar}`} alt='avatar' />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { userLogout })(Navbar);
