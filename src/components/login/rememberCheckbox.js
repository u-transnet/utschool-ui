// @flow

import * as React from 'react';
import type { FieldProps } from 'redux-form';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';

const renderRememberCheckbox = ({ input }: FieldProps) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={input.value ? true : false}
        onChange={input.onChange}
        color="primary"
      />
    }
    label="Remember Me"
  />
);

export default renderRememberCheckbox;
