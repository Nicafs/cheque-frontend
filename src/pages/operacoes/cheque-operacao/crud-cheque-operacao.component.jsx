import React, { useState } from "react";
import { withRouter } from 'react-router-dom';
import axios from '../../../redux/axios';

import FormField from '../../../core/components/form/form.component';
import DialogBanco from './dialog-banco/dialog-banco.component';

function CrudChequeOperacao({ data, handleCheque }) {
  const dataMod = data;
  dataMod.banco_id = data?.banco?.id;
  dataMod.banco_nome = data?.banco?.descricao;
  const [chequeOperacao, setChequeOperacao] = useState(dataMod);
  const [open, setOpen] = useState(false);

  const handleChange = (name, value) => {
    const nameCompost = name.split('.');

    if(nameCompost.length > 1){
      setChequeOperacao({...chequeOperacao, 
        [nameCompost[0]]: {...chequeOperacao[nameCompost[0]], [nameCompost[1]]: value}
      });

      handleCheque({...chequeOperacao, 
        [nameCompost[0]]: {...chequeOperacao[nameCompost[0]], [nameCompost[1]]: value}
      });
    } else {
      setChequeOperacao({...chequeOperacao, [name]: value});
      handleCheque({...chequeOperacao, [name]: value});
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (selected) => {
    if(selected) {
      setChequeOperacao({...chequeOperacao, banco: {id: selected.id, descricao: selected.descricao } });
    }
    setOpen(false);
  };
  
  const handleOnBlurBanco = async e => {
    const { value } = e.target;
    
    if (value) {
      const response = await axios.get(`/bancos/${value}`).then(r => { return r.data});
      if(response){
        setChequeOperacao({...chequeOperacao, banco: {id: response.id, descricao: response.descricao }});
      } else {
        setChequeOperacao({...chequeOperacao, banco: {id: "", descricao: "" }});
      }
    }
  };

  const chequeOperacaoForm = [
    { type: 'select', name: 'tipo', label: 'tipo', size: 3, fullWidth: true,
    selects:[{value:'cheque', description: 'Cheque'}, 
             {value:'duplicata', description: 'Duplicata'}]
    },
    { type: 'dialog', name: 'banco.id', label: 'Banco *', size: 9, 
      name_disable: 'banco.descricao', value_disable: '', open: handleClickOpen,
      onBlur: handleOnBlurBanco },
    { type: 'number', name: 'agencia', label: 'Agência', size: 3 },
    { type: 'number', name: 'conta', label: 'Conta', size: 3 },
    { type: 'number', name: 'numero', label: 'Número', size: 3,
      errors: { required: { value: true, message: "Informe o Número do Cheque *" }} },
    { type: 'number', name: 'dias', label: 'Dias', size: 3 },
    { type: 'date', name: 'data_vencimento', label: 'Data de Vencimento', size: 3,
      errors: { required: { value: true, message: "Informe a Data de Vencimento *" }} },
    { type: 'number', name: 'valor_operacao', label: 'Valor', size: 3,
      errors: { required: { value: true, message: "Informe o Valor *" }} },
    { type: 'text', name: 'emitente', label: 'Emitente', size: 12,
      errors: { required: { value: true, message: "Informe o Emitente *" }}},
  ];

  return (
    <>
      <FormField fields={chequeOperacaoForm} className="chequeOperacaoForm"
                  handleChange={(name, value) => handleChange(name, value)}
                  values={chequeOperacao}
                  title="Criar uma Operação">
      </FormField>


      <DialogBanco open={open} handleClose={handleClose}></DialogBanco>
    </>
  );
}

export default withRouter(CrudChequeOperacao);
