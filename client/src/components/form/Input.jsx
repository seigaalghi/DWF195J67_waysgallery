import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorText from './ErrorText';

const Input = ({ label, name, placeholder, ...rest }) => {
  return (
    <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} {...rest} placeholder={label} className='input' placeholder={placeholder} />
      <ErrorMessage name={name} component={ErrorText} />
    </div>
  );
};

export default Input;
