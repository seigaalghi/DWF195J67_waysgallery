import React, { useState } from 'react';

const Home = () => {
  const [time, setTime] = useState('today');
  return (
    <div>
      <select name='page' onChange={}>
        <option value='today'>Today</option>
        <option value='all'>All Time</option>
      </select>
    </div>
  );
};

export default Home;
