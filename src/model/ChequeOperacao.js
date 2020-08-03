const ChequeOperacao = {
    id: '',
    operacao_id: '',
    user_id: '',
    banco: {id: '', descricao: ''},
    tipo: '',
    agencia: 0,
    conta: 0,
    numero: '',
    dias: 30,
    status: '',
    data_vencimento: new Date().getDate() + 30,
    data_quitacao: null,
    valor_operacao: 0,
    valor_encargos: 0,
    emitente: '',
  }

  export default ChequeOperacao;
