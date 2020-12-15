import React from 'react';
import { Link } from 'react-router-dom';

const Contents = ({ posts }) => {
  return (
    <div>
      <div className='contents'>
        {posts.map((post) => (
          <Link key={post.id} to={`/post/${post.id}`}>
            <div className='content'>
              <h2>{post.title}</h2>
              {post.photos.map((photo) => (
                <img src={`http://localhost:5000/api/v1/files/${photo.photo}`} className='contents-image' alt='contents' key={photo.id} />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Contents;
