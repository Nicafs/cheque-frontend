import React, { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';

import { Button, Card, CardContent, CardHeader, ButtonGroup, Link } from '@material-ui/core';

import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';
import FormSelect from '../../../core/components/form-input/form-select.component';
import './filters.styles.scss';

export default function Filters({ filters, handleSubmit, linkTo, linkPrev, ...otherProps}) {

  const handleSubmitForm = async event => {
    event.preventDefault();

    handleSubmit(values);
  }

  const handleChange = e => {
    const { name, value } = e.target
    // setValues({ ...filters, [name]: value })

    setValues(prevFilters => (prevFilters.map((filter) => {
      if (filter.name === name) return { ...filter, value: value }
      return filter;
    })))
  }


  const [values, setValues] = useState(filters);

  return (
    <Card variant="outlined">
      <CardHeader title="Criar um Cliente" />

      <CardContent>
        <form className='clienteForm' onSubmit={handleSubmitForm}>

          {filters.map((filter, index) => {
            switch (filter.type) {
              case 'date':
                return <FormDate
                  key={filter.name}
                  name={filter.name}
                  value={values[filter.value]}
                  onChange={date => handleChange({ target: { name: filter.name, value: date } })}
                  label={filter.label} />

              case 'select':
                return <FormSelect
                  key={filter.name}
                  name={filter.name}
                  value={values[filter.value]}
                  onChange={handleChange}
                  label={filter.label}
                  selects={filter.selects}
                />

              default:
                return <FormInput
                  key={filter.name}
                  type={filter.type}
                  name={filter.name}
                  value={values[filter.value]}
                  onChange={handleChange}
                  label={filter.label}
                />
            }
          })
          }

          <ButtonGroup className="btn-group">
            <Button variant="contained" type="submit" color="primary">
              Buscar
            </Button>
            
            <Link component={RouterLink} to={linkTo}>
              <Button variant="contained" type="button" color="secondary">
                Cadastrar
              </Button>
            </Link>

            <Link component={RouterLink} to={linkPrev}>
              <Button variant="contained" type="button">
                Voltar
              </Button>
            </Link>
          </ButtonGroup>

        </form>
      </CardContent>
    </Card>
  );
}
