import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorText from './ErrorText';

const TextArea = ({ label, name, placeholder, ...rest }) => {
  return (
    <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      <Field as='textarea' id={name} name={name} {...rest} placeholder={label} className='input text-area' placeholder={placeholder} />
      <ErrorMessage name={name} component={ErrorText} />
    </div>
  );
};

export default TextArea;
