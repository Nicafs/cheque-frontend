import React, { useState, useEffect} from 'react';
import api from '../../core/services/api';

import NumberFormat from 'react-number-format';
import { Page, Text, View, Document, StyleSheet, Canvas, Font, Image } from '@react-pdf/renderer';
import arial from "../../assets/fonts/arial.ttf";
import arial_bold from "../../assets/fonts/arial-bold.ttf";

Font.register({ family: 'Arial', fonts: [
    { src: arial }, // font-style: normal, font-weight: normal
    { src: arial_bold, fontWeight: 'bold' },
]});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Arial',
    backgroundColor: '#E4E4E4',
    fontSize: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column'
  },
  headerAll: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '5px',
  },
  header: {
    fontSize: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'center',
    marginBottom: '5px',
  },
  headerTop: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'center',
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: '8px',
    lineHeight: '1.5px',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '19px',
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: '16px',
    textAlign: 'center',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 15,
    width: '100px',

  },
  breakLine: {
    margin: '5px 0px',

  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
  },
  tableHead: {
    backgroundColor: '#757575',
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyItems: 'center',
    padding: '3px',
  },
  tableBody: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'center',
    padding: '3px',
  },
  tableTitle: {
    fontSize: '9px',
    marginBottom: '3px'
  },
  tableField: {
    fontSize: '7px',
    display: 'flex',
    flexDirection: 'row',
  },
  textRight: {
    textAlign: 'right',
  },
  textCenter: {
    textAlign: 'center',
  },
  totais: {
    fontWeight: 'bold',
    fontSize: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyItems: 'flex-end',
    border: '1px solid gray',
    padding: '4px',
  },
  total: {
    display: 'flex',
    flexDirection: 'row',
  },
  totalText: {
    display: 'flex',
    flexDirection: 'row',
  },
  totalTextWidth: {
    width: '85px',
  },
  totalNumberWidth: {
    marginLeft: '1px',
    width: '90px',
  },
  assinatura: {
    alignSelf: 'center', 
    fontWeight:'bold',
    fontSize: '8px'
  }
});


const moneyMask = (value) => {
  return <NumberFormat value={value} prefix={'R$ '} 
                      displayType={'text'} 
                      thousandSeparator={'.'}
                      decimalSeparator={','}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      renderText={value =><Text style={styles.textRight}>{value}</Text>} />;
}

const numberMask = (value, mask) => {
  return <NumberFormat value={value}
          format={mask}
          mask={mask}
          displayType={'text'} 
          isNumericString
          renderText={value => value } />;
}

