import React, { useState } from "react";
import api from '../../../core/services/api';
// import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';

import Banco from '../../../model/Banco';

import { BancoClient as initialState } from '../../../model/BancoClient';
import FormField from '../../../core/components/form/form.component';
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

  // const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
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
    const nameCompost = name.split('.');

    if(nameCompost.length > 1){
      setNewBancos({...newBancos,
        [nameCompost[0]]: {...newBancos[nameCompost[0]], [nameCompost[1]]: value}
      });
    } else {
      setNewBancos({...newBancos, [name]: value});
    }
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

    setBancos(bancos.filter((banco, i) => i !== index));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (selected) => {
    if(selected) {
      setNewBancos({...newBancos, banco: {...newBancos.banco, id: selected.id, descricao: selected.descricao } });
    }
    setOpen(false);
  };

  const handleOnBlurBanco = async e => {
    const { value } = e.target;

    if (value) {
      const response = await api.get(`/bancos/${value}`).then(r => { return r.data});
      if(response){
        setNewBancos({...newBancos, banco: response});
      } else {
        setNewBancos({...newBancos, banco: Banco});
      }
    } else {
      setNewBancos({...newBancos, banco: Banco});
    }
  };

  const bancoForm = [
    { type: 'dialog', name: 'banco.id', label: 'Banco', size: 6,
      name_disable: 'banco.descricao', value_disable: '', open: handleClickOpen,
      onBlur: handleOnBlurBanco,
      errors: { required: { value: true, message: "Informe o Banco *" }} },
    { type: 'text', name: 'agencia', label: 'Agência', size: 3,
      errors: { required: { value: true, message: "Informe a Agência *" }} },
    { type: 'text', name: 'conta', label: 'Conta', size: 3,
      errors: { required: { value: true, message: "Informe a Conta *" }} },
  ];

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
        <FormField key={index}
                fields={bancoForm}
                values={banco}
                handleEdit={() => handleEdit(index)}
                handleDelete={() => handleDelete(index)}
                disable={true}>
        </FormField>
      )}) : null }
    </div>
  );
}

export default BancoClient;
