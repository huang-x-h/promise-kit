# Promise kit
> add utilities function to Promise

## Usage

```js
const promiseKit = require('promise-kit');
promiseKit.eachLimit([1, 2, 3, 4, 5], 2, function(item) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(item + 1);
    }, 1e2)
  });
}).then(function(data) {
  console.log(data); //output 2, 3, 4, 5, 6
});

promiseKit.eachSeries([1, 2, 3, 4, 5], (previousValue, item) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve(item + previousValue);
    }, 1e2)
  });
}, 0).then(function(data) {
  expect(data).to.eql(15);
  done();
});
```

## API

### promiseKit.eachLimit(array, limit, iterator)

Applies the function iteratee to each item in coll, runs a maximum of limit operations at a time.

### promiseKit.eachSeries(array, iterator, initialValue)

Applies the function iteratee to each item in coll, runs as sequence like array.prototype.reduce.
