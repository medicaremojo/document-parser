var categoryObj = require('../dist/categories.json');

categoryObj.forEach(function(entry) {
  console.log(entry.categories);
});
