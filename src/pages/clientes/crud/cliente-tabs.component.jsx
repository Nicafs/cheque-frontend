import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import axios from '../../../redux/axios';

import { Container, Tab, Tabs, AppBar } from '@material-ui/core';

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

function ClientTabs ({client, enderecos, bancos, telefones, emails, referencias, ...otherProps }) {
  const [valueTab, setValueTab] = useState(0);
  const [clientForm, setClient] = useState(client);
  const [enderecosForm, setEnderecos] = useState(enderecos);
  const [bancosForm, setBancos] = useState(bancos);
  const [telefonesForm, setTelefones] = useState(telefones);
  const [emailsForm, setEmails] = useState(emails);
  const [referenciasForm, setReferencias] = useState(referencias);

  const id = otherProps.match.params.id;

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/clients/${id}`);
      setClient(response.data);
    };
 
    if(id){
      fetchData();
    }
  }, [id]);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
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
          <CrudClient clientForm={clientForm} setClient={setClient} 
            createClient={otherProps.createClient}
            updateClient={otherProps.updateClient}
            deleteClient={otherProps.deleteClient}></CrudClient>
      </TabPanel>

      <TabPanel value={valueTab} index={1}>
          <EnderecoClient enderecos={enderecosForm} setEnderecos={setEnderecos} 
            createEnderecoClient={otherProps.createEnderecoClient}
            updateEnderecoClient={otherProps.updateEnderecoClient}
            deleteEnderecoClient={otherProps.deleteEnderecoClient}></EnderecoClient>
      </TabPanel>

      <TabPanel value={valueTab} index={2}>
          <TelefoneClient telefones={telefonesForm} setTelefones={setTelefones} 
            createTelefoneClient={otherProps.createTelefoneClient}
            updateTelefoneClient={otherProps.updateTelefoneClient}
            deleteTelefoneClient={otherProps.deleteTelefoneClient}></TelefoneClient>
      </TabPanel>

      <TabPanel value={valueTab} index={3}>
          <EmailClient emails={emailsForm} setEmails={setEmails} 
            createEmailClient={otherProps.createEmailClient}
            updateEmailClient={otherProps.updateEmailClient}
            deleteEmailClient={otherProps.deleteEmailClient}></EmailClient>
      </TabPanel>

      <TabPanel value={valueTab} index={4}>
          <BancoClient bancos={bancosForm} setBancos={setBancos} 
            createBancoClient={otherProps.createBancoClient}
            updateBancoClient={otherProps.updateBancoClient}
            deleteBancoClient={otherProps.deleteBancoClient}></BancoClient>
      </TabPanel>

      <TabPanel value={valueTab} index={5}>
          <ReferenciaClient referencias={referenciasForm} setReferencias={setReferencias} 
            createReferenciaClient={otherProps.createReferenciaClient}
            updateReferenciaClient={otherProps.updateReferenciaClient}
            deleteReferenciaClient={otherProps.deleteReferenciaClient}></ReferenciaClient>
      </TabPanel>
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
  updateClient: (form) => dispatch(update(form)),
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