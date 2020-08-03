import React from 'react';
import NumberFormat from 'react-number-format';

import { OutlinedInput, FormControl, InputLabel, FormHelperText } from '@material-ui/core';

const FormNumberMaskInput = ({ label, format, mask, fullWidth, 
                                thousandSeparator, prefix, decimalScale, 
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
            type="text"
            isNumericString
            thousandSeparator={thousandSeparator}
            decimalScale={decimalScale}
            prefix={prefix ? prefix : ''}
            labelWidth={label.length > 5 ? label.length * 10 : 50}
            {...props}
        />

        {helperText ? 
          <FormHelperText id={'helper'+label}>{helperText}</FormHelperText>
        : null }
    </FormControl>
);

export default FormNumberMaskInput;