import React from 'react';

import { TextField, FormControl } from '@material-ui/core';

const FormInput = ({ handleChange, label, fullWidth, name, ...props }) => (
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
        id={name} 
        label={label} 
        name={name}
        onChange={handleChange} 
        variant="outlined"
        {...props} 
      >

       </TextField>
  </FormControl>
);

export default FormInput;