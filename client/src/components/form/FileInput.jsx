import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorText from './ErrorText';
import Icon from '../iconcomp/Icon';

const Input = ({ label, name, accept, placeholder, currentvalue, ...rest }) => {
  return (
    <div className='form-control'>
      <label htmlFor={name} className='input-box'>
        {currentvalue ? (
          <label htmlFor={name} className='file-label'>
            <img src={URL.createObjectURL(currentvalue)} alt='image' />
          </label>
        ) : (
          <label htmlFor={name} className='file-label'>
            <Icon icon='fas fa-plus' />
          </label>
        )}
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
