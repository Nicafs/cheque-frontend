import React from "react";
import { useSnackbar } from 'notistack';

import FormField from '../../../core/components/form/form.component';

function ReferenciaClient ({ referencias, setReferencias, deleteReferenciaClient, updateReferenciaClient, createReferenciaClient }) {
  // const [newReferencias, setNewReferencias] = useState([]);
  
  const referenciaForm = [
    { type: 'text', name: 'nome', label: 'Nome', size: 6 },
    { type: 'text', name: 'telefone', label: 'Telefone',  size: 3 },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event, referencia) => {
    event.preventDefault();

    referencias.map(referencia => {
      if(referencia.id){
        updateReferenciaClient(referencia);
        enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
      } else {
        createReferenciaClient(referencia);
        enqueueSnackbar('Foi Criado com Sucesso !!')
      }

      return null;
    })
  }

  const handleChange = (index, name, value, referencia) => {  
    referencia[name] = value;
    setReferencias(prevReferencias => (prevReferencias.map(v => {
          if (v === index) return { ...v, [index]: referencia }
          return v;
        })));
  }

  const handleDelete = (referencia) => {
    alert('Deseja deletar mesmo?');
    if(referencia.id){
      deleteReferenciaClient(referencia.id);
    }
  };

  return (
    <>
      {referencias.map((referencia, index) => {
        return (
            <FormField key={index} fields={referenciaForm} 
                      handleChange={(name, value) => handleChange(index, name, value, referencia)}
                      values={referencia}
                      handleDelete={() => handleDelete(referencia)} handleSubmit={handleSubmit}>
            </FormField>
          )
        })
      }
    </>
  );
}

export default ReferenciaClient;
