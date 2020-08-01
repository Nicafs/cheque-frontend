import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import NotaPromissoria from './nota-promissoria.component';
import OperacaoCredito from './operacao-credito.component';

export default function Relatorio({flgRelatorio}) {
    return (
        <PDFViewer style={{width: '100%', height: '1200px'}}>
            {flgRelatorio === 1 ? <NotaPromissoria /> : <OperacaoCredito /> }
        </PDFViewer>
    )
};
