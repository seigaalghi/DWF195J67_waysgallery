import React from 'react';
import Icon from '../iconcomp/Icon';
import { Link } from 'react-router-dom';
import { dislikePost, likePost } from '../../redux/action/post';
import { connect } from 'react-redux';

const Contents = ({ contents, likePost, dislikePost, auth: { loading, user } }) => {
  return (
    <div>
      <div className='contents'>
        {contents.map((post) => (
          <div className='content' key={post.id}>
            <Link className='image' style={{ backgroundImage: 'url("' + post.photos[0].photo + '")' }} to={`/post/${post.id}`}>
              <div className='bottom'>
                <h3>{post.title}</h3>
              </div>
            </Link>
            <div className='footer'>
              <Link to={`/profile/${post.user.id}`} className='user'>
                <img src={post.user.avatar} alt='avatar' />
                <h3>{post.user.name}</h3>
              </Link>
              <div className='action'>
                <div>
                  <Link to={`/post/${post.id}`}>
                    <Icon icon='fas fa-comment' />
                  </Link>
                  {post.comments.length > 0 ? <span>{post.comments.length}</span> : null}
                </div>
                {!loading ? (
                  post.likes.find((like) => {
                    console.log(like);
                    return like.user.id == user.id;
                  }) ? (
                    <div onClick={() => dislikePost(post.id, user.id)}>
                      <Icon icon='fas fa-heart color-danger' />
                      {post.likes.length > 0 ? <span>{post.likes.length}</span> : null}
                    </div>
                  ) : (
                    <div onClick={() => likePost(post.id)}>
                      <Icon icon='fas fa-heart' />
                      {post.likes.length > 0 ? <span>{post.likes.length}</span> : null}
                    </div>
                  )
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { likePost, dislikePost })(Contents);
