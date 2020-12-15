import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { loadPost } from '../../redux/action/post';
import Loading from '../Loading';
import Navbar from '../navbar/Navbar';

const Post = ({ post: { loading, post }, loadPost }) => {
  const { id } = useParams();
  useEffect(() => {
    loadPost(id);
  }, [loadPost]);
  return loading || !post ? (
    <Loading />
  ) : (
    <div className='post-container'>
      <Navbar />
      <div className='user'>
        <div className='img'>
          <img src={`/api/v1/files/${post.user.avatar}`} alt='avatar' />
        </div>
        <div className='title'>
          <h2>{post.title}</h2>
          <h3>{post.user.name}</h3>
        </div>
        <div className='action'>
          <Fragment>
            <div className='btn bg-secondary'>Follow</div>
            <Link to={`/hire/${post.user.id}`} className='btn bg-primary'>
              Hire
            </Link>
          </Fragment>
        </div>
        <div className='project'>
          {post.photos.map((photo) => (
            <img src={`/api/v1/files/${photo.photo}`} alt='photo' key={photo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { loadPost })(Post);
