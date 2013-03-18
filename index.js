var fs = require('fs');
var Stream = require('stream');

module.exports = function(args)
{
  var stream = new Stream();
  stream.readable = true;
  stream.writable = true;
  stream.write = function(chunk) { stream.emit('data', chunk); };
  if (!args) {
    args = process.argv.slice(2);
  }

  var processNextArgument = function() {
    var name = args.shift();
    if (name) {
      var fstream = fs.createReadStream(name);
      stream.name = name;
      fstream.pipe(stream, {end: false});
      stream.emit('next');
      fstream.once('end', processNextArgument);
    } else {
      stream.emit('end');
    }
  };

  fs.fstat(process.stdin.fd, function(err, stat) {
    if (err)
      return stream.emit('error', err);
    if (stat.size > 0) {
      stream.name = null;
      process.stdin.resume();
      process.stdin.pipe(stream, {end: false});
      process.stdin.once('end', processNextArgument);
    } else {
      processNextArgument();
    }
  });
  return stream;
};
