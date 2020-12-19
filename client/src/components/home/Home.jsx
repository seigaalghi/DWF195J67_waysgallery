import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { loadFollowedPosts, loadPosts } from '../../redux/action/post';
import { connect } from 'react-redux';
import Contents from './Contents';
import Loading from '../Loading';

const Home = ({ post: { posts, loading, count }, loadPosts, auth, loadFollowedPosts }) => {
  const [part, setPart] = useState('all');
  const [page, setPage] = useState({
    page: 1,
    times: 6,
  });
  useEffect(() => {
    if (part === 'all') {
      loadPosts(page.page * page.times);
    }
    if (part === 'followed' && auth.user && !auth.loading) {
      const follow = auth.user.following.map((follow) => follow.followedUser.id);
      loadFollowedPosts(page.page * page.times, { userId: follow });
    }
  }, [loadPosts, page, part, auth]);

  return loading || !posts ? (
    <Loading />
  ) : (
    <div className='home-container'>
      <Navbar />
      <div className='select'>
        <select name='page' onChange={(e) => setPart(e.target.value)}>
          <option value='all'>All Time</option>
          <option value='followed'>Followed</option>
        </select>
      </div>
      <Contents contents={posts} count={count} loadMore={() => setPage({ ...page, page: page.page + 1 })} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { loadPosts, loadFollowedPosts })(Home);
