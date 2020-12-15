import React from 'react';
import { Formik, Form } from 'formik';
import FormController from '../form/FormController';

const Home = () => {
  const options = () => {
    const lists = [];
    for (let i = 1990; i < 2020; i++) {
      lists.push({ key: i, value: i });
    }
    return lists;
  };
  const options2 = [
    { key: 'seiga', value: 'seiga' },
    { key: 'boci', value: 'boci' },
    { key: 'omeng', value: 'omeng' },
  ];
  const options3 = [
    { key: 'makan', value: 'makan' },
    { key: 'minum', value: 'minum' },
    { key: 'ngopo', value: 'ngopi' },
  ];
  const initialValues = {
    input: '',
    file: null,
    date: '',
    checkbox: [],
    radio: '',
    textarea: '',
  };

  const onSubmit = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => {
          return (
            <Form>
              <FormController control='input' name='input' label='input' placeholder='Hello input here' />
              <FormController control='file' name='file' label='file' placeholder='Choose file here' />
              <FormController control='date' name='date' label='Date' placeholder='Hello input date here' />
              <FormController control='select' options={options()} name='year' label='Year' />
              <FormController control='checkbox' options={options3} name='checkbox' label='checkbox' />
              <FormController control='radio' options={options2} name='radio' label='radio' />
              <FormController control='textarea' name='textarea' label='textarea' placeholder='Hello input here' />
              <input type='submit' className='btn btn-success' value='Submit' />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Home;
