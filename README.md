diamond
=======

stdin + arguments composite stream


# install
```
npm install diamond-operator
```

# example

pipe stdin and content of files from command line to stdout:
```js
var diamond = require('diamond-operator');

diamond().pipe(process.stdout);
```

listen for 'next' event:

```js
var diamond = require('diamond-operator');

var stream = diamond();

stream.on('data', function(d) {
     console.log('data:', d);
});
stream.on('end', function() {
     console.log('end');
});
stream.on('next', function() {
    console.log('next stream!', stream.name);
});

```

by default, `process.argv.slice(2)` is used as list of files. You can pass your own list:

```js
var program = require('commander');
var diamond = require('diamond-operator');

program
  .version('0.0.1')
  .option('-c', 'Count chars')
  .option('-l,', 'Count lines')
  .parse(process.argv);

var stream = diamond(program.args);
// ...
```


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/sidorares/diamond/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

