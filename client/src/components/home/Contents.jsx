import React from 'react';
import Icon from '../iconcomp/Icon';
import { Link } from 'react-router-dom';

const Contents = ({ contents }) => {
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
                <Icon icon='fas fa-comment' />
                <Icon icon='fas fa-heart' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;
