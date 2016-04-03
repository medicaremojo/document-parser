var jsonDocument = require('../docs/Medicare_and_you_2016_parsed.json');

var newDocumentJson = [];
var questionCounter = 0;

jsonDocument.formImage.Pages.forEach(function(page, pageIndex) {
  var pageText = page.Texts;
  var question = "";
  pageText.forEach(function(text, textIndex) {
    if (text.sw === 0.26953125) {
      var textSection = text.R;
      textSection.forEach(function(section) {
        question += decodeURIComponent(section.T);
      });
    }
  });

  if (question.length > 0) {
    newDocumentJson.push({
      question: question,
      page: pageIndex,
      index: questionCounter++
    });
  }
});

function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}

console.log(JSON.stringify(newDocumentJson));
