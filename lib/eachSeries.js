'use strict';

const iterator = require('./util/iterator');

/**
 * Applies the function iteratee to each item in coll, runs as sequence like array.prototype.reduce.
 * @param {array} coll a collection to iterate over
 * @param {function} iteratee a function to apply to each item in coll
 * eg:
 * function(previousValue, item, index) {
 *   return new Promise((resolve, reject) => {
 *     //do something
 *   });
 * }
 * @returns {promise} when all iteratee functions have finished, then return a Promise Object
 */
const eachSeries = (coll, iteratee, initialValue) => {
  if (!coll) return Promise.resolve();

  let nextElem = iterator(coll);

  return new Promise((resolve, reject) => {
    let elem = nextElem();

    const successHandle = (data) => {
      elem = nextElem();

      if (elem) {
        iteratorHandle(elem.value, elem.key, iteratee, data);
      } else {
        resolve(data);
      }
    };

    const iteratorHandle = (value, key, iterator, previousValue) => {
      let data = iterator(previousValue, value, key);
      if (data instanceof Promise) {
        data.then((data) => {
          successHandle(data);
        }).catch(function(e) {
          reject(e);
        });
      } else {
        successHandle(data);
      }
    };

    iteratorHandle(elem.value, elem.key, iteratee, initialValue);
  });
};

module.exports = eachSeries;
