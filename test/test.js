'use strict';

const expect = require('chai').expect;
const promiseKit = require('../');

describe('promise kit test', function() {
  describe('eachLimit test', () => {
    it('eachLimit test', function(done) {
      promiseKit.eachLimit([1, 2, 3, 4, 5], 2, function(item) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            return resolve(item + 1);
          }, 1e2)
        });
      }).then(function(data) {
        expect(data).to.eql([2, 3, 4, 5, 6]);
        done();
      });
    })

    it('eachLimit pure function test', (done) => {
      promiseKit.eachLimit([1, 2, 3, 4, 5], 3, (item) => {
        return item + 1;
      }).then((data) => {
        expect(data).to.eql([2, 3, 4, 5, 6]);
        done();
      });
    })
  })
});
