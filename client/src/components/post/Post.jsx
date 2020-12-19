import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { follow, unfollow } from '../../redux/action/auth';
import { addComment, loadPost, removeComment } from '../../redux/action/post';
import Icon from '../iconcomp/Icon';
import Loading from '../Loading';
import Navbar from '../navbar/Navbar';

const Post = ({ post: { loading, post }, loadPost, auth, follow, unfollow, addComment, removeComment }) => {
  const [big, setBig] = useState('');
  const { id } = useParams();
  const [comment, setComment] = useState({
    comment: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    addComment(comment, post.id);
    setComment({ comment: '' });
  };

  useEffect(() => {
    loadPost(id);
  }, [loadPost]);

  useEffect(() => {
    if (post) {
      if (post.photos && !loading) {
        setBig(post.photos[0].photo);
      }
    }
  }, [post]);

  return loading || !post || auth.loading || !auth.user ? (
    <Loading />
  ) : (
    <div className='post-container'>
      <Navbar />
      <div className='post'>
        <div className='user'>
          <Link to={`/profile/${post.user.id}`} className='avatar'>
            <img src={post.user.avatar} alt='avatar' />
            <div className='title'>
              <h2>{post.title}</h2>
              <h4>{post.user.name}</h4>
            </div>
          </Link>
          <div className='action'>
            {auth.user.id === post.user.id ? null : (
              <Fragment>
                {auth.user.following.find((follow) => follow.followedUser.id === post.user.id) ? (
                  <div className='btn btn-secondary' onClick={() => unfollow(post.user.id)}>
                    Unfollow
                  </div>
                ) : (
                  <div className='btn btn-secondary' onClick={() => follow(post.user.id)}>
                    Follow
                  </div>
                )}
                <Link to={`/hire/${post.user.id}`}>
                  <div className='btn btn-primary'>Hire</div>
                </Link>
              </Fragment>
            )}
          </div>
        </div>
        <div className='images'>
          <div className='big'>
            <img src={big} alt='big' />
          </div>
          <div className='small'>
            {post.photos.map((photo) => (
              <img src={photo.photo} alt='small' onClick={() => setBig(photo.photo)} key={photo.id} />
            ))}
          </div>
        </div>
        <div className='description'>
          <h3>
            <span className='color-warning'>
              <Icon icon='fas fa-hand-sparkles' />
            </span>{' '}
            Say hello <span className='color-primary'>{post.user.email}</span>
          </h3>
          <h4>{post.description}</h4>
        </div>
        <hr />
        <form className='comment-form' onSubmit={onSubmit}>
          <textarea value={comment.comment} onChange={(e) => setComment({ comment: e.target.value })} placeholder='Write your comments here' />
          <button className='btn btn-primary'>Send</button>
        </form>
        <hr />
        <div className='comments'>
          {post.comments.map((comment) => (
            <div className='comment' key={comment.id}>
              <Link to={`/profile/${comment.user.id}`} className='user'>
                <img src={comment.user.avatar} alt='avatar' />
                <h3>{comment.user.name}</h3>
              </Link>
              <div className='text'>
                <p>"{comment.comment}"</p>
                {!auth.loading ? (
                  comment.user.id === auth.user.id ? (
                    <div className='btn btn-danger' onClick={() => removeComment(comment.id)}>
                      Delete
                    </div>
                  ) : null
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { loadPost, follow, unfollow, addComment, removeComment })(Post);
