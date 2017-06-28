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
const crypt = require('./cryptology');

//Database Imports
const dbModels = require('./dbInjector').dataModels;
const User = dbModels.user;
const Role = dbModels.role;

module.exports.signIn = function  *(){
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

module.exports.create = function *(){

  var body = yield parse(this);
  console.log(input);

  var _password = null;
  if(body.confirm_password === body.password){
    _password = body.password;
  }else if(body.confirm_password !== body.password){  //In case of wrong password
    this.body = yield { status: false, resCode: 400, isError: true, message: "Please enter the password again" }
    return;  //Code will break here.
  }

  var input = {
    firstname: body.firstname,
    lastname: body.lastname,
    email: body.email,
    password: crypt.encrypt(_password),
    createdAt: new Date().getDate(),
    isActive: body.isActive
  };
  console.log("User Input");
  console.log(input);

  var newUser = new User(input); //New User.

  var queried_user =  yield User.findOne({email: input.email});  //Looking for duplicated user.
  if(queried_user){
    this.body = { status: true, resCode: 203, isError: false, message: "User already created" };
  }else{
    this.body = { status: true, resCode: 200, isError: false, message: "User created successfully", data: newUser.save() };
  }

};

module.exports.userList = function *(){
  this.body = { status: true, resCode: 200, isError: false, message: "Users found successfully", data: yield User.find() };
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

