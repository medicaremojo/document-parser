'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _pdf2json = require('pdf2json');

var _pdf2json2 = _interopRequireDefault(_pdf2json);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pdfParser = new _pdf2json2.default();

var inputFile = './docs/SocSecdoc.pdf';
var outputFile = './dist/SocSecdoc.txt';

pdfParser.on('pdfParser_dataError', function (errData) {
  return console.error(errData.parserError);
});
pdfParser.on('pdfParser_dataReady', function (pdfData) {
  _fs2.default.writeFile(outputFile, JSON.stringify(pdfParser.getRawTextContent()));
});

pdfParser.loadPDF(inputFile);