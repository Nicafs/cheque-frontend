import React, { useState } from "react";
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
    '& .MuiButtonBase-root': { margin: '0px 10px 10px 5px', },
  },
  groupItem: {
    '& .MuiFormControl-root': { margin: '0px 10px 10px 0px', },
  },
}));

function Filters({ filters, handleSubmit, title, linkTo, linkPrev, history, ...otherProps}) {
  const classes = useStyles();

  const handleSubmitForm = async event => {
    event.preventDefault();

    handleSubmit(values);
  }

  const handleChange = e => {
    const { name, value } = e.target

    setValues(prevFilters => (prevFilters.map((filter) => {
      if (filter.name === name) return { ...filter, value: value }
      return filter;
    })))
  }


  const [values, setValues] = useState(filters);

  return (
    <Card variant="outlined">
      <CardHeader title={title} />

      <CardContent>
        <form className='filterForm' onSubmit={handleSubmitForm}>
          <Grid container spacing={3}>
            {filters.map((filter, index) => {
                return (
                  <Grid item xs={filter.size} key={filter.name}>
                    { (() => { 
                        switch (filter.type) {
                          case 'date':
                            return <FormDate
                                    key={filter.name}
                                    name={filter.name}
                                    value={filter.value}
                                    fullWidth
                                    onChange={date => handleChange({ target: { name: filter.name, value: date } })}
                                    label={filter.label} />

                          case 'select':
                            return <FormSelect
                              key={filter.name}
                              name={filter.name}
                              value={filter.value}
                              onChange={handleChange}
                              fullWidth
                              label={filter.label}
                              selects={filter.selects}
                            />

                          case 'dialog':
                            return (
                              <Grid container item className={classes.groupItemButton}>
                                <FormInput
                                  key={filter.name}
                                  type={filter.type}
                                  name={filter.name}
                                  value={filter.value}
                                  onChange={handleChange}
                                  label={filter.label}
                                />

                                <Button variant="contained" color="primary" onClick={filter.open}>
                                  <ExitToAppIcon />
                                </Button >

                                <Grid item xs={8}>
                                  <FormInput
                                    type='text'
                                    name={filter.name_disable}
                                    value={filter.value_disable}
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
                              key={filter.name}
                              type={filter.type}
                              name={filter.name}
                              value={filter.value}
                              fullWidth
                              onChange={handleChange}
                              label={filter.label}
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
