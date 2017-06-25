/**
 * Created by shahzaibnoor on 20/06/2017.
 */

'use strict';
const views = require('co-views');
const parse = require('co-body');

module.exports.sampleResponse = function* (){
  this.body = yield { message: "Congratulations! on your first KOA response", header: this.header};
};
