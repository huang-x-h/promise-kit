'use strict';

const iterator = require('./util/iterator');

function eachLimit(coll, limit, iteratee) {
  if (limit <= 0 || !coll) return Promise.resolve();

  let result = [];
  let done = false;
  let running = 0;
  let nextElem = iterator(coll);

  function replenish() {
    return new Promise(function(resolve, reject) {
      const successHandle = (key, data) => {
        result[key] = data;
        running--;
        if (done && running <= 0) {
          resolve(result);
        } else {
          replenish().then(resolve, reject)
        }
      };

      const iteratorHandle = (value, key, iterator) => {
        let data = iterator(value, key);
        if (data instanceof Promise) {
          data.then((data) => {
            successHandle(key, data);
          }).catch(function(e) {
            running--;
            done = true;
            reject(e);
          });
        } else {
          successHandle(key, data);
        }
      };

      while (running < limit && !done) {
        let elem = nextElem();
        if (elem === null) {
          done = true;
          if (running <= 0) {
            resolve(result);
          }
          return;
        }

        running++;

        iteratorHandle(elem.value, elem.key, iteratee);
      }
    });
  }

  return replenish();
}

module.exports = eachLimit;
