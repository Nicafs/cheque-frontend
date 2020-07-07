import React from "react";
  import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Card, CardContent, CardHeader, Grid} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';
import FormSelect from '../../../core/components/form-input/form-select.component';
import FormNumberMaskInput from '../../../core/components/form-input/form-number-mask.component';
import FormNumberTextInput from '../../../core/components/form-input/form-text-mask.component';

const useStyles = makeStyles(() => ({
  groupItemButton: {
    '& .MuiButtonBase-root': { margin: '0px 10px 10px 5px', },
  },
  groupItem: {
    '& .MuiFormControl-root': { margin: '0px 10px 10px 0px', },
  },
}));

function FormField({ fields, values, valuesOld, handleSubmit, handleChange, handleClear, title, isMultiple }) {
  // const [newValues, setNewValues] = useState(EnderecoClient);
  const classes = useStyles();

  return (
  <form className='formField' onSubmit={handleSubmit}>
    <Card variant="outlined">
    <CardHeader title={title} />

    <CardContent>
      <Grid container spacing={1}>
        { Object.keys(values).map(key => {
          const field = fields.find( f => { return f.name === key; })
          const order = fields.findIndex( f => { return f.name === key; })
          const value = values[key];
          
          if(field) {
            return (
              <Grid item xs={field.size} key={key} style={{order: order}}>
                { (() => { 
                  switch (field.type) {
                    case 'date':
                      return <FormDate
                              key={key}
                              name={key}
                              value={value}
                              fullWidth
                              onChange={date => handleChange(key, date)}
                              label={field.label} />

                    case 'select':
                        return <FormSelect
                                key={key}
                                name={key}
                                value={value}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                fullWidth={field.fullWidth}
                                label={field.label}
                                selects={field.selects}
                            />

                    case 'selectDependent':
                        return <FormSelect
                                key={key}
                                name={key}
                                value={value}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                fullWidth={field.fullWidth}
                                label={field.label}
                                selects={field.selects}
                                dependentName={field.dependentName}
                                parentValue={values[field.parentValue]}
                            />

                    case 'dialog':
                        return (
                        <Grid container item className={classes.groupItemButton}>
                            <FormInput
                              key={key}
                              type={field.type}
                              name={key}
                              value={value}
                              onChange={(e) => handleChange(e.target.name, e.target.value)}
                              label={field.label}
                              />

                            <Button variant="contained" color="primary" onClick={field.open}>
                              <ExitToAppIcon />
                            </Button >

                            <Grid item xs={8}>
                            <FormInput
                                type='text'
                                name={field.key_disable}
                                value={field.value_disable}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                label='Descrição'
                                disabled
                                fullWidth
                            />
                            </Grid>
                        </Grid>
                        )

                    case 'numeric':
                      return <FormNumberMaskInput
                                key={key}
                                name={key}
                                value={value}
                                thousandSeparator={true}
                                decimalSeparator={'.'}
                                decimalScale={2}
                                fixedDecimalScale
                                fullWidth
                                onChange={({ value: v }) =>  handleChange(key, v)}
                                label={field.label}
                            />

                    case 'money':
                      return <FormNumberMaskInput
                                key={key}
                                name={key}
                                value={value}
                                thousandSeparator={true}
                                decimalSeparator={'.'}
                                decimalScale={2}
                                prefix={'R$ '}
                                fullWidth
                                onChange={({ value: v }) =>  handleChange(key, v)}
                                label={field.label}
                            />

                    case 'maskNumero':
                      return <FormNumberMaskInput
                                key={key}
                                name={key}
                                value={value}
                                format={field.format || null}
                                mask={field.mask || null}
                                fullWidth
                                onChange={({ value: v }) =>  handleChange(key, v)}
                                label={field.label}
                            />

                    case 'maskText':
                      return <FormNumberTextInput
                                key={key}
                                name={key}
                                value={value}
                                format={field.mask || null}
                                fullWidth
                                onChange={({ value: v }) =>  handleChange(key, v)}
                                label={field.label}
                            />

                    case 'text':
                      return <FormInput
                              key={key}
                              type={field.type}
                              name={key}
                              value={value}
                              fullWidth
                              onChange={(e) => handleChange(e.target.name, e.target.value)}
                              label={field.label}
                          />
                    default:
                      return '';
                    }
                  })()
                }
              </Grid>
              )
          }

          return ''
          })
        }
      </Grid>

      {isMultiple ? (
          <ButtonGroup className="btn-group">
            <Button variant="contained" type="button" color="primary"
              onClick={handleSubmit}  startIcon={<DoneIcon />}>
              Salvar
            </Button>
            <Button variant="contained" type="button" color="default" 
                onClick={handleClear} startIcon={<ClearIcon />}>
              Limpar
            </Button>
          </ButtonGroup>
        )
        : null
      }
    </CardContent>
    </Card>
  </form>
  );
}

export default withRouter(FormField);
