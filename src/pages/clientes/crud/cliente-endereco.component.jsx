import React, { useState } from "react";
// import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';

import { EnderecoClient as initialState } from '../../../model/EnderecoClient';
import { UfEnum } from '../../../model/enums/Estado';
import { EstadosCidades } from '../../../model/enums/EstadoCidade';

import FormField from '../../../core/components/form/form.component';

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
    { type: 'select', name: 'tipo', label: 'Tipo', size: 3,
      selects: [{ description: 'Residencial', value: 'Residencial' },
                { description: 'Comercial', value: 'Comercial' },
                { description: 'Outros', value: 'Outros' }
              ],
      value: '', fullWidth: true,
      errors: { required: { value: true, message: "Escolha o Tipo do Endereço *" }} },
    { type: 'text', name: 'cep', label: 'CEP *', format: '00000-000', size: 3,
      errors: { required: { value: true, message: "Informe o CEP *" }} },
    { type: 'select', name: 'tipo_logradouro', label: 'Tipo de Logradouro', size: 3,
      selects: [{ description: 'Alameda', value: 'Alameda' },
                { description: 'Alto', value: 'Alto' },
                { description: 'Avenida', value: 'Avenida' },
                { description: 'Estrada', value: 'Estrada' },
                { description: 'Ladeira', value: 'Ladeira' },
                { description: 'Linha', value: 'Linha' },
                { description: 'Paralela', value: 'Paralela' },
                { description: 'Praça', value: 'Praça' },
                { description: 'Quadra', value: 'Quadra' },
                { description: 'Rua', value: 'Rua' },
                { description: 'Rodovia', value: 'Rodovia' },
                { description: 'Subida', value: 'Subida' },
                { description: 'Travessa', value: 'Travessa' },
                { description: 'Outros', value: 'Outros' },
              ],
      value: '', fullWidth: true },
    { type: 'text', name: 'logradouro *', label: 'Logradouro', size: 3,
      errors: { required: { value: true, message: "Informe o Logradouro *" }} },
    { type: 'text', name: 'numero *', label: 'Número', size: 2,
      errors: { required: { value: true, message: "Informe o Número *" }} },
    { type: 'text', name: 'bairro *', label: 'Bairro', size: 4,
      errors: { required: { value: true, message: "Informe o Bairro *" }} },
    { type: 'selectDependent', name: 'cidade', label: 'Cidade', size: 3,
      selects: EstadosCidades, dependentName: 'cidades', parentValue: 'estado',
      value: '', fullWidth: true,
      errors: { required: { value: true, message: "Informe a Cidade *" }} },
    { type: 'select', name: 'estado', label: 'Estado', size: 3,
      selects: UfEnum,
      value: '', fullWidth: true,
      errors: { required: { value: true, message: "Informe o Estado *" }} },
    { type: 'text', name: 'complemento', label: 'Complemento', size: 6 },
    { type: 'text', name: 'referencia', label: 'Referência', size: 6 }
  ];

  // const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
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
        <FormField key={index}
                fields={enderecoForm}
                values={endereco}
                handleEdit={() => handleEdit(index)}
                handleDelete={() => handleDelete(index)}
                disable={true}>
        </FormField>
      )}) : null }
    </div>
  );
}

export default EnderecoClient;
