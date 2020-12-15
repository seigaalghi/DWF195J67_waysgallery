import React from 'react';
import { Form, Formik } from 'formik';
import FormController from '../form/FormController';
import { connect } from 'react-redux';
import Navbar from '../navbar/Navbar';
import { sendProject } from '../../redux/action/auth';
import { useParams } from 'react-router-dom';

const SendProject = ({ sendProject }) => {
  const { id } = useParams();
  const initialValues = {
    images: ['', '', '', '', ''],
    description: '',
  };
  const onSubmit = (values) => {
    sendProject(id, values);
  };
  return (
    <div>
      <Navbar />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form>
              <FormController control='file' currentvalue={formik.values.images[0]} name='images[0]' label='Images' placeholder='Images' />
              <FormController control='file' currentvalue={formik.values.images[1]} name='images[1]' label='Images' placeholder='Images' />
              <FormController control='file' currentvalue={formik.values.images[2]} name='images[2]' label='Images' placeholder='Images' />
              <FormController control='file' currentvalue={formik.values.images[3]} name='images[3]' label='Images' placeholder='Images' />
              <FormController control='file' currentvalue={formik.values.images[4]} name='images[4]' label='Images' placeholder='Images' />
              <FormController control='textarea' name='description' label='Description' placeholder='Description' />
              <input type='submit' value='Submit' className='btn bg-primary' />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default connect(null, { sendProject })(SendProject);
