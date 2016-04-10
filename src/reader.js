var originalDoc = require('../dist/medicare_pages.json');
var fs = require('fs');

function exportQuestions() {
  var writeStream = fs.createWriteStream('./dist/questions.txt');

  originalDoc.forEach(function(entry) {
    writeStream.write(entry.question + "\n");
  });

  writeStream.end();
}

if (process.argv[2] === '--export') {
  switch (process.argv[3]) {
  case 'questions':
  default:
    exportQuestions();
  }
}
