import React from 'react';
import NumberFormat from 'react-number-format';

import { OutlinedInput, FormControl, InputLabel } from '@material-ui/core';

const FormNumberMaskInput = ({ handleChange, label, format, fullWidth, thousandSeparator, prefix, decimalSeparator, ...props }) => (
    <FormControl variant="outlined" fullWidth={fullWidth}>
        {label ? (
            <InputLabel htmlFor={label}>
                {label}
            </InputLabel>
        ) : null}

        <NumberFormat
            customInput={OutlinedInput}
            format={format || null}
            onValueChange={handleChange}
            type="text"
            thousandSeparator={thousandSeparator}
            decimalSeparator={decimalSeparator}
            prefix={prefix ? prefix : ''}
            labelWidth={label.length > 5 ? label.length * 8 : 50}
            {...props}
        />
    </FormControl>
);

export default FormNumberMaskInput;