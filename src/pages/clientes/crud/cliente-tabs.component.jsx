import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useForm } from "react-hook-form";

import api from '../../../core/services/api';

import { Container, Tab, Tabs, AppBar, ButtonGroup, Button } from '@material-ui/core';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CallIcon from '@material-ui/icons/Call';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import ContactsIcon from '@material-ui/icons/Contacts';

import CrudClient  from './cliente-crud.component';
import EnderecoClient  from './cliente-endereco.component';
import TelefoneClient  from './cliente-telefone.component';
import EmailClient  from './cliente-email.component';
import BancoClient  from './cliente-banco.component';
import ReferenciaClient  from './cliente-referencia.component';

import { create,
         update,
         deleteById,
         findById
       } from '../../../redux/client/client.actions';

import { create as createEnderecoClient,
         update as updateEnderecoClient,
         deleteById as deleteEnderecoClient
       } from '../../../redux/client/endereco/endereco.actions';

import {create as createTelefoneClient,
        update as updateTelefoneClient,
        deleteById as deleteTelefoneClient
      } from '../../../redux/client/telefone/telefone.actions';

import {create as createEmailClient,
        update as updateEmailClient,
        deleteById as deleteEmailClient
        } from '../../../redux/client/email/email.actions';

import {create as createBancoClient,
        update as updateBancoClient,
        deleteById as deleteBancoClient
      } from '../../../redux/client/banco/banco.actions';

import {create as createReferenciaClient,
        update as updateReferenciaClient,
        deleteById as deleteReferenciaClient
      } from '../../../redux/client/referencia/referencia.actions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}

