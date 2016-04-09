var fs = require('fs');
var PDFParser = require('pdf2json');

var pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", function(errData) {
  console.error(errData.parserError);
});

pdfParser.on("pdfParser_dataReady", function(pdfData) {
  fs.writeFile("../docs/SocSecdoc.json", JSON.stringify(pdfData));
});

pdfParser.loadPDF("../docs/SocSecdoc.pdf");
