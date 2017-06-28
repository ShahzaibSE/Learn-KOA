/**
 * Created by shahzaibnoor on 23/06/2017.
 */

'use strict'

const views = require('co-views');
const parse = require('co-body');

//Model
const dbModels = require('./dbInjector').dataModels;
const Role = dbModels.role;

module.exports.add = function *(){
   
   //Request Body.
   var body = yield parse(this);
   
   //Looking for existing roles
   var existing_roles_list = yield Role.find({});

   if(existing_roles_list){
       console.log("Existing roles");
       console.log(existing_roles_list);
   }else if(!existing_roles_list){
       //Role Info
       var new_role = {
           name: body.name.toLowerCase() ,
           createdAt: new Date().getDate()
       };

       //New document
       let new_role_document = new Role(new_role);
       //Saving role.
       this.body = yield { status: true, resCode: 200, isError: false, message: "Role created successfully", data: new_role_document.save()  };
   }

};

module.exports.update = function *(){

    var body = yield parse(this);

    var finding_role = yield Role.findOne({ name: body.name.toLowerCase() });

    if(finding_role){ //Updating role
        var { _id } = finding_role; 
        yield Role.update({ _id: _id  },{ $set: {name: body.name, updatedAt: new Date().getDate()} });
        this.body = yield { status: true, resCode: 200, isError: false, message: "Data updated successfully" };
    }else if(!finding_role){ 
        this.body = { status: false, resCode: 404, isError: true, message: "Data not found" };
    }

};

module.exports.delete = function *(){

};

module.exports.selectall = function *(){

};