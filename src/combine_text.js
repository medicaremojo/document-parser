var jsonDocument = require('../docs/Medicare_and_you_2016_parsed.json');

jsonDocument.formImage.Pages.forEach(function(page, pageIndex) {
  var areaText = page.Texts;
  var line = "";
  areaText.forEach(function(text, textIndex) {
    var textSection = text.R;
    textSection.forEach(function(section) {
      line += section.T;
      // console.log(section);
    });
    line += "/n";
  });

  console.log(line);
});
