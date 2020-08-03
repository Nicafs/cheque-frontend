import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Button, ButtonGroup, Grid, Container } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import api from '../../core/services/api';
import FormField from '../../core/components/form/form.component';
import { UfEnum } from '../../model/enums/Estado';
import { EstadosCidades } from '../../model/enums/EstadoCidade';
import { getData, save } from '../../redux/configuracao/configuracao.actions';

const isValidPhoneNumber = (value) => {
  let unformated = value;
  unformated = unformated.trim();
  unformated = unformated.replace(/[^a-zA-Z0-9]/g, '');

  if(!unformated) {
    return true;
  }

  const regexp = /^\d{11}$/;
  return regexp.exec(unformated) !== null
}

const isValidCPF = (value) => {
  let unformated = value;
  unformated = unformated.trim();
  unformated = unformated.replace(/[^a-zA-Z0-9]/g, '');

  if(!unformated) {
    return true;
  }

  const regexp = /^\d{11}$/;
  return regexp.exec(unformated) !== null
}

const initValue = {
  id: 0,
  name: '',
  nomeFantasia: '',
  logo: '',
  cpfCnpj: '',
  email: '',
  celular: '',
  whatsapp: '',
  telefone: '',
  percentagem: 0,
  endBairro: '',
  endCep: '',
  endCidade: '',
  endEstado: '',
  endComplemento: '',
  endTipoLogradouro: '',
  endLogradouro: '',
  endNumero: 0,
  endReferencia: '',
};

function Configuracao({ getConfiguracao, saveConfiguracao, configuracao, history, ...otherProps }) {
  const [configuracaoValue, setConfiguracaoValue] = useState(initValue);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/configuracao`);
      
      if(response.data) {
        response.data.logo = '';
        setConfiguracaoValue(response.data);
      }
    };

    if(!configuracao) {
      fetchData();
    }
  }, [configuracao]);
   
  const handleSubmit = async event => {
    console.log("configuracaoValue:", configuracaoValue);
    saveConfiguracao(configuracaoValue);
    enqueueSnackbar('Foi Criado com Sucesso !!')
  }

  const handleChange = (name, value) => {
    setConfiguracaoValue({...configuracaoValue, [name]: value});
  }

  const configuracaoForm = [
    { type: 'text', name: 'name', label: 'Nome *', size: 6,
      errors: { required: { value: true, message: "Informe o Nome do Cliente *" }} },
    { type: 'text', name: 'nomeFantasia', label: 'Nome Fantasia', size: 6 },
    { type: 'text', name: 'email', label: 'E-mail', size: 12 },
    { type: 'maskNumero', name: 'cpfCnpj', label: 'CPF/CNPJ', size: 3, format: '###.###.###-##',
      errors: { validate: { validate: values => isValidCPF(values) || "Formato do CPF/CNPJ Inválido *" } }},
    { type: 'maskNumero', name: 'telefone', label: 'telefone *', size: 3, format: '(##) # ####-####', mask:'_',
      errors: { validate: { validate: values => isValidPhoneNumber(values) || "Formato do Telefone Inválido *" } } },
    { type: 'maskNumero', name: 'celular', label: 'Celular *', size: 3, format: '(##) # ####-####', mask:'_',
      errors: { validate: { validate: values => isValidPhoneNumber(values) || "Formato do Telefone Inválido *" } } },
    { type: 'maskNumero', name: 'whatsapp', label: 'whatsapp *', size: 3, format: '(##) # ####-####', mask:'_',
      errors: { validate: { validate: values => isValidPhoneNumber(values) || "Formato do Telefone Inválido *" } } },
    { type: 'text', name: 'endCep', label: 'CEP *', format: '00000-000', size: 3 },
    { type: 'select', name: 'endTipoLogradouro', label: 'Tipo de Logradouro', size: 3,
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
    { type: 'text', name: 'endLogradouro', label: 'Logradouro', size: 3 },
    { type: 'text', name: 'endNumero', label: 'Número', size: 3 },
    { type: 'text', name: 'endBairro', label: 'Bairro', size: 3 },
    { type: 'select', name: 'endEstado', label: 'Estado', size: 2,
      selects: UfEnum,
      value: '', fullWidth: true },
    { type: 'selectDependent', name: 'endCidade', label: 'Cidade', size: 2,
      selects: EstadosCidades, dependentName: 'cidades', parentValue: 'endEstado',
      value: '', fullWidth: true,
      errors: { required: { value: true, message: "Informe a Cidade *" }} },
    { type: 'text', name: 'endComplemento', label: 'Complemento', size: 5 },
    { type: 'text', name: 'endReferencia', label: 'Referência', size: 7 },
    { type: 'file', name: 'logo', label: 'Logo', size: 5},
  ];

  return (
    <Container className="Configuracao">
      <FormField
        fields={configuracaoForm}
        handleChange={(name, value) => handleChange(name, value)}
        values={configuracaoValue}
        title="Configurações"
        handleSubmit={handleSubmit}
        >
      </FormField>

      <Grid item xs={12}>
        <ButtonGroup className="btn-group">
          <Button variant="contained" type="button" color="primary"
            onClick={handleSubmit}>
            Salvar
          </Button>
          <Button variant="contained" type="button" color="default"
              onClick={() => history.goBack()} startIcon={<ArrowBackIcon />}>
            Voltar
          </Button>
        </ButtonGroup>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    configuracao: state.configuracao.configuracao
  };
}
  
const mapDispatchToProps = dispatch => ({
  getConfiguracao: () => dispatch(getData()),
  saveConfiguracao: (form) => dispatch(save(form)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Configuracao));
