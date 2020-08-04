const todayMore30Day = new Date();
const days = 30;

todayMore30Day.setDate(todayMore30Day.getDate() + days);

const ChequeOperacao = {
    id: '',
    operacao_id: '',
    user_id: '',
    banco: {id: '', descricao: ''},
    tipo: '',
    agencia: 0,
    conta: 0,
    numero: '',
    dias: days,
    status: '',
    data_vencimento: todayMore30Day,
    data_quitacao: null,
    valor_operacao: 0,
    valor_encargos: 0,
    emitente: '',
  }

  export default ChequeOperacao;
