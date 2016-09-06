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
```

## API

### promiseKit.eachLimit(array, limit, iterator)


