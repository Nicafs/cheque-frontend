import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';

import { ReferenciaClient as initialState } from '../../../model/ReferenciaClient';
import FormField from '../../../core/components/form/form.component';

const useStyles = makeStyles(() => ({
  multipleForm: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },
}));

let flgEdit = null;

function ReferenciaClient ({ referencias, setReferencias, deleteReferenciaClient, updateReferenciaClient, createReferenciaClient, clientId }) {
  const [newReferencias, setNewReferencias] = useState(initialState);
  const classes = useStyles();

  const isValidPhoneNumber = (value) => {
    let unformated = value;
    unformated = unformated.trim();
    unformated = unformated.replace(/[^a-zA-Z0-9]/g, '');

    if(!unformated) {
      return true;
    }

    const regexp = /^\d{10}|\d{11}$/;
    return regexp.exec(unformated) !== null
  }

  const formatPhone = (val) => {
    if(val.length <= 10) {
      return '(' + val.substring(0, 2) + ') ' + val.substring(2, 6) + '-' + val.substring(6, 10);
    }

    return '(' + val.substring(0, 2) + ') ' + val.substring(2, 3) + ' ' + val.substring(3, 7) + '-' + val.substring(7, 11);
  }

  const handleSubmit = async () => {
    if(clientId){
      if(newReferencias.id){
        updateReferenciaClient(newReferencias);
      } else {
        newReferencias.client_id = clientId;
        createReferenciaClient(newReferencias);
      }
    }

    if(flgEdit != null) {
      referencias[flgEdit] = newReferencias;
      setReferencias(referencias);
    } else {
      setReferencias(referencias => [...referencias, newReferencias]);
    }

    setNewReferencias(initialState);
    flgEdit = null;
  }

  const handleChange = (name, value) => {
    setNewReferencias({...newReferencias, [name]: value });
  }

  const handleEdit = (index) => {
    setNewReferencias(referencias[index]);
    flgEdit = index;
  };

  const handleDelete = (index) => {
    alert('Deseja deletar mesmo?');
    if(referencias[index].id){
      deleteReferenciaClient(referencias[index].id);
    }
    setReferencias(referencias.filter((ref, i) => i !== index));
  };

  const handleClear = () => {
    setNewReferencias(initialState);
  }

  const referenciaForm = [
    { type: 'text', name: 'nome', label: 'Nome *', size: 6,
      errors: { required: { value: true, message: "Informe o Nome da Referência *" }} },
    { type: 'maskNumero', name: 'telefone', label: 'Telefone', size: 3, format: formatPhone, mask:'_',
      errors: { validate: { validate: values => isValidPhoneNumber(values) || "Formato do Telefone Inválido *" } } },
  ];
  
  return (
    <div className={classes.multipleForm}>
      <FormField
                fields={referenciaForm}
                handleChange={(name, value) => handleChange(name, value)}
                values={newReferencias}
                title="Referências"
                handleDelete={handleDelete}
                handleSubmit={handleSubmit}
                handleClear={handleClear}
                isMultiple={true}>
      </FormField>

      {referencias ? referencias.map((referencia, index) => {
        return (
        <FormField key={index}
                fields={referenciaForm}
                values={referencia}
                handleEdit={() => handleEdit(index)}
                handleDelete={() => handleDelete(index)}
                disable={true}>
        </FormField>
    )}) : null }
    </div>
  );
}

export default ReferenciaClient;
