import React from 'react';
import Icon from '../iconcomp/Icon';

const Contents = ({ contents }) => {
  return (
    <div>
      <div className='contents'>
        {contents.map((post) => (
          <div className='content' key={post.id}>
            <div className='image' style={{ backgroundImage: 'url("' + post.photos[0].photo + '")' }}>
              <div className='bottom'>
                <h3>{post.title}</h3>
                <div className='action'>
                  <Icon icon='fas fa-folder-plus' />
                  <Icon icon='fas fa-heart' />
                </div>
              </div>
            </div>
            <div className='footer'>
              <div className='user'>
                <img src={post.user.avatar} alt='avatar' />
                <h3>{post.user.name}</h3>
              </div>
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
