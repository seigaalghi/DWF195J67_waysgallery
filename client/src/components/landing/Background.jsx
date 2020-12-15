import e from 'cors';
import React, { useState } from 'react';
import logo from '../../images/Group3.svg';
import Login from './Login';
import Register from './Register';

const Background = () => {
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

  return (
    <div className='landing-container'>
      {modal === 'LOGIN' ? (
        <Login close={closeModal} register={setRegister} />
      ) : modal === 'REGISTER' ? (
        <Register close={closeModal} login={setLogin} />
      ) : null}
      <div className='text'>
        <div className='heading'>
          <h1>Ways</h1>
          <img src={logo} alt='logo' />
        </div>
        <h1>Galery</h1>
        <div className='text-content'>
          <h3>Show your work to inspire everyone</h3>
          <p>Ways Exhibition is a website design creators gather to share their work with other creators</p>
          <div className='btn bg-primary' onClick={() => setModal('REGISTER')}>
            Join Now
          </div>
          <div className='btn bg-secondary' onClick={() => setModal('LOGIN')}>
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;
