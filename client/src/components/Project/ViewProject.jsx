import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Icon from '../iconcomp/Icon';
import Loading from '../Loading';
import Navbar from '../navbar/Navbar';

const Post = ({ auth: { user, loading } }) => {
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [big, setBig] = useState('');
  useEffect(() => {
    const data = user.offers.find((offer) => offer.id == id);
    setProject(data);
  }, []);
  useEffect(() => {
    if (project.project) {
      setBig(project.project.images[0].image);
    }
  }, [project]);

  return loading || !project.project ? (
    <Loading />
  ) : (
    <div className='project-container'>
      <Navbar />

      <div className='project'>
        <div className='project-image'>
          <div className='big'>
            <img src={big} alt='big' />
          </div>
          <div className='small'>
            {project.project.images.map((image) => (
              <img src={`${image.image}`} alt='image' key={image.id} onClick={() => setBig(image.image)} />
            ))}
          </div>
        </div>
        <div className='project-text'>
          <div className='title'>
            <h2>{project.title}</h2>
            <p>{project.project.description}</p>
            <a href={big} download target='_blank' className='btn btn-primary'>
              Download <Icon icon='fas fa-download' />
            </a>
            <Link to='/order' className='btn btn-secondary'>
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Post);
