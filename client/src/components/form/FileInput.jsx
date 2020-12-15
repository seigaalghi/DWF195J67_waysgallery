import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorText from './ErrorText';

const Input = ({ label, name, accept, placeholder, ...rest }) => {
  return (
    <div className='form-control'>
      <label htmlFor={name}>{label}</label>
      <label htmlFor={name} className='file-label'>
        {placeholder}
      </label>
      <Field>
        {(field) => {
          const { form } = field;
          const { setFieldValue } = form;
          return (
            <input
              type='file'
              name={name}
              id={name}
              accept={accept}
              {...rest}
              className='input-file'
              onChange={(e) => (e.target.files[0] ? setFieldValue(name, e.target.files[0]) : setFieldValue(name, null))}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={ErrorText} />
    </div>
  );
};

export default Input;