function scrollable(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

function ClientTabs ({client, enderecos, bancos, telefones, emails, referencias, history,
                      createClient, updateClient, deleteClient, ...otherProps }) {

  const [valueTab, setValueTab] = useState(0);
  const [clientForm, setClient] = useState(client);
  const [enderecosForm, setEnderecos] = useState([]);
  const [bancosForm, setBancos] = useState([]);
  const [telefonesForm, setTelefones] = useState([]);
  const [emailsForm, setEmails] = useState([]);
  const [referenciasForm, setReferencias] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const { ...hookForm } = useForm();

  const id = otherProps.match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(`/clients/${id}`);
      setClient(response.data);
      setEnderecos(response.data.enderecoClient);
      setTelefones(response.data.telefoneClient);
      setEmails(response.data.emailClient);
      setBancos(response.data.bancoClient);
      setReferencias(response.data.referenciaClient);
    };

    if(id){
      fetchData();
    }
  }, [id]);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleSubmit = async () => {
    clientForm.bancoClient = bancosForm;
    clientForm.enderecoClient = enderecosForm;
    clientForm.telefoneClient = telefonesForm;
    clientForm.emailClient = emailsForm;
    clientForm.referenciaClient = referenciasForm;

    if(clientForm.id){
      updateClient(clientForm.id, clientForm);
      enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
    } else {
      createClient(clientForm);
      enqueueSnackbar('Foi Criado com Sucesso !!')
    }
  }

  const handleDelete = () => {
    alert('Deseja deletar mesmo?');
    if(clientForm.id){
      deleteClient(clientForm.id);
    }
  };

  return (
    <Container className="ClientesTabs">
      <AppBar position="static" color="default">
        <Tabs
            value={valueTab}
            onChange={handleChangeTab}
            variant="scrollable"
            aria-label="Abas do Cliente"
        >
            <Tab label="Dados" icon={<AccountCircleIcon />} aria-label="Dados" {...scrollable(1)} />
            <Tab label="Endereço" icon={<HomeIcon />} aria-label="Endereço" {...scrollable(2)} />
            <Tab label="Telefone" icon={<CallIcon />} aria-label="Telefone" {...scrollable(3)} />
            <Tab label="E-mail" icon={<MailOutlineIcon />} aria-label="E-mail" {...scrollable(4)} />
            <Tab label="Banco" icon={<AccountBalanceIcon />} aria-label="Banco" {...scrollable(5)} />
            <Tab label="Referência" icon={<ContactsIcon />} aria-label="Referência" {...scrollable(6)} />
        </Tabs>
      </AppBar>

      <TabPanel value={valueTab} index={0}>
          <CrudClient client={clientForm} setClient={setClient}
            hookForm={hookForm}
            createClient={otherProps.createClient}
            updateClient={otherProps.updateClient}
            deleteClient={otherProps.deleteClient}></CrudClient>
      </TabPanel>

      <TabPanel value={valueTab} index={1}>
          <EnderecoClient enderecos={enderecosForm} setEnderecos={setEnderecos}
            clientId={id}
            createEnderecoClient={otherProps.createEnderecoClient}
            updateEnderecoClient={otherProps.updateEnderecoClient}
            deleteEnderecoClient={otherProps.deleteEnderecoClient}></EnderecoClient>
      </TabPanel>

      <TabPanel value={valueTab} index={2}>
          <TelefoneClient telefones={telefonesForm} setTelefones={setTelefones}
            clientId={id}
            createTelefoneClient={otherProps.createTelefoneClient}
            updateTelefoneClient={otherProps.updateTelefoneClient}
            deleteTelefoneClient={otherProps.deleteTelefoneClient}></TelefoneClient>
      </TabPanel>

      <TabPanel value={valueTab} index={3}>
          <EmailClient emails={emailsForm} setEmails={setEmails}
            clientId={id}
            createEmailClient={otherProps.createEmailClient}
            updateEmailClient={otherProps.updateEmailClient}
            deleteEmailClient={otherProps.deleteEmailClient}></EmailClient>
      </TabPanel>

      <TabPanel value={valueTab} index={4}>
          <BancoClient bancos={bancosForm} setBancos={setBancos}
            clientId={id}
            createBancoClient={otherProps.createBancoClient}
            updateBancoClient={otherProps.updateBancoClient}
            deleteBancoClient={otherProps.deleteBancoClient}></BancoClient>
      </TabPanel>

      <TabPanel value={valueTab} index={5}>
          <ReferenciaClient referencias={referenciasForm} setReferencias={setReferencias}
            clientId={id}
            createReferenciaClient={otherProps.createReferenciaClient}
            updateReferenciaClient={otherProps.updateReferenciaClient}
            deleteReferenciaClient={otherProps.deleteReferenciaClient}></ReferenciaClient>
      </TabPanel>

      <ButtonGroup className="btn-group">
        <Button variant="contained" type="button" color="primary"
          onClick={hookForm.handleSubmit(handleSubmit)}  startIcon={<DoneOutlineIcon />}>
          { id ? 'Salvar' : 'Confirmar' }
        </Button>
        <Button variant="contained" type="button" color="default"
            onClick={() => history.goBack()} startIcon={<ArrowBackIcon />}>
          Voltar
        </Button>
        { id ? 
          <Button variant="contained" type="button" color="secondary"
            onClick={handleDelete} startIcon={<DeleteIcon />}>
              Excluir
          </Button>
        : null }
      </ButtonGroup> 
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    client: state.clients.client,
    enderecos: state.enderecosClient.enderecosClient,
    telefones: state.telefonesClient.telefonesClient,
    emails: state.emailsClient.emailsClient,
    bancos: state.bancosClient.bancosClient,
    referencias: state.referenciasClient.referenciasClient,
  };
}

const mapDispatchToProps = dispatch => ({
  findClientById: (id) => dispatch(findById(id)),
  createClient: (form) => dispatch(create(form)),
  updateClient: (id, form) => dispatch(update(id, form)),
  deleteClient: (id) => dispatch(deleteById(id)),

  createEnderecoClient: (form) => dispatch(createEnderecoClient(form)),
  updateEnderecoClient: (form) => dispatch(updateEnderecoClient(form)),
  deleteEnderecoClient: (id) => dispatch(deleteEnderecoClient(id)),

  createTelefoneClient: (form) => dispatch(createTelefoneClient(form)),
  updateTelefoneClient: (form) => dispatch(updateTelefoneClient(form)),
  deleteTelefoneClient: (id) => dispatch(deleteTelefoneClient(id)),

  createEmailClient: (form) => dispatch(createEmailClient(form)),
  updateEmailClient: (form) => dispatch(updateEmailClient(form)),
  deleteEmailClient: (id) => dispatch(deleteEmailClient(id)),

  createBancoClient: (form) => dispatch(createBancoClient(form)),
  updateBancoClient: (form) => dispatch(updateBancoClient(form)),
  deleteBancoClient: (id) => dispatch(deleteBancoClient(id)),

  createReferenciaClient: (form) => dispatch(createReferenciaClient(form)),
  updateReferenciaClient: (form) => dispatch(updateReferenciaClient(form)),
  deleteReferenciaClient: (id) => dispatch(deleteReferenciaClient(id))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientTabs));
