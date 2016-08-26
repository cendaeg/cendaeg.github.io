#!/Users/cendaeg/.nvm/versions/node/v6.1.0/bin/node
const marked = require('marked');
const fs = require('fs');
const path = require('path');
(function() {
  function processArgs() {
    return [process.argv[2]]
  }

  function formatDate() {
    var monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "July",
      "Aug", "Sept", "Oct",
      "Nov", "Dec"
    ];

    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  function scaffoldPost(contents) {
    contents = contents.replace(/\{\{title\}\}/g, post.title);
    contents = contents.replace(/\{\{desc\}\}/g, post.desc);
    contents = contents.replace(/\{\{subtitle\}\}/g, post.subtitle);
    contents = contents.replace(/\{\{date\}\}/g, formatDate());
    contents = contents.replace(/\{\{post\}\}/g, marked(post.post));
    return contents;
  }

  function readFile(file, cb) {
    return fs.readFileSync(path.resolve(__dirname, file), 'utf8');
  }

  function printResults(contents) {
    console.log(contents);
  }

  var [file] = processArgs();

  var post = require(path.resolve(__dirname, file));

  printResults(scaffoldPost(readFile("post.html")))
})();
