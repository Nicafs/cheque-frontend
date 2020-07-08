import React from 'react';

import { FormControl, InputLabel, Select, FormHelperText } from '@material-ui/core';

const FormSelect = ({ handleChange, label, name, value, selects, fullWidth, 
                      dependentName, parentValue, helperText, error, ...props }) => (
    <FormControl variant="outlined" fullWidth={fullWidth} error={error}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Select
            native
            value={value}
            onChange={handleChange}
            label={label}
            id={name}
            name={name}
            {...props}
        >
            <option aria-label="Nenhum" value={null}> Selecione </option>
            {selects ? 
                !dependentName ? 
                  selects.map(select => {
                    return <option key={select.value} value={select.value}> {select.description} </option>
                  })
                : parentValue ? selects.find(ec => ec.sigla === parentValue)[dependentName].map(select => {
                    return <option key={select} value={select}> {select} </option>
                  }) : null
            : null }
        </Select>

        {helperText ? 
          <FormHelperText id={'helper'+label}>{helperText}</FormHelperText>
        : null }
    </FormControl>
);

export default FormSelect;

