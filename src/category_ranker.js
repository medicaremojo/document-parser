var categoryObj = require('../dist/categories.json');

var rank = {};
var rankedList = [];

categoryObj.forEach(function(entry) {
  entry.categories.forEach(function(category) {
    if (rank.hasOwnProperty(category)) {
      rank[category]++;
    } else {
      rank[category] = 1;
    }
  })
});

for (key in rank) {
  if (rank.hasOwnProperty(key)) {
    rankedList.push({
      category: key,
      count: rank[key]
    });
  }
}

var sorted = rankedList.sort(function(a, b) {
    return a.count - b.count;
});

console.log(sorted);
