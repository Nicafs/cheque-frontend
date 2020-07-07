import React, { useState } from "react";
// import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';

import { ReferenciaClient as initialState } from '../../../model/ReferenciaClient';
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

function ReferenciaClient ({ referencias, setReferencias, deleteReferenciaClient, updateReferenciaClient, createReferenciaClient, clientId }) {
  const [newReferencias, setNewReferencias] = useState(initialState);
  const classes = useStyles();
  
  const referenciaForm = [
    { type: 'text', name: 'nome', label: 'Nome', size: 6 },
    { type: 'maskNumero', name: 'telefone', label: 'Telefone', size: 3, format: '(##) # ####-####', mask:'_' },
  ];

  // const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();

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

  return (
    <div className={classes.multipleForm}>
      <FormField 
                fields={referenciaForm} 
                handleChange={(name, value) => handleChange(name, value)}
                values={newReferencias}
                title="Referências"
                handleDelete={handleDelete} 
                handleSubmit={handleSubmit}
                isMultiple={true}>
      </FormField>

      {referencias ? referencias.map((referencia, index) => {
        return (
        <ViewFormField key={index}
                fields={referenciaForm} 
                values={referencia}
                handleEdit={() => handleEdit(index)}
                handleDelete={() => handleDelete(index)}>
        </ViewFormField>
    )}) : null }
    </div>
  );
}

export default ReferenciaClient;
