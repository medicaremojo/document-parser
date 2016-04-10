var csv = require('csv');
var fs = require('fs');
var parse = csv.parse;
var transform = csv.transform;

var output = [];
var outputFile = './dist/categories.json';
var parser = parse({delimiter: ','});

// Use the writable stream api
parser.on('readable', function(){
  while(record = parser.read()){
    output.push(createQuestion(record[0], record[1].split(', ')));
  }
});

// Catch any error
parser.on('error', function(err){
  console.log(err.message);
});

// When we are done, test that the parsed output matched what expected
parser.on('finish', function(){
  fs.writeFile(outputFile, JSON.stringify(output, null, 2), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFile);
    }
  });
});

var createQuestion = function(question, categories) {
  return {
    question: question,
    categories: categories
  };
}

var readStream = fs.createReadStream(__dirname + '/../docs/categories.csv').pipe(parser);
