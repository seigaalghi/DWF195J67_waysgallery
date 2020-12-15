import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorText from './ErrorText';

const DatePicker = ({ label, name, placeholder, classes, ...rest }) => {
  return (
    <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      <Field type='date' name={name} {...rest} className={`input ${classes}`} placeholder={placeholder} />
      <ErrorMessage name={name} component={ErrorText} />
    </div>
  );
};

export default DatePicker;
