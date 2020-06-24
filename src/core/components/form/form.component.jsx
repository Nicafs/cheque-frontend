import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardHeader, ButtonGroup, Grid } from '@material-ui/core';

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeleteIcon from '@material-ui/icons/Delete';

import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';
import FormSelect from '../../../core/components/form-input/form-select.component';

const useStyles = makeStyles(() => ({
  groupItemButton: {
    '& .MuiButtonBase-root': { margin: '0px 10px 10px 5px', },
  },
  groupItem: {
    '& .MuiFormControl-root': { margin: '0px 10px 10px 0px', },
  },
}));

function FormField({ fields, values, handleSubmit, handleDelete, handleChange, title }) {
  const classes = useStyles();
  
  // const handleChange = e => {
  //   const { name, value } = e.target
    
  //   setfields(prevFields => (prevFields.map(v => {
  //     if (v.name === name) return { ...v, value: value }
  //     return v;
  //   })))
  // }

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
    </CardContent>
    </Card>
      
    <ButtonGroup className="btn-group">
      <Button variant="contained" type="submit" color="primary">
        Salvar
      </Button>
      <Button variant="contained" type="button" color="secondary" 
          onClick={handleDelete} startIcon={<DeleteIcon />}>
        Excluir
      </Button>
    </ButtonGroup>
  </form>
  );
}

export default FormField;
