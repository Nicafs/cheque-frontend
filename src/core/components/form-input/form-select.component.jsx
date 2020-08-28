import React from 'react';

import { FormControl, TextField, FormHelperText, MenuItem } from '@material-ui/core';

const FormSelect = ({ handleChange, label, name, value, selects, fullWidth,
                      dependentName, parentValue, helperText, error, ...props }) => (
    <FormControl variant="outlined" fullWidth={fullWidth} error={error}>
      <TextField
          id={name}
          name={name}
          label={label}
          value={value}
          onChange={handleChange}
          variant="outlined"
          select
          SelectProps={{
            displayEmpty: true
          }}
          InputLabelProps={{ shrink: true }}
          {...props}
      >

        <MenuItem aria-label="Nenhum" value={''}> Selecione </MenuItem>

        {selects ?
            !dependentName ?
              selects.map(select => {
                return <MenuItem key={select.value} value={select.value}> {select.description} </MenuItem>
              })
            : parentValue ? selects.find(ec => ec.sigla === parentValue)[dependentName].map(select => {
                return <MenuItem key={select} value={select}> {select} </MenuItem>
              }) : null
        : null }
      </TextField>

      {helperText ?
        <FormHelperText id={'helper'+label}>{helperText}</FormHelperText>
      : null }
    </FormControl>
);

export default FormSelect;

