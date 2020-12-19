import React, { useEffect } from 'react';
import { Form, Formik } from 'formik';
import FormController from '../form/FormController';
import { connect } from 'react-redux';
import Navbar from '../navbar/Navbar';
import { addHiring } from '../../redux/action/auth';
import { useHistory, useParams } from 'react-router-dom';
import { loadProfileById } from '../../redux/action/profile';
import Loading from '../Loading';
import * as Yup from 'yup';

const AddPost = ({ addHiring, loadProfileById, profile: { profile, loading }, auth }) => {
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    loadProfileById(id);
  }, []);

  const initialValues = {
    title: '',
    description: '',
    start: '',
    end: '',
    price: '',
  };
  const onSubmit = (values) => {
    console.log(values);
    addHiring(id, values);
    history.push('/order');
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    start: Yup.date().required('Start is required'),
    end: Yup.date().required('End is required'),
    price: Yup.number().required('Title is required'),
  });

  return loading || !profile ? (
    <Loading />
  ) : parseInt(auth.user.id) === parseInt(id) ? (
    history.goBack()
  ) : (
    <div className='hire-container'>
      <Navbar />
      <h1 className='color-primary'>Hire {profile.name}</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <div className='form'>
            <FormController control='input' name='title' label='Title' placeholder='Title' />
            <FormController control='textarea' name='description' label='Description' placeholder='Description' />
            <FormController control='date' name='start' label='Start' placeholder='Start' />
            <FormController control='date' name='end' label='End' placeholder='End' />
            <FormController control='input' name='price' label='Price' placeholder='Price' />
            <div className='btn btn-secondary' onClick={() => history.goBack()}>
              Cancel
            </div>
            <button className='btn btn-primary'>Submit</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { addHiring, loadProfileById })(AddPost);