// Create Document Component
export default function OperacaoCredito({operacao}) {
  const [client, setClient] = useState({});
  const [configuracao, setConfiguracao] = useState({});

  useEffect(() => {
    const fetchClient = async () => {
      const response = await api.get(`/clients/${operacao.client_id}`);
      setClient(response.data);
    };

    const fetchConfiguracao = async () => {
      const response = await api.get(`/configuracao`);
      setConfiguracao(response.data);
    };

    if(operacao.client_id) {
      fetchClient();
    }

    fetchConfiguracao();
  }, [operacao]);

  const cheques = operacao.chequeOperacao;

  return ( 
    <Document title={'Operação de Crédito'} creator={'Usuário'} author={'Cliente'}>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerAll}>
          <View style={styles.header}>
            <Image style={styles.image} src="https://i2.wp.com/www.unibrasil.com.br/wp-content/uploads/2016/12/marca_unibrasil_amarelo_retina.png?fit=366%2C140&ssl=1"/>

            <View style={{display: 'flex', flexDirection: 'column'}}>
              <View>
                <Text style={styles.title}> { configuracao.name } </Text>
              </View>

              <View style={[styles.headerInfo, styles.headerText]}>
                <View>
                  <Text> Endereço: { configuracao.endLogradouro }  </Text>
                  <Text> Bairro: { configuracao.endBairro }  </Text>
                  <Text> Telefone: { configuracao.telefone }  </Text>
                </View>

                <View>
                  <Text> Nº: { configuracao.endNumero }  </Text>
                  <Text> Cidade: { configuracao.endCidade }  </Text>
                  <Text> Whatsapp: { configuracao.whatsapp }  </Text>
                </View>

                <View>
                  <Text> CNPJ: { configuracao.cpfCnpj }  </Text>
                  <Text> CEP: { configuracao.endCep }  </Text>
                  <Text> Celular: { configuracao.celular }  </Text>
                </View>
              </View>

              <View style={styles.headerText}>
                <Text> E-mail: { configuracao.email } </Text>
              </View>  
            </View>
          </View>

          <View>
            <Canvas style={{width: '100%', height: '1px'}}
              paint={painter =>
              painter.moveTo(0, -2)
              .lineTo(575, 0)
              .fill("#000")}>
            </Canvas>
          </View>
        </View>
     
        <View>
          <Text style={styles.subTitle}> VENDA </Text>
        </View>
        
        <View style={styles.breakLine}>
          <Canvas style={{width: '100%', height: '1px'}}
            paint={painter =>
            painter.moveTo(0, -2)
            .lineTo(575, 0)
            .fill("#000")}>
          </Canvas>
        </View>

        <View style={[styles.headerInfo, styles.headerText]}>
          <Text> Nº: { operacao.id } </Text>
          <Text> Atendente:  { operacao.user ? operacao.user.name : '' } </Text>
          <Text> Data: { new Date(operacao.data_operacao).toLocaleString() } </Text>
        </View>

        <View style={styles.breakLine}>
          <Canvas style={{width: '100%', height: '1px'}}
            paint={painter =>
            painter.moveTo(0, -2)
            .lineTo(575, 0)
            .fill("#000")}>
          </Canvas>
        </View>

        <View style={[styles.headerInfo, styles.headerText]}>
          <View>
            <Text> Cliente.: { client.name } </Text>
            <Text> Endereço: { client.enderecoClient && client.enderecoClient.length > 0 ? client.enderecoClient[0].logradouro : null } </Text>
            <Text> CPF/CNPJ: { client.cpf ? numberMask(client.cpf, '###.###.###-##') : '' } </Text>
          </View>

          <View>
            <Text> </Text>
            <Text> </Text>
            <Text> Bairro: { client.enderecoClient && client.enderecoClient.length > 0 ? client.enderecoClient[0].bairro : null } </Text>
          </View>

          <View>
            <Text> Contato: { client.telefoneClient && client.telefoneClient.length > 0 ? numberMask(client.telefoneClient[0].numero, '(##) # ####-####') : null } </Text>
            <Text> Complemento: { client.enderecoClient && client.enderecoClient.length > 0 ? client.enderecoClient[0].complemento : null } </Text>
            <Text> Cidade: { client.enderecoClient && client.enderecoClient.length > 0 ? client.enderecoClient[0].cidade : null } - { client.enderecoClient && client.enderecoClient.length ? client.enderecoClient[0].estado : null } </Text>
          </View>

          <View>
            <Text> Fone: { client.telefoneClient && client.telefoneClient.length > 0 ?  numberMask(client.telefoneClient[0].numero, '(##) # ####-####') : null } </Text>
            <Text> </Text>
            <Text> CEP: { client.enderecoClient && client.enderecoClient.length > 0 ? numberMask(client.enderecoClient[0].cep, '#####-###') : null } </Text>
          </View>
        </View>
                    
        <View style={styles.breakLine}>
          <Canvas style={{width: '100%', height: '1px'}}
            paint={painter =>
            painter.moveTo(0, -2)
            .lineTo(575, 0)
            .fill("#000")}>
          </Canvas>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHead}>
            <View style={styles.tableTitle}>
              <Text> Cheques </Text>
            </View>
            
            <View style={styles.tableField}>
              <View style={{width: '30px'}}><Text style={styles.textCenter}> Tipo </Text></View>
              <View style={{width: '40px'}}><Text> Banco </Text></View>
              <View style={{width: '35px'}}><Text style={styles.textCenter}> Agência </Text></View>
              <View style={{width: '50px'}}><Text style={styles.textCenter}> Conta </Text></View>
              <View style={{width: '45px'}}><Text style={styles.textCenter}> Docto/Chq </Text></View>
              <View style={{width: '30px'}}><Text style={styles.textCenter}> Dias </Text></View>
              <View style={{width: '50px'}}><Text style={styles.textCenter}> Vencimento </Text></View>
              <View style={{width: '70px'}}><Text style={styles.textRight}> Valor Operação </Text></View>
              <View style={{width: '70px'}}><Text style={styles.textRight}> Valor Encargos </Text></View>
              <View style={{width: '50px'}}><Text style={styles.textCenter}> Data Quitação </Text></View>
              <View style={{width: '90px'}}><Text> Emitente </Text></View>
            </View>
          </View>
            
            {cheques.map((cheque, index) => {
              return (
                <View key={index} style={[styles.tableField, styles.tableBody]}>
                  <View style={{width: '30px'}}><Text style={styles.textCenter}> { cheque.tipo } </Text></View>
                  <View style={{width: '40px'}}><Text> { cheque.banco.descricao } </Text></View>
                  <View style={{width: '35px'}}><Text style={styles.textCenter}> { cheque.agencia } </Text></View>
                  <View style={{width: '50px'}}><Text style={styles.textCenter}> { cheque.conta } </Text></View>
                  <View style={{width: '45px'}}><Text style={styles.textCenter}> { cheque.numero } </Text></View>
                  <View style={{width: '30px'}}><Text style={styles.textCenter}> { cheque.dias } </Text></View>
                  <View style={{width: '50px'}}><Text style={styles.textCenter}> { new Date(cheque.data_vencimento).toLocaleDateString() } </Text></View>
                  <View style={{width: '70px'}}><Text style={styles.textRight}> { cheque.valor_operacao } </Text></View>
                  <View style={{width: '70px'}}><Text style={styles.textRight}> { cheque.valor_encargos } </Text></View>
                  <View style={{width: '50px'}}><Text style={styles.textCenter}> { new Date(cheque.data_quitacao).toLocaleDateString() } </Text></View>
                  <View style={{width: '90px'}}><Text> { cheque.emitente } </Text></View>
                </View>
              )
            })}
        </View>
            
        <View style={styles.totais}>
          <View style={styles.total}>
            <View style={styles.totalText}>
              <Text style={styles.totalTextWidth}>Total Operação</Text>
              <Text>:</Text>
            </View>
            <View style={styles.totalTextWidth}>
              {moneyMask(operacao.total_operacao ? operacao.total_operacao : 0)}
            </View>
          </View>
          <View style={styles.total}>
            <View style={styles.totalText}>
              <Text style={styles.totalTextWidth}>Total Acréscimos</Text>
              <Text>:</Text>
            </View>
            <View style={styles.totalTextWidth}>
              {moneyMask(operacao.total_outros ? operacao.total_outros : 0)}
            </View>
          </View>
          <View style={styles.total}>
            <View style={styles.totalText}>
              <Text style={styles.totalTextWidth}>Total Encargos</Text>
              <Text>:</Text>
            </View>
            <View style={styles.totalTextWidth}>
              {moneyMask(operacao.total_encargos ? operacao.total_encargos : 0)}
            </View>
          </View>
          <View style={styles.total}>
            <View style={styles.totalText}>
              <Text style={styles.totalTextWidth}>Total Líquido</Text>
              <Text>:</Text>
            </View>
            <View style={styles.totalTextWidth}>
              {moneyMask(operacao.total_liquido ? operacao.total_liquido : 0)}
            </View>
          </View>
        </View>

        <View style={{ alignSelf: 'center', marginTop: '40px' }}>
          <Text>...............................................................................................</Text>
          <Text style={styles.assinatura}>Assinatura do Cliente</Text>
        </View>

      </Page>
    </Document>
  )
};
