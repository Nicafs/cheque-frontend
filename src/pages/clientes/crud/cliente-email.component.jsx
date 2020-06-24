import React from "react";
import { useSnackbar } from 'notistack';

import FormField from '../../../core/components/form/form.component';

function EmailClient ({ emails, setEmails, deleteEmailClient, updateEmailClient, createEmailClient }) {
  // const [newEmails, setNewEmails] = useState([]);
  
  const emailForm = [
    { type: 'text', name: 'email', label: 'Email', size: 10 },
    { type: 'text', name: 'principal', label: 'Principal', size: 2 },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event, email) => {
    event.preventDefault();

    emails.map(email => {
      if(email.id){
        updateEmailClient(email);
        enqueueSnackbar('Foi realizada a Atualização com Sucesso !!')
      } else {
        createEmailClient(email);
        enqueueSnackbar('Foi Criado com Sucesso !!')
      }

      return null;
    })
  }

  const handleChange = (index, name, value, email) => {  
    email[name] = value;
    setEmails(prevEmails => (prevEmails.map(v => {
          if (v === index) return { ...v, [index]: email }
          return v;
        })));
  }

  const handleDelete = (email) => {
    alert('Deseja deletar mesmo?');
    if(email.id){
      deleteEmailClient(email.id);
    }
  };

  return (
    <>
      {emails.map((email, index) => {
        return (
            <FormField key={index} fields={emailForm} 
                      handleChange={(name, value) => handleChange(index, name, value, email)}
                      values={email}
                      handleDelete={() => handleDelete(email)} handleSubmit={handleSubmit}>
            </FormField>
          )
        })
      }
    </>
  );
}

export default EmailClient;
