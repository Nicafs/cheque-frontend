import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, CardHeader, ButtonGroup, Grid, TextField, MenuItem } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';
import FormSelect from '../../../core/components/form-input/form-select.component';
import FormNumberMaskInput from '../../../core/components/form-input/form-number-mask.component';
import FormNumberTextInput from '../../../core/components/form-input/form-text-mask.component';
import './filters.styles.scss';

const useStyles = makeStyles(() => ({
  groupItemButton: {
    '& button': { margin: '0px 5px'}
  },
  groupItem: {
    '& .MuiFormControl-root': { margin: '0px 10px 10px 0px', },
  },
  grow: { flexGrow: 1},
}));

function Filters({ filters, handleSubmit, title, linkTo, linkPrev, flgCreate, flgModal, history }) {
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

  const handleChange = (name, value) => {    
    setValues(prevValues => (prevValues.map(v => {
      if (v.name === name) return { ...v, value: value }
      return v;
    })))
  }

  const handleChangeFilter = (name, value) => {    
    setValues(prevValues => (prevValues.map(v => {
      if (v.name === name) return { ...v, filterType: value }
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
                                    label={value.label}
                                    value={value.value}
                                    onChange={date => handleChange(value.name, date)}
                                    fullWidth
                                    />

                          case 'select':
                            return <FormSelect
                                    key={value.name}
                                    name={value.name}
                                    label={value.label}
                                    value={value.value}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    fullWidth={value.fullWidth}
                                    selects={value.selects}
                                  />

                          case 'dialog':
                            return (
                              <Grid container item className={classes.groupItemButton}>
                                <FormInput
                                  key={value.name}
                                  type={value.type}
                                  name={value.name}
                                  label={value.label}
                                  value={value.value}
                                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                                  onBlur={value.onBlur || null}
                                />

                                <Button variant="contained" color="primary" onClick={value.open}>
                                  <ExitToAppIcon />
                                </Button >

                                <Grid item className={classes.grow}>
                                  <FormInput
                                    type='text'
                                    name={value.name_disable}
                                    value={value.value_disable}
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                                    label='Descrição'
                                    disabled
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                            )

                          case 'numeric':
                            return  <div style={{display: 'flex', flexDirection: 'row'}}>
                                      <FormNumberMaskInput
                                        key={value.name}
                                        name={value.name}
                                        value={value.value}
                                        label={value.label}
                                        onValueChange={({ value: v }) =>  handleChange(value.name, v)}
                                        thousandSeparator={'.'}
                                        decimalSeparator={','}
                                        decimalScale={value.decimalScale | 0}
                                        fixedDecimalScale
                                        fullWidth
                                      />

                                      <TextField style={{ color: 'rgba(0, 0, 0, 0.87)',
                                                          backgroundColor: '#e0e0e0',
                                                          marginLeft: '4px',
                                                          width: '105px' }} className={'selectFilterType'}
                                          value={value.filterType}
                                          onChange={(e) => handleChangeFilter(value.name, e.target.value)}
                                          variant="outlined"
                                          select >
                                        <MenuItem value={'equal'}> Igual </MenuItem>
                                        <MenuItem value={'lessThan'}> Menor </MenuItem>
                                        <MenuItem value={'greaterThan'}> Maior </MenuItem>
                                      </TextField>
                                    </div>
      
                          case 'money':
                            return <FormNumberMaskInput
                                      key={value.name}
                                      name={value.name}
                                      value={value.value}
                                      label={value.label}
                                      onValueChange={({ value: v }) =>  handleChange(value.name, v)}
                                      thousandSeparator={'.'}
                                      decimalSeparator={','}
                                      decimalScale={2}
                                      fixedDecimalScale
                                      prefix={'R$ '}
                                      fullWidth
                                  />
    
                          case 'maskNumero':
                            return <FormNumberMaskInput
                                      key={value.name}
                                      name={value.name}
                                      value={value.value}
                                      label={value.label}
                                      onValueChange={({ value: v }) =>  handleChange(value.name, v)}
                                      format={value.format || null}
                                      mask={value.mask || null}
                                      fullWidth
                                  />
    
                          case 'maskText':
                            return <FormNumberTextInput
                                      key={value.name}
                                      name={value.name}
                                      value={value.value}
                                      label={value.label}
                                      onValueChange={({ value: v }) =>  handleChange(value.name, v)}
                                      format={value.mask || null}
                                      fullWidth
                                  />

                          default:
                            return <FormInput
                                    key={value.name}
                                    type={value.type}
                                    name={value.name}
                                    label={value.label}
                                    value={value.value}
                                    fullWidth
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}
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
            
            {!flgCreate ? 
              <Button variant="contained" type="button" color="secondary" 
                  onClick={() => history.push(`${linkTo}`)}>
                Cadastrar
              </Button>
            : null }

            { flgModal ?
              <Button variant="contained" type="button"
                  onClick={() => flgModal()}>
                Fechar
              </Button>
            :
              <Button variant="contained" type="button"
                  onClick={() => history.push(`${linkPrev}`)}>
                Voltar
              </Button>
            }
          </ButtonGroup>

        </form>
      </CardContent>
    </Card>
  );
}

export default withRouter(Filters);
