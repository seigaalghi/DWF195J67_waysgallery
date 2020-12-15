import React, { Fragment, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { connect } from 'react-redux';
import { loadProfileById } from '../../redux/action/profile';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading';

const Profile = ({ loadProfileById, profile: { loading, profile }, auth }) => {
  const { id } = useParams();
  useEffect(() => {
    loadProfileById(id);
  }, [loadProfileById]);
  return loading || auth.loading ? (
    <Loading />
  ) : (
    <div className='profile-container'>
      <Navbar />
      <div className='greeting'>
        <img src={`/api/v1/files/${profile.avatar}`} alt='avatar' className='avatar' />
        <h3>{profile.name}</h3>
        <h1>{profile.greeting}</h1>
      </div>
      <div className='action'>
        {parseInt(auth.user.id) === parseInt(id) ? (
          <Link to='/edit-profile' className='btn bg-primary'>
            Edit Profile
          </Link>
        ) : (
          <Fragment>
            <div className='btn bg-secondary'>Follow</div>
            <Link to={`/hire/${profile.id}`} className='btn bg-primary'>
              Hire
            </Link>
          </Fragment>
        )}
      </div>
      <div className='art'>{profile.arts.length > 0 ? <img src={`/api/v1/files/${profile.arts[0].art}`} alt='art' /> : null}</div>
      <div className='project'>
        <h2>{auth.user.id === id ? 'My Works' : `${profile.name}'s Works`}</h2>
        {profile.posts.length > 0
          ? profile.posts.map((post) => post.photos.map((photo) => <img src={`/api/v1/files/${photo.photo}`} alt='photo' key={photo.id} />))
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { loadProfileById })(Profile);
