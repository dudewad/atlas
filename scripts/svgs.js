#!/usr/bin/env node
const clArgs = require('command-line-args');
const clOptsDefs = [
  {name: 'source', alias: 's', type: String},
  {name: 'dest', alias: 'd', type: String},
];
let fs = require('fs');
let path = require('path');
let cheerio = require('cheerio');
let mkdirp = require('mkdirp');
let $ = cheerio.load('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0" style="display:none;"><defs></defs></svg>');
let src;
let dest;
let opts;

try {
  opts = clArgs(clOptsDefs);
}
catch (e) {
  const errs = clOptsDefs.map(el => `- ${el.name}`).join('\r\n');
  throw new Error('Bad command line option passed when setting base ref.'
    + ' Possible options are:' + errs);
}

if (!opts.source) {
  throw new Error('Source required when generating svg defs! Aboring.');
}
if (!opts.dest) {
  throw new Error('Dest required when generating svg defs! Aboring.');
}

src = path.join(__dirname, opts.source);
dest = path.join(__dirname, opts.dest);
fs.readdir(src, function (err, files) {
  if (err) {
    process.stderr.write(err);
    return;
  }
  files.forEach(parseSvgFile);
  mkdirp(path.dirname(dest), (err) => {
    if (err) {
      process.stderr.write(err);
      return;
    }
    fs.writeFile(dest, $.html(), {encoding: 'utf8'}, (err) => {
      if (err) {
        process.stderr.write(err);
      }
    });
  });
});

function parseSvgFile(fileName) {
  const pathData = path.parse(fileName);

  if (path.extname(fileName) === '.svg') {
    const fileData = fs.readFileSync(
      path.join(src, pathData.base), 'utf8');
    const svgFromFile = $(fileData);
    const parsedSvg = $('<svg></svg>');
    parsedSvg.attr('viewBox', svgFromFile.attr('viewbox'));
    parsedSvg.attr('id', pathData.name);
    parsedSvg.append(svgFromFile.contents());
    parsedSvg.children().each(function (i, child) {
      $(child).removeAttr('fill').removeAttr('stroke');
    });
    $('defs').append(parsedSvg);
  }
}
