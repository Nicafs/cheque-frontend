import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardHeader, ButtonGroup, Grid } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';
import FormSelect from '../../../core/components/form-input/form-select.component';
import './filters.styles.scss';

const useStyles = makeStyles(() => ({
  groupItemButton: {
    '& .MuiButtonBase-root': { margin: '10px 0px 10px 0px', },
  },
  groupItem: {
    '& .MuiFormControl-root': { margin: '0px 10px 10px 0px', },
  },
  grow: { flexGrow: 1},
}));

function Filters({ filters, handleSubmit, title, linkTo, linkPrev, history }) {
  const classes = useStyles();
  const [values, setValues] = useState(filters);

  useEffect(() => {
    setValues(prevValues => (prevValues.map(prevValue => {
      if (prevValue.type === 'dialog') {
        const filter = filters.find(filter => filter.name === prevValue.name && filter.value !== prevValue.value );
        if (filter)
        {
          return { ...prevValue, value: filter.value, value_disable: filter.value_disable }
        }

        return prevValue;
      }
      return prevValue;
    })));
  }, [filters]);

  const handleSubmitForm = async event => {
    event.preventDefault();

    handleSubmit(values);
  }

  const handleChange = e => {
    const { name, value } = e.target
    
    setValues(prevValues => (prevValues.map(v => {
      if (v.name === name) return { ...v, value: value }
      return v;
    })))
  }

  return (
    <Card variant="outlined">
      <CardHeader title={title} />

      <CardContent>
        <form className='filterForm' onSubmit={handleSubmitForm}>
          <Grid container spacing={1}>
            {values.map((value, index) => {
                return (
                  <Grid item xs={value.size} key={value.name}>
                    { (() => { 
                        switch (value.type) {
                          case 'date':
                            return <FormDate
                                    key={value.name}
                                    name={value.name}
                                    value={value.value}
                                    fullWidth
                                    onChange={date => handleChange({ target: { name: value.name, value: date } })}
                                    label={value.label} />

                          case 'select':
                            return <FormSelect
                                    key={value.name}
                                    name={value.name}
                                    value={value.value}
                                    onChange={handleChange}
                                    fullWidth={value.fullWidth}
                                    label={value.label}
                                    selects={value.selects}
                                  />

                          case 'dialog':
                            return (
                              <Grid container item className={classes.groupItemButton}>
                                <FormInput
                                  key={value.name}
                                  type={value.type}
                                  name={value.name}
                                  value={value.value}
                                  onChange={handleChange}
                                  label={value.label}
                                />

                                <Button variant="contained" color="primary" onClick={value.open}>
                                  <ExitToAppIcon />
                                </Button >

                                <Grid item className={classes.grow}>
                                  <FormInput
                                    type='text'
                                    name={value.name_disable}
                                    value={value.value_disable}
                                    onChange={handleChange}
                                    label='Descrição'
                                    disabled
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                            )

                          default:
                            return <FormInput
                                    key={value.name}
                                    type={value.type}
                                    name={value.name}
                                    value={value.value}
                                    fullWidth
                                    onChange={handleChange}
                                    label={value.label}
                                  />
                        }
                      })()
                    }
                  </Grid>
                )
              })
            }
          </Grid>

          <ButtonGroup className="btn-group">
            <Button variant="contained" type="submit" color="primary">
              Buscar
            </Button>
            
            <Button variant="contained" type="button" color="secondary" 
                onClick={() => history.push(`${linkTo}`)}>
              Cadastrar
            </Button>

            <Button variant="contained" type="button"
                onClick={() => history.push(`${linkPrev}`)}>
              Voltar
            </Button>
          </ButtonGroup>

        </form>
      </CardContent>
    </Card>
  );
}

export default withRouter(Filters);
