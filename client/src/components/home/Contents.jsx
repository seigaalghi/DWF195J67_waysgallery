import React from 'react';

const Contents = ({ posts }) => {
  return (
    <div>
      <div className='contents'>
        {posts.map((post) => (
          <div className='content' key={post.id}>
            <h2>{post.title}</h2>
            {post.photos.map((photo) => (
              <img src={`http://localhost:5000/api/v1/files/${photo.photo}`} className='contents-image' alt='contents' key={photo.id} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contents;
