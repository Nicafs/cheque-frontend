import React from "react";

import FormField from '../../../core/components/form/form.component';

import './cliente-crud.styles.scss';

function CrudClient ({ client, setClient }) {

  const clientForm = [
    { type: 'select', name: 'type', label: 'Tipo de Pessoa', size: 2, 
      selects: [{ description: 'Pessoa Civil', value: 'PC' }, { description: 'Pessoa Jurídica', value: 'PJ' }],
      value: 'PC', fullWidth: true },
    { type: 'text', name: 'name', label: 'Nome', size: 5 },
    { type: 'text', name: 'nickname', label: 'Apelido', size: 5 },
    { type: 'text', name: 'cpf', label: 'CPF', size: 3 },
    { type: 'text', name: 'rg', label: 'RG', size: 3 },
    { type: 'select', name: 'sexo', label: 'Sexo', size: 3, 
      selects: [{ description: 'Masculino', value: 'M' }, { description: 'Feminino', value: 'F' }],
      value: 'PC', fullWidth: true },
    { type: 'date', name: 'birthDate', label: 'Data de Nascimento', size: 3 },
    { type: 'text', name: 'nome_mae', label: 'Nome da Mãe', size: 6 },
    { type: 'text', name: 'nome_pai', label: 'Nome do Pai', size: 6 },
    { type: 'select', name: 'estado_civil', label: 'Estado Civil', size: 3, 
      selects: [{ description: 'Solteiro', value: 'S' }, { description: 'Casado', value: 'C' }],
      value: 'PC', fullWidth: true },
    { type: 'text', name: 'credit', label: 'Crédito', size: 3 },
    { type: 'text', name: 'limit', label: 'Limite', size: 3 },
    { type: 'text', name: 'acrescimo', label: 'Acréscimo', size: 3 },
    { type: 'text', name: 'local_trabalho', label: 'Local de Trabalho', size: 4 },
    { type: 'text', name: 'renda_mensal', label: 'Renda Mensal', size: 2 },
    { type: 'text', name: 'cargo', label: 'Cargo', size: 6 },
  ];
 
  const handleChange = (name, value) => {
    setClient({...client, [name]: value})
  }
  
  return (
    <>
      <FormField fields={clientForm} className="clientsCrud"
                handleChange={(name, value) => handleChange(name, value)}
                values={client}
                title="Criar um Cliente">
      </FormField>
    </>
        
  );
}

export default CrudClient;
