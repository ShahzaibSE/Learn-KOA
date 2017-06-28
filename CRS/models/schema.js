/**
 * Created by shahzaibnoor on 24/06/2017.
 */
'use strict';
const views = require('co-views');
const parse = require('co-body');
const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const Model = require('mongoose').model;

exports.student = function() {

   var student = Schema({
     id: Schema.ObjectId,
     roleId: String,
     firstname: String,
     lastname: String,
     email: String,
     password: String,
     createdAt: Date,
     updatedAt: Date
   });

   return mongoose.model('student',student);
};

exports.company = function() {

    var company = {
      id: Schema.ObjectId,
      name: String,
      owner: String,
      email: String,
      password: String,
      createdAt: Date,
      updatedAt: Date
  };

  return mongoose.model('company',company);
};


exports.roles = function ()
{
  var roles = mongoose.Schema({
    id: Schema.ObjectId,
    name: String,
    createdAt: Date,
    updatedAt: Date,
  });
  return mongoose.model('roles', roles);
}

exports.users = function ()
{
  var users = mongoose.Schema({
    id :Schema.ObjectId,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    roleId: [],
    devices: [],
    sessionId: String,
    isActive: Boolean,
    createdAt: Date
  });
  return mongoose.model('users', users);
}
