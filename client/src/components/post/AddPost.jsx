import React from 'react';
import { Form, Formik } from 'formik';
import FormController from '../form/FormController';
import { addPost } from '../../redux/action/post';
import { connect } from 'react-redux';
import Navbar from '../navbar/Navbar';

const AddPost = ({ addPost }) => {
  const initialValues = {
    photos: ['', '', '', '', ''],
    title: '',
    description: '',
  };
  const onSubmit = (values) => {
    console.log(values);
    addPost(values);
  };
  return (
    <div>
      <Navbar />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form>
              <FormController control='file' currentvalue={formik.values.photos[0]} name='photos[0]' label='Photos' placeholder='Photos' />
              <FormController control='file' currentvalue={formik.values.photos[1]} name='photos[1]' label='Photos' placeholder='Photos' />
              <FormController control='file' currentvalue={formik.values.photos[2]} name='photos[2]' label='Photos' placeholder='Photos' />
              <FormController control='file' currentvalue={formik.values.photos[3]} name='photos[3]' label='Photos' placeholder='Photos' />
              <FormController control='file' currentvalue={formik.values.photos[4]} name='photos[4]' label='Photos' placeholder='Photos' />
              <FormController control='input' name='title' label='Title' placeholder='Title' />
              <FormController control='textarea' name='description' label='Description' placeholder='Description' />
              <input type='submit' value='Submit' className='btn bg-primary' />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default connect(null, { addPost })(AddPost);
