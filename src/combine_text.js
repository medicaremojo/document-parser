var jsonDocument = require('../docs/Medicare_and_you_2016_parsed.json');

var newDocumentJson = [];

jsonDocument.formImage.Pages.forEach(function(page, pageIndex) {
  var areaText = page.Texts;
  var line = "";
  areaText.forEach(function(text, textIndex) {
    var textSection = text.R;
    textSection.forEach(function(section) {
      line += decodeURIComponent(section.T);
    });
  });

  newDocumentJson.push({
    "text": unicodeToChar(line),
    "page": pageIndex + 1
  });
});

function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}

console.log(JSON.stringify(newDocumentJson));
