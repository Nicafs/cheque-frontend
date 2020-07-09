import React, { useState } from "react";
// import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';

import { BancoClient as initialState } from '../../../model/BancoClient';
import FormField from '../../../core/components/form/form.component';
import ViewFormField from '../../../core/components/form/view-form.component';
import DialogBanco from '../../operacoes/cheque-operacao/dialog-banco/dialog-banco.component';

const useStyles = makeStyles(() => ({
  multipleForm: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },
}));

let flgEdit = null;

function BancoClient ({ bancos, setBancos, deleteBancoClient, updateBancoClient, createBancoClient, clientId }) {
  const [newBancos, setNewBancos] = useState(initialState);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (selected) => {
    setNewBancos({...newBancos, banco: selected.id, banco_descricao: selected.name });
    
    setOpen(false);
  };
  
  const bancoForm = [
    { type: 'dialog', name: 'banco', label: 'Banco', size: 6, 
      name_disable: 'banco_descricao', value_disable: '', open: handleClickOpen,
      errors: { required: { value: true, message: "Informe o Banco *" }} },
    { type: 'text', name: 'agencia', label: 'Agência', size: 3,
      errors: { required: { value: true, message: "Informe a Agência *" }} },
    { type: 'text', name: 'conta', label: 'Conta', size: 3,
      errors: { required: { value: true, message: "Informe a Conta *" }} },
  ];

  // const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(clientId){
      if(newBancos.id){
        updateBancoClient(newBancos);
      } else {
        newBancos.client_id = clientId;
        createBancoClient(newBancos);
      }
    }

    if(flgEdit != null) {
      bancos[flgEdit] = newBancos;
      setBancos(bancos);
    } else {
      setBancos(bancos => [...bancos, newBancos]);
    }

    setNewBancos(initialState);
    flgEdit = null;
  }

  const handleChange = (name, value) => {
    setNewBancos({...newBancos, [name]: value });
  }

  const handleEdit = (index) => {
    setNewBancos(bancos[index]);
    flgEdit = index;
  };

  const handleDelete = (index) => {
    alert('Deseja deletar mesmo?');
    if(bancos[index].id){
      deleteBancoClient(bancos[index].id);
    }

    setBancos(bancos.filter((banc, i) => i !== index));
  };

  return (
    <div className={classes.multipleForm}>
      <FormField fields={bancoForm} 
                handleChange={(name, value) => handleChange(name, value)}
                values={newBancos}
                title="Bancos"
                handleDelete={handleDelete} 
                handleSubmit={handleSubmit}
                isMultiple={true}>
      </FormField>

      <DialogBanco open={open} handleClose={handleClose}></DialogBanco>

      {bancos ? bancos.map((banco, index) => {
        return (
        <ViewFormField key={index}
                fields={bancoForm} 
                values={banco}
                handleEdit={() => handleEdit(index)}
                handleDelete={() => handleDelete(index)}>
        </ViewFormField>
      )}) : null }
    </div>
  );
}

export default BancoClient;
