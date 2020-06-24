import React from "react";
import { useSnackbar } from 'notistack';

import FormField from '../../../core/components/form/form.component';

function BancoClient ({ bancos, setBancos, deleteBancoClient, updateBancoClient, createBancoClient }) {
  // const [newBancos, setNewBancos] = useState([]);
  
  const bancoForm = [
    { type: 'text', name: 'banco', label: 'Banco', size: 4 },
    { type: 'text', name: 'agencia', label: 'Agência', size: 4 },
    { type: 'text', name: 'conta', label: 'Conta', size: 4 },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event, banco) => {
    event.preventDefault();

    bancos.map(banco => {
      if(banco.id){
        updateBancoClient(banco);
        enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
      } else {
        createBancoClient(banco);
        enqueueSnackbar('Foi Criado com Sucesso !!')
      }

      return null;
    })
  }

  const handleChange = (index, name, value, banco) => {  
    banco[name] = value;
    setBancos(prevBancos => (prevBancos.map(v => {
          if (v === index) return { ...v, [index]: banco }
          return v;
        })));
  }

  const handleDelete = (banco) => {
    alert('Deseja deletar mesmo?');
    if(banco.id){
      deleteBancoClient(banco.id);
    }
  };

  return (
    <>
      {bancos.map((banco, index) => {
        return (
            <FormField key={index} fields={bancoForm} 
                      handleChange={(name, value) => handleChange(index, name, value, banco)}
                      values={banco}
                      title="Bancos"
                      handleDelete={() => handleDelete(banco)} handleSubmit={handleSubmit}>
            </FormField>
          )
        })
      }
    </>
  );
}

export default BancoClient;
