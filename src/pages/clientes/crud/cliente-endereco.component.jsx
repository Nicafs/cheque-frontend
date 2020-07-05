import React, { useState } from "react";
// import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';

import { EnderecoClient as initialState } from '../../../model/EnderecoClient';
import FormField from '../../../core/components/form/form.component';
import ViewFormField from '../../../core/components/form/view-form.component';

const useStyles = makeStyles(() => ({
  multipleForm: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },
}));

let flgEdit = null;

function EnderecoClient ({ enderecos, setEnderecos, deleteEnderecoClient, updateEnderecoClient, createEnderecoClient, clientId }) {
  const [newEnderecos, setNewEnderecos] = useState(initialState);
  const classes = useStyles();
  
  const enderecoForm = [
    { type: 'text', name: 'tipo', label: 'Tipo', size: 3 },
    { type: 'text', name: 'cep', label: 'CEP', format: '000-000-000-00', size: 3 },
    { type: 'text', name: 'tipo_logradouro', label: 'Tipo de Logradouro', size: 3 },
    { type: 'text', name: 'logradouro', label: 'Logradouro', size: 3 },
    { type: 'text', name: 'numero', label: 'Número', size: 2 },
    { type: 'text', name: 'bairro', label: 'Bairro', size: 4 },
    { type: 'text', name: 'cidade', label: 'Cidade', size: 3 },
    { type: 'text', name: 'estado', label: 'Estado', size: 3 },
    { type: 'text', name: 'complemento', label: 'Complemento', size: 6 },
    { type: 'text', name: 'referencia', label: 'Referência', size: 6 }
  ];

  // const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(clientId){
      if(newEnderecos.id){
        updateEnderecoClient(newEnderecos);
      } else {
        newEnderecos.client_id = clientId;
        createEnderecoClient(newEnderecos);
      }
    }

    if(flgEdit != null) {
      enderecos[flgEdit] = newEnderecos;
      setEnderecos(enderecos);
    } else {
      setEnderecos(enderecos => [...enderecos, newEnderecos]);
    }

    setNewEnderecos(initialState);
    flgEdit = null;
  }

  const handleChange = (name, value) => {
    setNewEnderecos({...newEnderecos, [name]: value });
  }

  const handleEdit = (index) => {
    setNewEnderecos(enderecos[index]);
    flgEdit = index;
  };

  const handleDelete = (index) => {
    alert('Deseja deletar mesmo?');
    if(enderecos[index].id){
      deleteEnderecoClient(enderecos[index].id);
    }

    setEnderecos(enderecos.filter((end, i) => i !== index));
  };

  return (
    <div className={classes.multipleForm}>
      <FormField
                fields={enderecoForm} 
                handleChange={(name, value) => handleChange(name, value)}
                values={newEnderecos}
                title="Endereços"
                handleDelete={handleDelete} 
                handleSubmit={handleSubmit}
                isMultiple={true}>
      </FormField>

      {enderecos ? enderecos.map((endereco, index) => {
        return (
        <ViewFormField key={index}
                fields={enderecoForm} 
                values={endereco}
                handleEdit={() => handleEdit(index)}
                handleDelete={() => handleDelete(index)}>
        </ViewFormField>
      )}) : null }
    </div>
  );
}

export default EnderecoClient;
