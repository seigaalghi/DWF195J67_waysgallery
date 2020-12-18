import React, { useState } from 'react';
import Navbar from '../navbar/Navbar';
import Order from './Order';
import Offer from './Offer';

const Project = () => {
  const [page, setPage] = useState('ORDER');
  return (
    <div className='project-container'>
      <Navbar />
      <div className='select'>
        <select name='page' onChange={(e) => setPage(e.target.value)}>
          <option value='ORDER'>My Order</option>
          <option value='OFFER'>My Offer</option>
        </select>
      </div>
      <div className='content'>{page === 'ORDER' ? <Order /> : <Offer />}</div>
    </div>
  );
};

export default Project;
