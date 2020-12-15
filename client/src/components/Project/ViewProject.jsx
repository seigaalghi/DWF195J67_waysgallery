import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Loading from '../Loading';
import Navbar from '../navbar/Navbar';

const Post = ({ auth: { user, loading } }) => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  console.log(project);
  useEffect(() => {
    const data = user.offers.find((offer) => offer.id == id);
    setProject(data);
  }, []);

  return loading || !project.project ? (
    <Loading />
  ) : (
    <div className='project-container'>
      <Navbar />

      <div className='title'>
        <h2>{project.title}</h2>
      </div>

      <div className='project'>
        {project.project.images.map((image) => (
          <img src={`/api/v1/files/${image.image}`} alt='image' key={image.id} />
        ))}
      </div>
      <p>{project.project.description}</p>
      <Link to='/order' className='btn bg-primary'>
        Go Back
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Post);
