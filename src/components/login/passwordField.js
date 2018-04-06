import * as React from 'react';
import TextField from 'material-ui/TextField';
import type { FieldProps } from 'redux-form';

const renderPasswordField = ({
  input,
  helperText,
  meta: { touched, error },
  ...custom
}: FieldProps) => (
  <TextField
    label="Пароль"
    type="password"
    helperText={touched && error ? error : ''}
    error={touched && error ? true : false}
    {...input}
    {...custom}
  />
);

export default renderPasswordField;
