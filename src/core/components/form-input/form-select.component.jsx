import React from 'react';

import { FormControl, InputLabel, Select } from '@material-ui/core';

const FormSelect = ({ handleChange, label, name, value, selects, ...props }) => (
    <FormControl variant="outlined">
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
            {selects.map(select => {
                   return <option key={select.value} value={select.value}> {select.description} </option>
                })
            }
        </Select>
    </FormControl>
);

export default FormSelect;

