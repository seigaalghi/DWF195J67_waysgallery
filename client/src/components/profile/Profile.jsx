import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { connect } from 'react-redux';
import { loadProfileById } from '../../redux/action/profile';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading';
import Contents from '../home/Contents';
import { follow, unfollow } from '../../redux/action/auth';
import { loadPostByUser } from '../../redux/action/post';
import ImageModal from './ImageModal';

const Profile = ({ loadProfileById, profile: { loading, profile }, post, auth, follow, unfollow, loadPostByUser }) => {
  const { id } = useParams();
  const [image, setImage] = useState({
    isOpen: false,
    image: '',
  });
  const [page, setPage] = useState({
    page: 1,
    count: 3,
  });

  useEffect(() => {
    loadPostByUser(page.page * page.count, id);
  }, [page, loadPostByUser]);

  useEffect(() => {
    loadProfileById(id);
  }, [loadProfileById, id]);

  return loading || auth.loading ? (
    <Loading />
  ) : (
    <div className='profile-container'>
      <Navbar />
      <ImageModal image={image} close={() => setImage({ isOpen: false, image: '' })} />
      <div className='greeting'>
        <img src={profile.avatar} alt='avatar' className='avatar' />
        <h2>{profile.name}</h2>
        <h1>{profile.greeting}</h1>
      </div>
      <div className='action'>
        {auth.user.id === parseInt(id) ? (
          <Link to='/edit-profile'>
            <div className='btn btn-primary'>Edit Profile</div>
          </Link>
        ) : (
          <Fragment>
            {auth.user.following.find((follow) => follow.followedUser.id === profile.id) ? (
              <div className='btn btn-secondary' onClick={() => unfollow(profile.id)}>
                Unfollow
              </div>
            ) : (
              <div className='btn btn-secondary' onClick={() => follow(profile.id)}>
                Follow
              </div>
            )}
            <Link to={`/hire/${profile.id}`}>
              <div className='btn btn-primary'>Hire</div>
            </Link>
          </Fragment>
        )}
      </div>
      {profile.arts.length > 0 ? (
        <div className='art'>
          <img src={profile.arts[0].art} alt='art' onClick={() => setImage({ isOpen: true, image: profile.arts[0].art })} />{' '}
        </div>
      ) : null}
      <div className='arts-container'>
        <h2>{auth.user.id === parseInt(id) ? 'My Arts' : `${profile.name}'s Arts`}</h2>
        <div className='arts'>
          {profile.arts.map((art) => (
            <img src={art.art} alt='art' key={art.id} onClick={() => setImage({ isOpen: true, image: art.art })} />
          ))}
        </div>
      </div>
      <div className='project'>
        <h2>{auth.user.id === parseInt(id) ? 'My Posts' : `${profile.name}'s Posts`}</h2>
        {!post.loading ? (
          <Contents contents={post.posts} count={post.count} loadMore={() => setPage((prev) => ({ ...prev, page: prev.page + 1 }))} />
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, { loadProfileById, follow, unfollow, loadPostByUser })(Profile);
