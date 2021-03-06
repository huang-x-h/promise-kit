'use strict';

const iterator = require('./util/iterator');

/**
 * Applies the function iteratee to each item in coll, runs a maximum of limit operations at a time.
 * @param {array} coll a collection to iterate over
 * @param {number} limit the maximum number of operations at a time
 * @param {function} iteratee a function to apply to each item in coll
 * eg:
 * function(item, index) {
 *   return new Promise((resolve, reject) => {
 *     //do something
 *   });
 * }
 * @returns {promise} when all iteratee functions have finished, then return a Promise Object
 */
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
