import React from 'react';
import { Form, Formik } from 'formik';
import FormController from '../form/FormController';
import { addPost } from '../../redux/action/post';
import { connect } from 'react-redux';
import Navbar from '../navbar/Navbar';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';

const AddPost = ({ addPost, history }) => {
  const initialValues = {
    photos: ['', '', '', '', ''],
    title: '',
    description: '',
  };
  const onSubmit = (values) => {
    addPost(values, history);
  };

  const validationSchema = Yup.object({
    photos: Yup.array().required('Please select at least one photo'),
    title: Yup.string().required('Title is Required'),
    description: Yup.string().required('Description is required'),
  });

  return (
    <div className='add-post'>
      <Navbar />
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(formik) => {
          return (
            <Form className='form'>
              <div className='file-input'>
                <FormController
                  control='file'
                  currentvalue={formik.values.photos[0]}
                  name='photos[0]'
                  label='Photos'
                  placeholder='Photos'
                />
                <FormController
                  control='file'
                  currentvalue={formik.values.photos[1]}
                  name='photos[1]'
                  label='Photos'
                  placeholder='Photos'
                />
                <FormController
                  control='file'
                  currentvalue={formik.values.photos[2]}
                  name='photos[2]'
                  label='Photos'
                  placeholder='Photos'
                />
                <FormController
                  control='file'
                  currentvalue={formik.values.photos[3]}
                  name='photos[3]'
                  label='Photos'
                  placeholder='Photos'
                />
                <FormController
                  control='file'
                  currentvalue={formik.values.photos[4]}
                  name='photos[4]'
                  label='Photos'
                  placeholder='Photos'
                />
              </div>
              <div className='input-text'>
                <FormController control='input' name='title' label='Title' placeholder='Title' />
                <FormController
                  control='textarea'
                  name='description'
                  label='Description'
                  placeholder='Description'
                />
                <button type='submit' value='Submit' className='btn btn-primary'>
                  Submit
                </button>
                <div onClick={() => history.goBack()} className='btn btn-secondary'>
                  Cancel
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default connect(null, { addPost })(withRouter(AddPost));
