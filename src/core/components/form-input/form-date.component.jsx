import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import enLocale from "date-fns/locale/pt-BR";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function FormDate({ handleChangeDate, ...props }) {

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enLocale}>
        <KeyboardDatePicker
          format="dd/MM/yyyy"
          onChange={handleChangeDate}
          inputVariant="outlined"
          {...props}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}