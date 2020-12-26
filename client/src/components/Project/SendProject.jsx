import React from 'react';
import { Form, Formik } from 'formik';
import FormController from '../form/FormController';
import { connect } from 'react-redux';
import Navbar from '../navbar/Navbar';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom';
import { sendProject } from '../../redux/action/auth';
import { useParams } from 'react-router-dom';

const SendProject = ({ sendProject, history }) => {
  const { id } = useParams();
  const initialValues = {
    images: ['', '', '', '', ''],
    description: '',
  };
  const onSubmit = (values) => {
    sendProject(id, values, history);
  };

  const validationSchema = Yup.object({
    images: Yup.array().required('Please select at least one photo'),
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
                  currentvalue={formik.values.images[0]}
                  name='images[0]'
                  label='Images'
                  placeholder='Images'
                />
                <FormController
                  control='file'
                  currentvalue={formik.values.images[1]}
                  name='images[1]'
                  label='Images'
                  placeholder='Images'
                />
                <FormController
                  control='file'
                  currentvalue={formik.values.images[2]}
                  name='images[2]'
                  label='Images'
                  placeholder='Images'
                />
                <FormController
                  control='file'
                  currentvalue={formik.values.images[3]}
                  name='images[3]'
                  label='Images'
                  placeholder='Images'
                />
                <FormController
                  control='file'
                  currentvalue={formik.values.images[4]}
                  name='images[4]'
                  label='Images'
                  placeholder='Images'
                />
              </div>
              <div className='input-text'>
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

export default connect(null, { sendProject })(withRouter(SendProject));
