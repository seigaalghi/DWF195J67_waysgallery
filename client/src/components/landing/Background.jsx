import React, { useState } from 'react';
import logo from '../../images/Group3.svg';
import Login from './Login';
import Register from './Register';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Background = ({ auth }) => {
  const [modal, setModal] = useState('');

  const closeModal = (e) => {
    if (e.target === e.currentTarget) setModal('');
  };
  const setLogin = () => {
    setModal('LOGIN');
  };
  const setRegister = () => {
    setModal('REGISTER');
  };

  if (auth.isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='landing-container'>
      <div className='modal'>
        {modal === 'LOGIN' ? (
          <Login close={closeModal} register={setRegister} />
        ) : modal === 'REGISTER' ? (
          <Register close={closeModal} login={setLogin} />
        ) : null}
      </div>
      <div className='content'>
        <div className='heading'>
          <h1>Ways</h1>
          <img src={logo} alt='logo' />
        </div>
        <h1>Galery</h1>
        <div className='text-content'>
          <h2>Show your work to inspire everyone</h2>
          <p>Ways Exhibition is a website design creators gather to share their work with other creators</p>
          <div className='btn btn-primary' onClick={() => setModal('REGISTER')}>
            Join Now
          </div>
          <div className='btn btn-secondary' onClick={() => setModal('LOGIN')}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Background);
