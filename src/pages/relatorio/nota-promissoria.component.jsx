import React, { useState, useEffect} from 'react';
import api from '../../core/services/api';

import NumberFormat from 'react-number-format';
import { Page, Text, View, Document, StyleSheet, Canvas, Font } from '@react-pdf/renderer';
import arial from "../../assets/fonts/arial.ttf";
import arial_bold from "../../assets/fonts/arial-bold.ttf";

// eslint-disable-next-line no-extend-native
String.prototype.extenso = function(c){
  var ex = [
      ["zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"],
      ["dez", "vinte", "trinta", "quarenta", "cinqüenta", "sessenta", "setenta", "oitenta", "noventa"],
      ["cem", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"],
      ["mil", "milhão", "bilhão", "trilhão", "quadrilhão", "quintilhão", "sextilhão", "setilhão", "octilhão", "nonilhão", "decilhão", "undecilhão", "dodecilhão", "tredecilhão", "quatrodecilhão", "quindecilhão", "sedecilhão", "septendecilhão", "octencilhão", "nonencilhão"]
  ];
  var a, v, i, n = this.replace(c ? /[^,\d]/g : /\D/g, "").split(",");
  let e = " e ";
  let $ = "real";
  let d = "centavo";

  for(var f = n.length - 1, l, j = -1, r = [], s = [], t = ""; ++j <= f; s = []){
      j && (n[j] = (("." + n[j]) * 1).toFixed(2).slice(2));
      if(!(a = (v = n[j]).slice((l = v.length) % 3).match(/\d{3}/g), v = l % 3 ? [v.slice(0, l % 3)] : [], v = a ? v.concat(a) : v).length) continue;
      for(a = -1, l = v.length; ++a < l; t = "") {
          if(!(i = v[a] * 1)) continue;
          (i % 100 < 20 && (t += ex[0][i % 100])) ||
          (i % 100 + 1 && (t += ex[1][(i % 100 / 10 >> 0) - 1] + (i % 10 ? e + ex[0][i % 10] : "")));
          s.push((i < 100 ? t : !(i % 100) ? ex[2][i === 100 ? 0 : i / 100 >> 0] : (ex[2][i / 100 >> 0] + e + t)) +
          ((t = l - a - 2) > -1 ? " " + (i > 1 && t > 0 ? ex[3][t].replace("ão", "ões") : ex[3][t]) : ""));
      }
      a = (s.length > 1 ? (a = s.pop(), s.join(" ") + e + a) : s.join("") || (((!j && (n[j + 1] * 1 > 0)) || r.length) ? "" : ex[0][0]));
      a && r.push(a + (c ? (" " + (v.join("") * 1 > 1 ? j ? d + "s" : (/0{6,}$/.test(n[0]) ? "de " : "") + $.replace("l", "is") : j ? d : $)) : ""));
  }
  return r.join(e);
}

Font.register({ family: 'Arial', fonts: [
  { src: arial }, // font-style: normal, font-weight: normal
  { src: arial_bold, fontWeight: 'bold' },
 ]});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Arial',
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    fontSize: '10px',
    lineHeight: '1.5px'
  },
  section: {
    margin: '40px 40px 0px 40px',
    padding: 10,
    flexGrow: 1
  },
  noMarginTop: {
    marginTop: 10
  },
  notaBackground: {
    backgroundColor: '#ffcf00',
    border: '1px solid black'
  },
  header: {
    fontWeight: 'bold',
    fontSize: '12px',
    marginBottom: '5px',
    lineHeight: '1.2px'
  },
  footer: {
    marginTop: '45px',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  end: {
    alignSelf: 'flex-end',
    margin: '5px 70px 0px 0px'
  }
});

// Create Document Component
export default function NotaPromissoria({operacao}) {
  const [client, setClient] = useState({});

  useEffect(() => {
    const fetchClient = async () => {
      const response = await api.get(`/clients/${operacao.client_id}`);
      setClient(response.data);
    };

    if(operacao.client_id) {
      fetchClient();
    }
  }, [operacao]);

  const cheques = operacao.chequeOperacao;

  return (
    <Document title={'Nota Promissória'} creator={'Usuário'} author={'Cliente'}>
      <Page size="A4" style={styles.page}>
        <View>
          {cheques.map((cheque, index) => {

            const day = new Date(cheque.data_vencimento).getDay();
            const monthName = new Date(cheque.data_vencimento).toLocaleString('default', { month: 'long' });
            const year = new Date(cheque.data_vencimento).getFullYear();

            return (
              <View key={index}>
                <View style={[styles.section, styles.notaBackground]}>
                  <View style={styles.header}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <Text>Nota Promissória N.: {cheque?.numero}</Text>
                      <Text>Valor R$: {cheque?.valor_operacao}</Text>
                    </View>

                    <View>
                      <Text>Vencimento em {cheque?.data_vencimento ? new Date(cheque.data_vencimento).toLocaleDateString() : null}</Text>
                    </View>
                  </View>

                  <View>
                    <Text>Aos {day} {day > 1 ? 'dias' : 'dia'} do mês de {monthName} de {year}, EU, {client?.name}</Text>
                    <Text>Pagarei por esta única via de Promissória a Importância de:</Text>
                    <Text>{cheque.valor_operacao.extenso().toUpperCase()} REAIS</Text>
                    <Text>x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x</Text>
                    <Text>A:</Text>
                      <Canvas style={{width: '100%', height: '1px'}}
                        paint={painter =>
                        painter.moveTo(16, -2)
                        .lineTo(500, -2)
                        .fill("#000")}>
                      </Canvas>
                    <Text style={styles.end}>PADRÃO-MT em {new Date().toLocaleDateString()}</Text>
                  </View>

                  <View style={styles.footer}>
                    <View>
                      <Text>Devedor: {client?.name}</Text>
                      <Text>C.P.F./C.N.P.J.:
                        {client?.cpf && client.cpf.length === 11 ?
                        <NumberFormat value={client?.cpf} format={'###.###.###-##'}
                            displayType={'text'} renderText={value =><Text>{value}</Text>} />
                            : null }
                      </Text>
                      <Text>Telefone:
                        {client?.telefoneClient && client?.telefoneClient.length > 0 ?
                        <NumberFormat value={client?.telefoneClient && client?.telefoneClient.length > 0 ? client?.telefoneClient[0].numero : null} format={'(##) # ####-####'}
                            displayType={'text'} renderText={value =><Text>{value}</Text>} />
                            : null }
                      </Text>
                    </View>
                    <View>
                      <Text>...............................................................................................</Text>
                      <Text style={{ alignSelf: 'center', fontWeight:'bold' }}>{client?.name}</Text>
                    </View>
                  </View>
                </View>

                <View style={[styles.section, styles.noMarginTop]}>
                  <Text>- - - - -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</Text>
                </View>
              </View>
            )
          })}
        </View>
      </Page>
    </Document>
  )
};
