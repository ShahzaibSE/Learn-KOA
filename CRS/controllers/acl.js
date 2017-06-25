/**
 * Created by shahzaibnoor on 24/06/2017.
 */
'use strict'
const views = require('co-views');
const parse = require('co-body');
const koa = require('koa');
const path = require('path');
const dbModels = require('./dbInjector').dataModels;
const user = dbModels.user;

exports.authinticaton = function(ctx,next){
  await next();
};
