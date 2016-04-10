// Imports
var originalDoc = require('../dist/medicare_pages.json');
var fs = require('fs');

// Initialize variables
var transformedDoc;
var newDoc;

function writeOut(obj, file){
  fs.writeFile(file, JSON.stringify(obj, null, 2), function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + file);
    }
  });
}

function mapSectionByPage(page) {
  if (page < 15) {
    return 'Introduction';
  } else if (page >= 15 && page < 23) {
    return 'Section 1- Learn How Medicare Works';
  } else if (page >= 23 && page < 37) {
    return 'Section 2—Signing Up for Medicare Part A and Part B';
  } else if (page >= 37 && page < 75) {
    return 'Section 3—Find Out if Medicare Covers Your Test, Service, or Item';
  } else if (page >= 75 && page < 83) {
    return 'Section 4—What’s Original Medicare?';
  } else if (page >= 83 && page < 99) {
    return 'Section 5—Learn about Medicare Advantage Plans (Part C) & Other Medicare Health Plans';
  } else if (page >= 99 && page < 105) {
    return 'Section 6—What are Medicare Supplement Insurance (Medigap) Policies?';
  } else if (page >= 105 && page < 119) {
    return 'Section 7— Get Information about Prescription Drug Coverage (Part D)';
  } else if (page >= 119 && page < 127) {
    return 'Section 8— Get Help Paying Your Health & Prescription Drug Costs';
  } else if (page >= 127 && page < 141) {
    return 'Section 9—Know Your Rights & Protect Yourself from Fraud';
  } else {
    return 'Section 10— Get More Information';
  }
}

newDoc = originalDoc.map(function(entry, entryIndex) {
  var newEntry = {};
  if (entry.question === entry.section) {
    newEntry.section = mapSectionByPage(entry.page);
  }

  return Object.assign({}, entry, newEntry);
});

writeOut(newDoc, "./dist/medicare_pages_parsed.json");

// var indexWithProblems = [];
// originalDoc.forEach(function(entry, entryIndex) {
//   var correctSection = /^Section/.test(entry.section) || /^Introduction$/.test(entry.section);
//   if (!correctSection) {
//     console.log(entry.section);
//     indexWithProblems.push(entryIndex);
//   }
// });
