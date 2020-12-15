import React from 'react';
import { Formik, Form } from 'formik';
import FormController from '../form/FormController';

const Login = ({ close, login }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };
  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div className='landing-modal-container' onClick={close}>
      <div className='landing-modal'>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formik) => {
            return (
              <Form>
                <FormController control='input' name='name' label='Name' placeholder='Name' />
                <FormController control='input' name='email' label='Email' placeholder='Email' />
                <FormController control='input' name='password' label='Password' type='password' placeholder='Password' />
                <input type='submit' className='btn bg-primary' value='Submit' />
              </Form>
            );
          }}
        </Formik>
        <div className='link-to' onClick={login}>
          Have an account? Login Here
        </div>
      </div>
    </div>
  );
};

export default Login;
