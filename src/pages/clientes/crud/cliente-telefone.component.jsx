import React from "react";
import { useSnackbar } from 'notistack';

import FormField from '../../../core/components/form/form.component';

function TelefoneCLient ({ telefones, setTelefones, deleteTelefoneCLient, updateTelefoneCLient, createTelefoneCLient }) {
  // const [newTelefones, setNewTelefones] = useState([]);
  
  const telefoneForm = [
    { type: 'text', name: 'tipo', label: 'Tipo', size: 2 },
    { type: 'text', name: 'numero', label: 'Número', size: 3 },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event, telefone) => {
    event.preventDefault();

    telefones.map(telefone => {
      if(telefone.id){
        updateTelefoneCLient(telefone);
        enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
      } else {
        createTelefoneCLient(telefone);
        enqueueSnackbar('Foi Criado com Sucesso !!')
      }

      return null;
    })
  }

  const handleChange = (index, name, value, telefone) => {  
    telefone[name] = value;
    setTelefones(prevTelefones => (prevTelefones.map(v => {
          if (v === index) return { ...v, [index]: telefone }
          return v;
        })));
  }

  const handleDelete = (telefone) => {
    alert('Deseja deletar mesmo?');
    if(telefone.id){
      deleteTelefoneCLient(telefone.id);
    }
  };

  return (
    <>
      {telefones.map((telefone, index) => {
        return (
            <FormField key={index} fields={telefoneForm} 
                      handleChange={(name, value) => handleChange(index, name, value, telefone)}
                      values={telefone}
                      title="Telefones"
                      handleDelete={() => handleDelete(telefone)} handleSubmit={handleSubmit}>
            </FormField>
          )
        })
      }
    </>
  );
}

export default TelefoneCLient;
