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

function createNewQuestion(constructor) {
  return Object.assign({}, {
    question: "",
    paragraph: "",
    section: "",
    page: null
  }, constructor);
}

var questionCreator = QuestionCreator(newDocumentJson);

// Loop through each page
jsonDocument.formImage.Pages.forEach(function(page, pageIndex) {
  var pageText = page.Texts;

  // Initial Capture Mode must be on to work
  var captureMode = false;

  // Logic gates for which state of capture mode we are currently in
  var captureSection = false;
  var captureQuestion = false;
  var captureParagraph = false;

  var capturedSection = "";

  var currentQuestion;
  // Loop through the text of each page
  pageText.forEach(function(text, textIndex) {
    // Find where it is styled with a blue box around the text
    if (text.sw === 0.26953125) {
      if (captureMode && captureParagraph) {
        captureSection = true;
        captureQuestion = false;
        captureParagraph = false;

        // Push question to array
        if (!currentQuestion.page) {
          currentQuestion.page === pageIndex;
        }
        questionCreator(currentQuestion);

        // Reset new question
        currentQuestion = createNewQuestion({
          page: pageIndex
        });
      }

      var textSection = text.R;
      // Loop through the section of each page
      textSection.forEach(function(section) {
        if (captureMode) {
          if (section.TS[1] === 18 && captureSection) {
            currentQuestion.section += decodeURIComponent(section.T);
          } else if (section.TS[1] === 22 && captureSection) {
            // Set captured question to new section,
            // else set it to the previous
            if (capturedSection.length > 0) {
              capturedSection = currentQuestion.section;
            } else {
              currentQuestion.section = capturedSection;
            }
            captureSection = false;
            captureQuestion = true;

            currentQuestion.question += decodeURIComponent(section.T);
          } else if (section.TS[1] === 22 && captureQuestion) {
            currentQuestion.question += decodeURIComponent(section.T);
          } else if ((section.TS[1] !== 18 || section.TS[1] !== 22) && (captureSection || captureQuestion)) {
            captureSection = false;
            captureQuestion = false;
            captureParagraph = true;
            currentQuestion.paragraph += decodeURIComponent(section.T);
          } else if ((section.TS[1] !== 18 || section.TS[1] !== 22) && captureParagraph) {
            currentQuestion.paragraph += decodeURIComponent(section.T);
          }
        } else if (section.TS[1] === 18) {
          captureMode = true;
          captureSection = true;
          currentQuestion = createNewQuestion({
            page: pageIndex
          });
          currentQuestion.section += decodeURIComponent(section.T);
        }

        // if (section.TS[1] === 18) {
        //   questionSection += decodeURIComponent(section.T);
        // } else if (section.TS[1] === 22) {
        //   question += decodeURIComponent(section.T);
        // } else {
        //   extraInformation += decodeURIComponent(section.T);
        // }
      });
    } else if (captureMode && !captureParagraph) {
      captureSection = false;
      captureQuestion = false;
      captureParagraph = true;

      var textSection = text.R;
      textSection.forEach(function(section) {
        currentQuestion.paragraph += decodeURIComponent(section.T);
      });
    } else if (captureMode && captureParagraph) {
      var textSection = text.R;
      textSection.forEach(function(section) {
        currentQuestion.paragraph += decodeURIComponent(section.T);
      });
    }
  });
});

function unicodeToChar(text) {
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
}

// console.log(JSON.stringify(newDocumentJson, null, 2));

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
