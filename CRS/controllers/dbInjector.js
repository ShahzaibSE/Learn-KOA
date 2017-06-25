/**
 * Created by shahzaibnoor on 24/06/2017.
 */

'use strict'
const Schema = require('./../models/schema');
const mongoose = require('mongoose');

//Models
exports.dataModels = {
  user: Schema.users(),
  role: Schema.roles(),
  student: Schema.student(),
  company: Schema.company()
};
