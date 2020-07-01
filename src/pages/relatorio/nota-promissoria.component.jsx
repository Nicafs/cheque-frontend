import React from 'react';
import { Page, Text, View, Document, StyleSheet, Canvas, Font } from '@react-pdf/renderer';
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
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    fontSize: '10px',
    lineHeight: '1.5px'
  },
  section: {
    margin: 40,
    padding: 10,
    flexGrow: 1,
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
export default function MyDocument() {
  return (
  <Document title={'Nota Promissória'} creator={'Usuário'} author={'Cliente'}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <Text>Nota Promissória N.: 1</Text>
            <Text>Valor R$: 1,00</Text>
          </View>

          <View>
            <Text>Vencimento em 30/06/2020</Text>
          </View>
        </View>

        <View>
          <Text>Aos 30 dias do mês de junho de 2020, EU, **CONSUMIRDOR FINAL**</Text>
          <Text>Pagarei por esta única via de Promissória a Importância de:</Text>
          <Text>UM REAL</Text>
          <Text>x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x</Text>
          <Text>A:</Text>
            <Canvas paint={painter => 
              painter.moveTo(16, -2)
              .lineTo(500, -2)
              .fill("#000")}>
            </Canvas>
          <Text style={styles.end}>PADRÃO-MT em {new Date().toLocaleDateString()}</Text>
        </View>
        
        <View style={styles.footer}>
          <View>
            <Text>Devedor: </Text>
            <Text>C.P.F./C.N.P.J.: </Text>
            <Text>Telefone: </Text>
          </View>
          <View>
            <Text>...............................................................................................</Text>
            <Text style={{ alignSelf: 'center', fontWeight:'bold' }}>**CONSUMIDOR FINAL**</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
  )
};