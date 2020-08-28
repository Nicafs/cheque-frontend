import React, { useState } from "react";

import { makeStyles } from '@material-ui/core/styles';

import { EmailClient as initialState } from '../../../model/EmailClient';
import FormField from '../../../core/components/form/form.component';

const useStyles = makeStyles(() => ({
  multipleForm: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
  },
}));

let flgEdit = null;

function EmailClient ({ emails, setEmails, deleteEmailClient, updateEmailClient, createEmailClient, clientId }) {
  const [newEmails, setNewEmails] = useState(initialState);
  const classes = useStyles();


  const isEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleSubmit = async () => {
    if(clientId){
      if(newEmails.id){
        updateEmailClient(newEmails);
      } else {
        newEmails.client_id = clientId;
        createEmailClient(newEmails);
      }
    }

    if(flgEdit != null) {
      emails[flgEdit] = newEmails;
      setEmails(emails);
    } else {
      setEmails(emails => [...emails, newEmails]);
    }

    setNewEmails(initialState);
    flgEdit = null;
  }

  const handleChange = (name, value) => {
    setNewEmails({...newEmails, [name]: value });
  }

  const handleEdit = (index) => {
    setNewEmails(emails[index]);
    flgEdit = index;
  };

  const handleDelete = (index) => {
    alert('Deseja deletar mesmo?');
    if(emails[index].id){
      deleteEmailClient(emails[index].id);
    }
    setEmails(emails.filter((end, i) => i !== index));
  };

  const handleClear = () => {
    setNewEmails(initialState);
  }

  const emailForm = [
    { type: 'email', name: 'email', label: 'Email *', size: 10,
      errors: { required: { value: true, message: "Informe o E-mail *" },
                pattern: { value: isEmail, message: "E-mail inválido *"} } },
    { type: 'select', name: 'principal', label: 'Principal', size: 2,
      selects: [{ description: 'Sim', value: 'true' }, { description: 'Não', value: 'false' }],
      value: 'true', fullWidth: true },
  ];

  return (
    <div className={classes.multipleForm}>
      <FormField
                fields={emailForm}
                handleChange={(name, value) => handleChange(name, value)}
                values={newEmails}
                title="E-mails"
                handleDelete={handleDelete}
                handleSubmit={handleSubmit}
                handleClear={handleClear}
                isMultiple={true}>
      </FormField>

      {emails ? emails.map((email, index) => {
        return (
        <FormField key={index}
                fields={emailForm}
                values={email}
                handleEdit={() => handleEdit(index)}
                handleDelete={() => handleDelete(index)}
                disable={true}>
        </FormField>
      )}) : null }
    </div>
  );
}

export default EmailClient;
