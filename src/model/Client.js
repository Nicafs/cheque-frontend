import BancoClient from './BancoClient';
import EnderecoClient from './EnderecoClient';
import TelefoneClient from './TelefoneClient';
import EmailClient from './EmailClient';
import ReferenciaClient from './ReferenciaClient';

const Client = {
    name: '',
    nickname: '',
    gender: '',
    cpf: '',
    rg: '',
    birthDate: null,
    nome_pai: '',
    nome_mae: '',
    estado_civil: '',
    conjugue: '',
    credit: '',
    limit: '',
    acrescimo: '',
    local_trabalho: '',
    renda_mensal: '',
    cargo: '',
    user_id: '',
    bancoClient: BancoClient,
    enderecoClient: EnderecoClient,
    telefoneClient: TelefoneClient,
    emailClient: EmailClient,
    referenciaClient: ReferenciaClient,
  }

  export default Client;