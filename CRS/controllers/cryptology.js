/**
 * Created by shahzaibnoor on 25/06/2017.
 */

'use strict'

const Cryptr = require('cryptr');


// |---------------------------------------- Crypto snippet ------------------------------------|

var secretKey = 'Secret';
var cryptr = new Cryptr(secretKey);

module.exports.encrypt = function(passphrase){
  var encryptedString = cryptr.encrypt(passphrase);
  return encryptedString;
}

module.exports.decrypt = function(encrypted_passphrase){
  var decryptedString = cryptr.encrypt(encrypted_passphrase);
  return decryptedString;
}
