import React from 'react';
import { Form, Formik } from 'formik';
import FormController from '../form/FormController';
import { addPost } from '../../redux/action/post';
import { connect } from 'react-redux';
import Navbar from '../navbar/Navbar';
import { addHiring } from '../../redux/action/auth';
import { useParams } from 'react-router-dom';

const AddPost = ({ addHiring }) => {
  const { id } = useParams();

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
  };
  return (
    <div>
      <Navbar />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form>
              <FormController control='input' name='title' label='Title' placeholder='Title' />
              <FormController control='textarea' name='description' label='description' placeholder='description' />
              <FormController control='date' name='start' label='start' placeholder='start' />
              <FormController control='date' name='end' label='end' placeholder='end' />
              <FormController control='input' name='price' label='price' placeholder='price' />
              <input type='submit' value='Submit' className='btn bg-primary' />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default connect(null, { addHiring })(AddPost);
