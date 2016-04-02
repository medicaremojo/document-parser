import fs from 'fs';
import PDFParser from 'pdf2json';

const pdfParser = new PDFParser();

const inputFile = './docs/SocSecdoc.pdf';
const outputFile = './dist/SocSecdoc.txt';

pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError) );
pdfParser.on('pdfParser_dataReady', pdfData => {
  fs.writeFile(outputFile, JSON.stringify(pdfParser.getRawTextContent()));
});

pdfParser.loadPDF(inputFile);
