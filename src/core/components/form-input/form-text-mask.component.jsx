import React from 'react';
// import MaskedInput from 'react-text-mask';

import { FormControl } from '@material-ui/core';

const FormNumberMaskInput = ({ handleChange, label, format, fullWidth, ...props }) => (
    <FormControl variant="outlined" fullWidth={fullWidth}>
        {/* {label ? (
            <InputLabel htmlFor={label}>
                {label}
            </InputLabel>
        ) : null}

        <MaskedInput
            customInput={OutlinedInput}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            onValueChange={handleChange}
            type="text"
            labelWidth={label.length > 5 ? label.length * 8 : 50}
            {...props}
        /> */}
    </FormControl>
);

export default FormNumberMaskInput;
