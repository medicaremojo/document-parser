var jsonDocument = require('../docs/Medicare_and_you_2016_parsed.json');
var fs = require('fs');
var outputFilename = './dist/medicare_pages.json';

var newDocumentJson = [];

function QuestionCreator(collection) {
  var idCount = 0;
  return function(doc) {
    return collection.push(Object.assign({}, doc, {
      id: idCount++
    }));
  }
}

var questionCreator = QuestionCreator(newDocumentJson);

jsonDocument.formImage.Pages.forEach(function(page, pageIndex) {
  var pageText = page.Texts;
  var question = "";
  var paragraph = "";
  var questionSection = "";
  var extraInformation = "";
  var captureEndOfPage = false;
  pageText.forEach(function(text, textIndex) {
    if (text.sw === 0.26953125) {
      var textSection = text.R;
      textSection.forEach(function(section) {
        // console.log(section.TS, decodeURIComponent(section.T));
        if (section.TS[1] === 18) {
          questionSection += decodeURIComponent(section.T);
        } else if (section.TS[1] === 22) {
          question += decodeURIComponent(section.T);
        } else {
          extraInformation += decodeURIComponent(section.T);
        }
      });
      captureEndOfPage = true;
    } else if (captureEndOfPage) {
      var textSection = text.R;
      textSection.forEach(function(section) {
        paragraph += decodeURIComponent(section.T);
      });
    }
  });

  if (question.length > 0) {
    questionCreator({
      question: question,
      section: questionSection,
      extraInformation: extraInformation,
      paragraph: paragraph,
      page: pageIndex
    });
  }
});

function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}

function writeOut(obj){
  fs.writeFile(outputFilename, JSON.stringify(obj, null, 2), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
  });
}

writeOut(newDocumentJson);
