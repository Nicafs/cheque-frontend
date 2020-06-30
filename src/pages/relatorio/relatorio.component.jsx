import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import MyDocument from './nota-promissoria.component';

export default function Relatorio() {
    return (
        <PDFViewer style={{height: '1200px'}}>
            <MyDocument />
        </PDFViewer>
    )
};