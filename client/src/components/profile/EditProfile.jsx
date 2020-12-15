import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { editProfile } from '../../redux/action/auth';
import Navbar from '../navbar/Navbar';

const AddPost = ({ auth: { loading, user }, editProfile }) => {
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    greeting: '',
    arts: '',
  });

  useEffect(() => {
    if (user || !loading) {
      setFormData({
        name: user.name,
        greeting: user.greeting,
        avatar: '',
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
    editProfile(formData);
  };

  return (
    <div className='edit-profile'>
      <Navbar />
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <input type='text' name='name' onChange={onChange} className='input' placeholder='Name' value={formData.name} />
        <label>Avatar</label>
        <input type='file' name='avatar' onChange={onChange} className='input' />
        <label>Greeting</label>
        <input type='text' name='greeting' onChange={onChange} className='input' placeholder='Greeting' value={formData.greeting} />
        <label>Art</label>
        <input type='file' name='arts' onChange={onChange} className='input' />
        <input type='submit' value='Submit' className='btn bg-primary' />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { editProfile })(AddPost);
