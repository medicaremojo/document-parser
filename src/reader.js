var originalDoc = require('../dist/medicare_pages.json');

originalDoc.forEach(function(entry) {
  console.log(entry.question);
});
