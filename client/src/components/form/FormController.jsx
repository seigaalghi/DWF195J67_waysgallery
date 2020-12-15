import React from 'react';
import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';
import Radio from './Radio';
import Checkbox from './CheckBox';
import DatePicker from './DatePicker';
import FileInput from './FileInput';

const FormController = ({ control, ...rest }) => {
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textarea':
      return <TextArea {...rest} />;
    case 'select':
      return <Select {...rest} />;
    case 'radio':
      return <Radio {...rest} />;
    case 'checkbox':
      return <Checkbox {...rest} />;
    case 'date':
      return <DatePicker {...rest} />;
    case 'file':
      return <FileInput {...rest} />;
    default:
      return null;
  }
};

export default FormController;
