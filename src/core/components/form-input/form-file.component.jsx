import React from 'react';

import { OutlinedInput, InputLabel, FormControl } from '@material-ui/core';

const FormFile = ({ handleChange, label, fullWidth, name, ...props }) => (
  <FormControl variant="outlined" fullWidth={fullWidth}>
      <InputLabel htmlFor={name} shrink={true} variant="outlined" >{label}</InputLabel>
      <OutlinedInput
        id="{name}"
        name="{name}"
        onChange={handleChange}
        variant="outlined"
        labelWidth={50}
        {...props}
      >
      </OutlinedInput>
  </FormControl>
);

export default FormFile;
