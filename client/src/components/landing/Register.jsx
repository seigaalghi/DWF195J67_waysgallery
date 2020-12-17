import React from 'react';
import { Formik, Form } from 'formik';
import FormController from '../form/FormController';
import { userRegister } from '../../redux/action/auth';
import { connect } from 'react-redux';
import * as Yup from 'yup';

const Login = ({ close, login, userRegister }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };
  const onSubmit = (values) => {
    userRegister(values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Minimum password length is 6').required('Password is required'),
  });

  return (
    <div className='landing-modal-container' onClick={close}>
      <div className='landing-modal'>
        <h1>Register</h1>
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
          <Form>
            <FormController control='input' name='name' label='Name' placeholder='Name' />
            <FormController control='input' name='email' label='Email' placeholder='Email' />
            <FormController control='input' name='password' label='Password' type='password' placeholder='Password' />
            <div className='action'>
              <div className='btn btn-secondary' onClick={close}>
                Cancel
              </div>
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </Form>
        </Formik>
        <div className='link-to' onClick={login}>
          Have an account? Login <strong>Here</strong>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { userRegister })(Login);
