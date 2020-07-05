import React, { useState } from "react";
// import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';

import { TelefoneClient as initialState } from '../../../model/TelefoneClient';
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

function TelefoneCLient ({ telefones, setTelefones, deleteTelefoneCLient, updateTelefoneCLient, createTelefoneClient, clientId }) {
  const [newTelefone, setNewTelefone] = useState(initialState);
  const classes = useStyles();
  
  const telefoneForm = [
    { type: 'text', name: 'tipo', label: 'Tipo', size: 2 },
    { type: 'text', name: 'numero', label: 'Número', size: 3 },
  ];

  // const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(clientId){
      if(newTelefone.id){
        updateTelefoneCLient(newTelefone);
      } else {
        newTelefone.client_id = clientId;
        createTelefoneClient(newTelefone);
      }
    }

    if(flgEdit != null) {
      telefones[flgEdit] = newTelefone;
      setTelefones(telefones);
    } else {
      setTelefones(telefones => [...telefones, newTelefone]);
    }

    setNewTelefone(initialState);
    flgEdit = null;
  }

  const handleChange = (name, value) => {
    setNewTelefone({...newTelefone, [name]: value });
  }

  const handleEdit = (index) => {
    setNewTelefone(telefones[index]);
    flgEdit = index;
  };

  const handleDelete = (index) => {
    alert('Deseja deletar mesmo?');
    if(telefones[index].id){
      deleteTelefoneCLient(telefones[index].id);
    }

    setTelefones(telefones.filter((end, i) => i !== index));
  };

  return (
    <div className={classes.multipleForm}>
      <FormField
                fields={telefoneForm} 
                handleChange={(name, value) => handleChange(name, value)}
                values={newTelefone}
                title="Telefones"
                handleDelete={handleDelete} 
                handleSubmit={handleSubmit}
                isMultiple={true}>
      </FormField>

      {telefones ? telefones.map((telefone, index) => {
        return (
        <ViewFormField key={index}
                fields={telefoneForm} 
                values={telefone}
                handleEdit={() => handleEdit(index)}
                handleDelete={() => handleDelete(index)}>
        </ViewFormField>
      )}) : null }
    </div>
  );
}

export default TelefoneCLient;
