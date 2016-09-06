'use strict';

function createArrayIterator(coll) {
  let i = -1;
  const len = coll.length;
  return function next() {
    return ++i < len ? {value: coll[i], key: i} : null;
  }
}

module.exports = (obj) => {
  return createArrayIterator(obj);
};
