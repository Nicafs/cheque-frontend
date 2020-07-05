import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Card, CardContent, Grid, Button, ButtonGroup } from '@material-ui/core';

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

function ViewFormField({ fields, values, handleEdit, handleDelete }) {
  const classes = useStyles();

  return (
  <form className='formField'>
    <Card variant="outlined">
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
                                label={field.label} 
                                disabled />

                    case 'select':
                        return <FormSelect
                                key={key}
                                name={key}
                                value={value}
                                fullWidth={field.fullWidth}
                                label={field.label}
                                selects={field.selects}
                                disabled 
                            />

                    case 'dialog':
                        return (
                        <Grid container item className={classes.groupItemButton}>
                            <FormInput
                                key={key}
                                type={field.type}
                                name={key}
                                value={value}
                                label={field.label}
                                disabled 
                                />

                            <Grid item xs={8}>
                            <FormInput
                                type='text'
                                name={field.key_disable}
                                value={field.value_disable}
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
                                label={field.label}
                                disabled 
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
      </CardContent>
    </Card>
  </form>
  );
}

export default ViewFormField;
