import React, { useState } from "react";
import { withRouter } from 'react-router-dom';

import { Button, Card, CardContent, CardHeader, ButtonGroup } from '@material-ui/core';

import FormInput from '../../../core/components/form-input/form-input.component';
import FormDate from '../../../core/components/form-input/form-date.component';
import FormSelect from '../../../core/components/form-input/form-select.component';
import './filters.styles.scss';

function Filters({ filters, handleSubmit, title, linkTo, linkPrev, history, ...otherProps}) {

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

          {filters.map((filter, index) => {
            switch (filter.type) {
              case 'date':
                return <FormDate
                  key={filter.name}
                  name={filter.name}
                  value={filter.value}
                  onChange={date => handleChange({ target: { name: filter.name, value: date } })}
                  label={filter.label} />

              case 'select':
                return <FormSelect
                  key={filter.name}
                  name={filter.name}
                  value={filter.value}
                  onChange={handleChange}
                  label={filter.label}
                  selects={filter.selects}
                />

              default:
                return <FormInput
                  key={filter.name}
                  type={filter.type}
                  name={filter.name}
                  value={filter.value}
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
