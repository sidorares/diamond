var diamond = require('../index.js');

var stream = diamond();

stream.on('data', function(d) {
   console.log('data:', d);
});
stream.on('end', function() {
   console.log('end');
});
stream.on('next', function() {
  console.log('next stream!', this.name);
});
