import React from "react";
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

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

function FormField({ fields, values, hookFormCustom, handleSubmit,
                     handleChange, handleClear, handleEdit, handleDelete, title,
                     isMultiple, disable }) {

  const classes = useStyles();
  let { register, errors, ...hookForm } = useForm();

  if (hookFormCustom){
    register = hookFormCustom.register;
    errors = hookFormCustom.errors;
    hookForm.handleSubmit = hookFormCustom.handleSubmit;
  }

  const disableInputs = (disable, value) => {
    if (disable) {
      if (disable.value === value) {
        disable.fields.forEach(field => {
          const element = document.getElementById(field);

          if(element) {
            element.disabled = true;
            element.classList.add('disabled');

            const nameCompost = field.split('.');
            Object.keys(values).find((key) => {
              if(key === nameCompost[0]) handleChange(field, '');
              return key === nameCompost[0];
            })
          }
        })
      } else {
        disable.fields.forEach(field => {
          const element = document.getElementById(field);

          if(element) {
            element.disabled = false;
            element.classList.remove('disabled');
          }
        })
      }
    }
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

              return (
                  <Grid item xs={field.size} key={field.name} style={{order: index}}>
                    { (() => {
                      switch (field.type) {
                        case 'date':
                          return <FormDate
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    value={value}
                                    onChange={date => handleChange(field.name, date)}
                                    fullWidth
                                    error={errors[field.name] ? true : false}
                                    inputRef={register(field.errors)}
                                    helperText={errors[field.name] ? errors[field.name].message : null}
                                    disabled={field.disabled || disable || false}
                                    />

                        case 'select':
                          return <FormSelect
                                    key={field.name}
                                    name={field.name}
                                    label={field.label}
                                    value={value}
                                    onChange={(e) => { handleChange(e.target.name, e.target.value); disableInputs(field.disable, e.target.value) } }
                                    fullWidth={field.fullWidth}
                                    selects={field.selects}
                                    error={errors[field.name] ? true : false}
                                    inputRef={register(field.errors)}
                                    helperText={errors[field.name] ? errors[field.name].message : null}
                                    disabled={field.disabled || disable || false}
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
                                    disabled={field.disabled || disable || false}
                                />

                        case 'dialog':
                          const keyCompostDisable = field.name_disable.split('.');

                          return (
                          <Grid container item className={classes.groupItemButton}>
                            <FormInput
                              key={field.name}
                              type={field.type}
                              name={field.name}
                              label={field.label}
                              value={value}
                              onChange={(e) =>  handleChange(e.target.name, e.target.value)}
                              onBlur={field.onBlur || null}
                              error={errors[field.name] ? true : false}
                              inputRef={register(field.errors)}
                              helperText={errors[field.name] ? errors[field.name].message : null}
                              disabled={field.disabled || disable || false}
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
                                    value={value}
                                    label={field.label}
                                    onValueChange={({ value: v }) =>  handleChange(field.name, v)}
                                    thousandSeparator={true}
                                    decimalSeparator={'.'}
                                    decimalScale={field.decimalScale}
                                    fixedDecimalScale
                                    fullWidth
                                    error={errors[field.name] ? true : false}
                                    inputRef={register(field.errors)}
                                    helperText={errors[field.name] ? errors[field.name].message : null}
                                    disabled={field.disabled || disable || false}
                                />

                        case 'money':
                          return <FormNumberMaskInput
                                    key={field.name}
                                    name={field.name}
                                    value={value}
                                    label={field.label}
                                    onValueChange={({ value: v }) =>  handleChange(field.name, v)}
                                    thousandSeparator={true}
                                    decimalSeparator={'.'}
                                    decimalScale={2}
                                    prefix={'R$ '}
                                    fullWidth
                                    error={errors[field.name] ? true : false}
                                    inputRef={register(field.errors)}
                                    helperText={errors[field.name] ? errors[field.name].message : null}
                                    disabled={field.disabled || disable || false}
                                />

                        case 'maskNumero':
                          return <FormNumberMaskInput
                                    key={field.name}
                                    name={field.name}
                                    value={value}
                                    label={field.label}
                                    onValueChange={({ value: v }) =>  handleChange(field.name, v)}
                                    format={field.format || null}
                                    mask={field.mask || null}
                                    fullWidth
                                    error={errors[field.name] ? true : false}
                                    inputRef={register(field.errors)}
                                    helperText={errors[field.name] ? errors[field.name].message : null}
                                    disabled={field.disabled || disable || false}
                                />

                        case 'maskText':
                          return <FormNumberTextInput
                                    key={field.name}
                                    name={field.name}
                                    value={value}
                                    label={field.label}
                                    onValueChange={({ value: v }) =>  handleChange(field.name, v)}
                                    format={field.mask || null}
                                    fullWidth
                                    error={errors[field.name] ? true : false}
                                    inputRef={register(field.errors)}
                                    helperText={errors[field.name] ? errors[field.name].message : null}
                                    disabled={field.disabled || disable || false}
                                />

                        default:
                          return <FormInput
                                    key={field.name}
                                    type={field.type}
                                    name={field.name}
                                    value={value}
                                    label={field.label}
                                    fullWidth
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    error={errors[field.name] ? true : false}
                                    inputRef={register(field.errors)}
                                    helperText={errors[field.name] ? errors[field.name].message : null}
                                    disabled={field.disabled || disable || false}
                                />;
                        }
                      })()
                    }
                  </Grid>
                )
              })
            }
          </Grid>


          {disable ? (
              <ButtonGroup className="btn-group">
                <Button variant="contained" type="button" color="primary"
                  onClick={handleEdit}  startIcon={<EditIcon />}>
                  Editar
                </Button>
                <Button variant="contained" type="button" color="default"
                    onClick={handleDelete} startIcon={<DeleteIcon />}>
                  Deletar
                </Button>
              </ButtonGroup>
            ): null
          }

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
