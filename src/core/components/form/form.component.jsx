import React from "react";
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
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
    '& button': { margin: '0px 5px'}
  },
  groupItem: {
    '& .MuiFormControl-root': { margin: '0px 10px 10px 0px', },
  },
  grow: { flexGrow: 1},
}));

function FormField({ fields, values, hookFormCustom, handleSubmit, handleChange, handleClear, title, isMultiple }) {
  // const [newValues, setNewValues] = useState(EnderecoClient);
  const classes = useStyles();
  let { register, errors, ...hookForm } = useForm();

  if (hookFormCustom){
    register = hookFormCustom.register;
    errors = hookFormCustom.errors;
    hookForm.handleSubmit = hookFormCustom.handleSubmit;
  }

  console.log("fields:", fields);

  console.log("values:", values);

  return (
    <form className='formField' onSubmit={hookForm.handleSubmit(handleSubmit)}>
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
                                  label={field.label}
                                  error={errors[key] ? true : false}
                                  inputRef={register(field.errors)}
                                  helperText={errors[key] ? errors[key].message : null}
                                  disabled={field.disabled || false} />

                      case 'select':
                          return <FormSelect
                                    key={key}
                                    name={key}
                                    value={value}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    fullWidth={field.fullWidth}
                                    label={field.label}
                                    selects={field.selects}
                                    error={errors[key] ? true : false}
                                    inputRef={register(field.errors)}
                                    helperText={errors[key] ? errors[key].message : null}
                                    disabled={field.disabled || false}
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
                                    error={errors[key] ? true : false}
                                    inputRef={register(field.errors)}
                                    helperText={errors[key] ? errors[key].message : null}
                                    disabled={field.disabled || false}
                                />

                      case 'dialog':
                          const keyCompost = `${key}.id`;
                          const keyCompostDisable = `${key}.${field.key_disable}`;
                          return (
                          <Grid container item className={classes.groupItemButton}>
                              <FormInput
                                key={keyCompost}
                                type={field.type}
                                name={keyCompost}
                                value={value.id}
                                onChange={(e) => handleChange(e.target.name, e.target.value)}
                                onBlur={field.onBlur || null}
                                label={field.label}
                                error={errors[keyCompost] ? true : false}
                                inputRef={register(field.errors)}
                                helperText={errors[keyCompost] ? errors[keyCompost].message : null}
                                disabled={field.disabled || false}
                                />

                              <Button variant="contained" color="primary" onClick={field.open}>
                                <ExitToAppIcon />
                              </Button >

                              <Grid item className={classes.grow}>
                                <FormInput
                                    type='text'
                                    name={keyCompostDisable}
                                    value={values[key][field.key_disable]}
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
                                  defaultValue={value}
                                  thousandSeparator={true}
                                  decimalSeparator={'.'}
                                  decimalScale={2}
                                  fixedDecimalScale
                                  fullWidth
                                  onValueChange={({ value: v }) =>  handleChange(key, v)}
                                  label={field.label}
                                  error={errors[key] ? true : false}
                                  inputRef={register(field.errors)}
                                  helperText={errors[key] ? errors[key].message : null}
                                  disabled={field.disabled || false}
                              />

                      case 'money':
                        return <FormNumberMaskInput
                                  key={key}
                                  name={key}
                                  defaultValue={value}
                                  thousandSeparator={true}
                                  decimalSeparator={'.'}
                                  decimalScale={2}
                                  prefix={'R$ '}
                                  fullWidth
                                  onValueChange={({ value: v }) =>  handleChange(key, v)}
                                  label={field.label}
                                  error={errors[key] ? true : false}
                                  inputRef={register(field.errors)}
                                  helperText={errors[key] ? errors[key].message : null}
                                  disabled={field.disabled || false}
                              />

                      case 'maskNumero':
                        return <FormNumberMaskInput
                                  key={key}
                                  name={key}
                                  defaultValue={value}
                                  format={field.format || null}
                                  mask={field.mask || null}
                                  fullWidth
                                  onValueChange={({ value: v }) =>  handleChange(key, v)}
                                  label={field.label}
                                  error={errors[key] ? true : false}
                                  inputRef={register(field.errors)}
                                  helperText={errors[key] ? errors[key].message : null}
                                  disabled={field.disabled || false}
                              />

                      case 'maskText':
                        return <FormNumberTextInput
                                  key={key}
                                  name={key}
                                  defaultValue={value}
                                  format={field.mask || null}
                                  fullWidth
                                  onValueChange={({ value: v }) =>  handleChange(key, v)}
                                  label={field.label}
                                  error={errors[key] ? true : false}
                                  inputRef={register(field.errors)}
                                  helperText={errors[key] ? errors[key].message : null}
                                  disabled={field.disabled || false}
                              />

                      default:
                        return <FormInput
                                  key={key}
                                  type={field.type}
                                  name={key}
                                  value={value}
                                  fullWidth
                                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                                  label={field.label}
                                  error={errors[key] ? true : false}
                                  inputRef={register(field.errors)}
                                  helperText={errors[key] ? errors[key].message : null}
                                  disabled={field.disabled || false}
                              />;
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
              <Button variant="contained" type="submit" color="primary"
                startIcon={<DoneIcon />}>
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
