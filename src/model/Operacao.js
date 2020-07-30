import Client from './Client';

const Operacao = {
    id: '',
    client: Client,
    user_id: '',
    situacao: '',
    percentual: 8,
    tarifa: 0,
    data_operacao: new Date(),
    acrescimos: 0,
    tarifa_bordero: 0,
    total_operacao: 0,
    total_encargos: 0,
    total_liquido: 0,
    total_outros: 0,
    obs: '',
    chequeOperacao: [],
  }

  export default Operacao;
