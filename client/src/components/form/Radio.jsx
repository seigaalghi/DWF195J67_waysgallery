import React, { Fragment } from 'react';
import { Field, Form, ErrorMessage } from 'formik';
import ErrorText from './ErrorText';

const Radio = ({ label, name, options, ...rest }) => {
  return (
    <div className='form-control'>
      <label>{label}</label>
      {options.map((option) => (
        <div key={option.value} className='radio-group'>
          <Field type='radio' id={option.value} name={name} value={option.value} />
          <label htmlFor={option.value}>{option.key}</label>
        </div>
      ))}

      <ErrorMessage name={name} component={ErrorText} />
    </div>
  );
};

export default Radio;
