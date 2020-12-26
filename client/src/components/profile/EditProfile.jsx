import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { editProfile, addArt } from '../../redux/action/auth';
import Navbar from '../navbar/Navbar';
import Dropzone from 'react-dropzone';
import Icon from '../iconcomp/Icon';
import { withRouter } from 'react-router-dom';

const AddPost = ({ auth: { loading, user }, editProfile, addArt, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    greeting: '',
  });

  useEffect(() => {
    if (user || !loading) {
      setFormData({
        name: user.name,
        greeting: user.greeting,
        arts: '',
      });
    }
  }, [user]);

  const onChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editProfile(formData, history);
  };

  return (
    <div className='edit-profile'>
      <Navbar />
      <div className='input-zone'>
        <Dropzone onDrop={(acceptedFiles) => addArt(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section className='drop'>
              <div {...getRootProps()} className='drop-zone'>
                <input {...getInputProps()} accept='image/*' />
                <p>
                  <span className='color-primary'>Upload</span> Best Your Art
                </p>
              </div>
            </section>
          )}
        </Dropzone>
        <form onSubmit={onSubmit} className='form'>
          <label className='file-input'>
            {formData.avatar ? (
              <img src={URL.createObjectURL(formData.avatar)} alt='avatar' />
            ) : (
              <Icon icon='far fa-user' />
            )}
            <input type='file' name='avatar' onChange={onChange} className='input' />
          </label>
          <label>Name</label>
          <input
            type='text'
            name='name'
            onChange={onChange}
            className='input'
            placeholder='Name'
            value={formData.name}
          />
          <label>Greeting</label>
          <textarea
            name='greeting'
            onChange={onChange}
            className='input'
            placeholder='Greeting'
            value={formData.greeting}
          />
          <button type='submit' value='Submit' className='btn btn-primary'>
            Submit
          </button>
          <div className='btn btn-secondary' onClick={() => history.goBack()}>
            Cancel
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editProfile, addArt })(withRouter(AddPost));
