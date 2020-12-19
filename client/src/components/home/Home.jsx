import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { loadPosts } from '../../redux/action/post';
import { connect } from 'react-redux';
import Contents from './Contents';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

const Home = ({ post: { posts, loading, count }, loadPosts }) => {
  const [page, setPage] = useState({
    page: 1,
    times: 6,
  });
  useEffect(() => {
    loadPosts(page.page * page.times);
  }, [loadPosts, page]);

  return loading || !posts ? (
    <Loading />
  ) : (
    <div className='home-container'>
      <Navbar />
      <Contents contents={posts} count={count} loadMore={() => setPage({ ...page, page: page.page + 1 })} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { loadPosts })(Home);
