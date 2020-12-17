import React from 'react';
import { Link } from 'react-router-dom';
import userIcon from '../../images/user.svg';
import orderIcon from '../../images/order.svg';
import logoutIcon from '../../images/logout.svg';
import polygon from '../../images/polygon.svg';

const Dropdown = ({ user, logout }) => {
  return (
    <div>
      <div className='dropdown'>
        <img src={polygon} alt='polygon' className='polygon' />
        <Link to={`/profile/${user.id}`}>
          <div>
            <img src={userIcon} alt='user' />
            Profile
          </div>
        </Link>
        <Link to='/order'>
          <div>
            <img src={orderIcon} alt='order' />
            Order
          </div>
        </Link>
        <hr />
        <div onClick={logout}>
          <img src={logoutIcon} alt='logout' />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
