/**
 * Created by shahzaibnoor on 23/06/2017.
 */

'use strict'
// 'use esversion: 6'

const views = require('co-views');
const parse = require('co-body');

const md5 = require('md5');
const crypto = require('crypto');
const async = require('async');
const exec = require('exec');
const Cryptr = require('Cryptr')

//Database Imports
const dbModels = require('./dbInjector').dataModels;
const User = dbModels.user;
const Role = dbModels.role;

module.exports.signIn = function  *signIn(){
  var req_body = parse(this);
  User.findOne({ email:this.email, password: this.password }).then(function(err,data){

    if(err){
      console.log(err);
      // this.body = yield { status: false, resCode: 400, isError: true, message: "Internal server error" };
    }else if(data){
      console.log(data);
      // this.body = yield { status: true, resCode: 200, isError: false, message: "Logged In Successfully", data: data };
    }

  });

  this.body = yield {resp: "Test response"};

};

module.exports.create = function* (){

  var input = yield parse(this);
  console.log(input);

  User.find({ $or: [{name: input.name}, {email: input.email}]}).exec(function* (err,data){

    if(err){
      console.log(err);
    }else if(data){
      console.log("Data found");
      console.log(data);
    }else if(!data){
      console.log("Creating user");
      var newDocument = new User(input);
      newDocument.save(function(data){
        console.log(data);
        // this.body = yield data;
      });

      this.body = yield {message: "Data Inserted"};
    }

  });

};

module.exports.userList = function* (){
  this.body = yield User.find();
};

var generateToken = function() {
  var sha = crypto.createHash('sha256');
  sha.update(Math.random().toString());
  return sha.digest('hex');
};

function hashPassword(password) {
  return md5(password);
}

//Response generator.
function *loadResponse(json){
  this.body = yield json;
}

