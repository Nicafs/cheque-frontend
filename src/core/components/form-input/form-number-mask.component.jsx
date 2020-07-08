import React from 'react';
import NumberFormat from 'react-number-format';

import { OutlinedInput, FormControl, InputLabel, FormHelperText } from '@material-ui/core';

const FormNumberMaskInput = ({ handleChange, label, format, mask, fullWidth, 
                                thousandSeparator, prefix, decimalSeparator, 
                                helperText, error, ...props }) => (
    <FormControl variant="outlined" fullWidth={fullWidth} error={error}>
        {label ? (
            <InputLabel htmlFor={label}>
                {label}
            </InputLabel>
        ) : null}

        <NumberFormat
            customInput={OutlinedInput}
            format={format || null}
            mask={mask || ''}
            onValueChange={handleChange}
            type="text"
            thousandSeparator={thousandSeparator}
            decimalSeparator={decimalSeparator}
            prefix={prefix ? prefix : ''}
            labelWidth={label.length > 5 ? label.length * 8 : 50}
            {...props}
        />

        {helperText ? 
          <FormHelperText id={'helper'+label}>{helperText}</FormHelperText>
        : null }
    </FormControl>
);

export default FormNumberMaskInput;