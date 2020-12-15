import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { loadPosts } from '../../redux/action/post';
import { connect } from 'react-redux';
import Contents from './Contents';

const Home = ({ post: { posts, loading }, loadPosts }) => {
  const [time, setTime] = useState('today');
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return loading || !posts ? (
    <h1>Loading</h1>
  ) : (
    <div className='home-container'>
      <Navbar />
      <div className='select'>
        <select name='page' onChange={(e) => setTime(e.target.value)}>
          <option value='today'>Today</option>
          <option value='all'>All Time</option>
        </select>
      </div>
      <Contents posts={posts} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { loadPosts })(Home);
