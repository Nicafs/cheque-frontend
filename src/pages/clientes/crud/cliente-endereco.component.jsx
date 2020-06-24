import React from "react";
import { useSnackbar } from 'notistack';

import FormField from '../../../core/components/form/form.component';

function EnderecoClient ({ enderecos, setEnderecos, deleteEnderecoClient, updateEnderecoClient, createEnderecoClient }) {
  // const [newEnderecos, setNewEnderecos] = useState([]);
  
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

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event, endereco) => {
    event.preventDefault();

    enderecos.map(endereco => {
      if(endereco.id){
        updateEnderecoClient(endereco);
        enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
      } else {
        createEnderecoClient(endereco);
        enqueueSnackbar('Foi Criado com Sucesso !!')
      }

      return null;
    })
  }

  const handleChange = (index, name, value, endereco) => {  
    endereco[name] = value;
    setEnderecos(prevEnderecos => (prevEnderecos.map(v => {
          if (v === index) return { ...v, [index]: endereco }
          return v;
        })));
  }

  const handleDelete = (endereco) => {
    alert('Deseja deletar mesmo?');
    if(endereco.id){
      deleteEnderecoClient(endereco.id);
    }
  };

  return (
    <>
      {enderecos.map((endereco, index) => {
        return (
            <FormField key={index} fields={enderecoForm} 
                      handleChange={(name, value) => handleChange(index, name, value, endereco)}
                      values={endereco}
                      handleDelete={() => handleDelete(endereco)} handleSubmit={handleSubmit}>
            </FormField>
          )
        })
      }
    </>
  );
}

export default EnderecoClient;
