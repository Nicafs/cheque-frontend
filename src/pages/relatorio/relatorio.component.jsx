import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import NotaPromissoria from './nota-promissoria.component';

export default function Relatorio() {
    return (
        <PDFViewer style={{width: '100%', height: '1200px'}}>
            <NotaPromissoria />
        </PDFViewer>
    )
};
