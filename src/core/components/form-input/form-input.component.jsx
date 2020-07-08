import React from 'react';

import { TextField, FormControl } from '@material-ui/core';

const FormInput = ({ handleChange, label, fullWidth, ...props }) => (
  <FormControl variant="outlined" fullWidth={fullWidth}>
      {/* {label ? (
          <InputLabel htmlFor={label}>
              {label}
          </InputLabel>
      ) : null}

      <OutlinedInput id={label} 
                     onChange={handleChange} 
                     {...props} 
                      />
       {helperText ? 
        <FormHelperText id={'helper'+label}>{helperText}</FormHelperText>
       : null } */}

      <TextField
        id={label} 
        label={label} 
        onChange={handleChange} 
        variant="outlined"
        {...props} 
      >

       </TextField>
  </FormControl>
);

export default FormInput;