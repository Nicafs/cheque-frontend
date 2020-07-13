import React, { useState } from "react";
// import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';

import { TelefoneClient as initialState } from '../../../model/TelefoneClient';
import FormField from '../../../core/components/form/form.component';

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

  const isValidPhoneNumber = (value) => {
    let unformated = value;
    unformated = unformated.trim();
    unformated = unformated.replace(/[^a-zA-Z0-9]/g, '');

    if(!unformated) {
      return true;
    }

    const regexp = /^\d{11}$/;
    return regexp.exec(unformated) !== null
  }

  const telefoneForm = [
    { type: 'select', name: 'tipo', label: 'Tipo', size: 2,
    selects: [{ description: 'Pessoal', value: 'Pessoal' },
              { description: 'Comercial', value: 'Comercial' },
              { description: 'Outros', value: 'Outros' }],
    value: '', fullWidth: true,
    errors: { required: { value: true, message: "Informe o Tipo de Telefone *" }} },
    { type: 'maskNumero', name: 'numero', label: 'Número *', size: 3, format: '(##) # ####-####', mask:'_',
    errors: { required: { value: true, message: "Informe o Número do Telefone *" },
              validate: { validate: values => isValidPhoneNumber(values) || "Formato do Telefone Inválido *" } } },
  ];

  // const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
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
        <FormField key={index}
                fields={telefoneForm}
                values={telefone}
                handleEdit={() => handleEdit(index)}
                handleDelete={() => handleDelete(index)}
                disable={true}>
        </FormField>
      )}) : null }
    </div>
  );
}

export default TelefoneCLient;
