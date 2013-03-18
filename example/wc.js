var program = require('commander');
var diamond = require('..');

program
  .version('0.0.1')
  .option('-c, --chars', 'Count chars')
  .option('-l, --lines', 'Count lines')
  .parse(process.argv);

var lines = 0;
var chars = 0;
var stream = diamond(program.args);
stream.on('data', function(chunk) {
  chars += chunk.length;
  if (program.lines)
    for (var i=0; i < chunk.length; ++i)
      if (chunk[i] == 10)
        lines++;
}).on('end', function() {
  if (program.lines)
    console.log(lines);
  if (program.chars)
    console.log(chars);
});
