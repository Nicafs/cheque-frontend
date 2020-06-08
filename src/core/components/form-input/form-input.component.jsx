import React from 'react';

import { OutlinedInput, FormControl, InputLabel } from '@material-ui/core';

const FormInput = ({ handleChange, label, ...props }) => (
    <FormControl variant="outlined">
        {label ? (
            <InputLabel htmlFor={label}>
                {label}
            </InputLabel>
        ) : null}

        <OutlinedInput id={label} onChange={handleChange} {...props} labelWidth={label.length > 5 ? label.length * 8 : 50} />
    </FormControl>
);

export default FormInput;