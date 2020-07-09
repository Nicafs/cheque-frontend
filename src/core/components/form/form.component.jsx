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

  return (
    <form className='formField' onSubmit={hookForm.handleSubmit(handleSubmit)}>
      <Card variant="outlined">
      <CardHeader title={title} />

      <CardContent>
        <Grid container spacing={1}>
          { fields.map((field, index) => {

            const split = field.name.split('.')
            let value;

            if(split.length > 1) {
              Object.keys(values).find( key => { 
                if(key === split[0]) 
                  Object.keys(values[key]).find( k => {
                    if(k === split[1]) value = values[key][k];
                    return k === split[1];
                  }) 
                  return key === split[0];
                })
            } else {
              Object.keys(values).find( key => { if(key === field.name) value = values[key]; return key === field.name; })
            }
            
            if(field) {
              return (
                <Grid item xs={field.size} key={field.name} style={{order: index}}>
                  { (() => { 
                    switch (field.type) {
                      case 'date':
                        return <FormDate
                                  key={field.name}
                                  name={field.name}
                                  value={value}
                                  fullWidth
                                  onChange={date => handleChange(field.name, date)}
                                  label={field.label}
                                  error={errors[field.name] ? true : false}
                                  inputRef={register(field.errors)}
                                  helperText={errors[field.name] ? errors[field.name].message : null}
                                  disabled={field.disabled || false} />

                      case 'select':
                          return <FormSelect
                                    key={field.name}
                                    name={field.name}
                                    value={value}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    fullWidth={field.fullWidth}
                                    label={field.label}
                                    selects={field.selects}
                                    error={errors[field.name] ? true : false}
                                    inputRef={register(field.errors)}
                                    helperText={errors[field.name] ? errors[field.name].message : null}
                                    disabled={field.disabled || false}
                                />

                      case 'selectDependent':
                          return <FormSelect
                                    key={field.name}
                                    name={field.name}
                                    value={value}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    fullWidth={field.fullWidth}
                                    label={field.label}
                                    selects={field.selects}
                                    dependentName={field.dependentName}
                                    parentValue={values[field.parentValue]}
                                    error={errors[field.name] ? true : false}
                                    inputRef={register(field.errors)}
                                    helperText={errors[field.name] ? errors[field.name].message : null}
                                    disabled={field.disabled || false}
                                />

                      case 'dialog':
                          // const keyCompost = `${key}.id`;
                          const keyCompostDisable = field.name_disable.split('.');

                          return (
                          <Grid container item className={classes.groupItemButton}>
                            <FormInput
                              key={field.name}
                              type={field.type}
                              name={field.name}
                              value={value}
                              onChange={(e) =>  handleChange(e.target.name, e.target.value)}
                              onBlur={field.onBlur || null}
                              label={field.label}
                              error={errors[field.name] ? true : false}
                              inputRef={register(field.errors)}
                              helperText={errors[field.name] ? errors[field.name].message : null}
                              disabled={field.disabled || false}
                              />

                            <Button variant="contained" color="primary" onClick={field.open}>
                              <ExitToAppIcon />
                            </Button >

                            <Grid item className={classes.grow}>
                              <FormInput
                                  type='text'
                                  name={field.name_disable}
                                  value={values[keyCompostDisable[0]][keyCompostDisable[1]]}
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
                                  key={field.name}
                                  name={field.name}
                                  defaultValue={value}
                                  thousandSeparator={true}
                                  decimalSeparator={'.'}
                                  decimalScale={2}
                                  fixedDecimalScale
                                  fullWidth
                                  onValueChange={({ value: v }) =>  handleChange(field.name, v)}
                                  label={field.label}
                                  error={errors[field.name] ? true : false}
                                  inputRef={register(field.errors)}
                                  helperText={errors[field.name] ? errors[field.name].message : null}
                                  disabled={field.disabled || false}
                              />

                      case 'money':
                        return <FormNumberMaskInput
                                  key={field.name}
                                  name={field.name}
                                  defaultValue={value}
                                  thousandSeparator={true}
                                  decimalSeparator={'.'}
                                  decimalScale={2}
                                  prefix={'R$ '}
                                  fullWidth
                                  onValueChange={({ value: v }) =>  handleChange(field.name, v)}
                                  label={field.label}
                                  error={errors[field.name] ? true : false}
                                  inputRef={register(field.errors)}
                                  helperText={errors[field.name] ? errors[field.name].message : null}
                                  disabled={field.disabled || false}
                              />

                      case 'maskNumero':
                        return <FormNumberMaskInput
                                  key={field.name}
                                  name={field.name}
                                  defaultValue={value}
                                  format={field.format || null}
                                  mask={field.mask || null}
                                  fullWidth
                                  onValueChange={({ value: v }) =>  handleChange(field.name, v)}
                                  label={field.label}
                                  error={errors[field.name] ? true : false}
                                  inputRef={register(field.errors)}
                                  helperText={errors[field.name] ? errors[field.name].message : null}
                                  disabled={field.disabled || false}
                              />

                      case 'maskText':
                        return <FormNumberTextInput
                                  key={field.name}
                                  name={field.name}
                                  defaultValue={value}
                                  format={field.mask || null}
                                  fullWidth
                                  onValueChange={({ value: v }) =>  handleChange(field.name, v)}
                                  label={field.label}
                                  error={errors[field.name] ? true : false}
                                  inputRef={register(field.errors)}
                                  helperText={errors[field.name] ? errors[field.name].message : null}
                                  disabled={field.disabled || false}
                              />

                      default:
                        return <FormInput
                                  key={field.name}
                                  type={field.type}
                                  name={field.name}
                                  value={value}
                                  fullWidth
                                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                                  label={field.label}
                                  error={errors[field.name] ? true : false}
                                  inputRef={register(field.errors)}
                                  helperText={errors[field.name] ? errors[field.name].message : null}
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
