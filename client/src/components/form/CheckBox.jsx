import React, { Fragment } from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorText from './ErrorText';

const Checkbox = ({ label, name, options, classes, ...rest }) => {
  return (
    <div className='form-control'>
      <label>{label}</label>
      {options.map((option) => (
        <div key={option.value} className='checkbox-group'>
          <Field type='checkbox' id={option.key} value={option.value} name={name} {...rest} className={`${classes}`} />
          <label htmlFor={option.key}>{option.key}</label>
        </div>
      ))}
      <ErrorMessage name={name} component={ErrorText} />
    </div>
  );
};

export default Checkbox;
