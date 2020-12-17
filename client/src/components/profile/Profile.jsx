import React, { Fragment, useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import { connect } from 'react-redux';
import { loadProfileById } from '../../redux/action/profile';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading';
import Contents from '../home/Contents';

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
        <img src={profile.avatar} alt='avatar' className='avatar' />
        <h2>{profile.name}</h2>
        <h1>{profile.greeting}</h1>
      </div>
      <div className='action'>
        {parseInt(auth.user.id) === parseInt(id) ? (
          <Link to='/edit-profile'>
            <div className='btn btn-primary'>Edit Profile</div>
          </Link>
        ) : (
          <Fragment>
            <div className='btn btn-secondary'>Follow</div>
            <Link to={`/hire/${profile.id}`}>
              <div className='btn btn-primary'>Hire</div>
            </Link>
          </Fragment>
        )}
      </div>
      {profile.arts.length > 0 ? (
        <div className='art'>
          <img src={profile.arts[profile.arts.length - 1].art} alt='art' />{' '}
        </div>
      ) : null}
      <div className='project'>
        <h2>{auth.user.id === id ? 'My Works' : `${profile.name}'s Works`}</h2>
        <Contents contents={profile.posts} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { loadProfileById })(Profile);
