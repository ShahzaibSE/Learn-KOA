'use strict';
const messages = require('./controllers/messages');
const user = require('./controllers/users');
const roles = require('./controllers/roles');

const compress = require('koa-compress');
const logger = require('koa-logger');
const serve = require('koa-static');
const route = require('koa-route');
const koa = require('koa');
const path = require('path');
const mongoose = require('mongoose');
const koa_mongoose = require('koa-mongoose');
const acl = require('./controllers/acl');

const app = module.exports = koa();

//Mongodb Connection
mongoose.connect('mongodb://localhost/CRS');

mongoose.connection.on('connected',function(){
  console.log("Mongodb connection up now");
});
mongoose.connection.on('error',function(){
  console.log("Mongodb connection error occured while conecting");
});

// Logger
app.use(logger());

// | ------------------------ Routes ------------------------ |
app.use(route.get('/', messages.home));
app.use(route.get('/messages', messages.list));
app.use(route.get('/messages/:id', messages.fetch));
app.use(route.post('/messages', messages.create));
app.use(route.post('/body',messages.bodyFn));
app.use(route.get('/async', messages.delay));
app.use(route.get('/promise', messages.promise));
app.use(route.post('/user/signIn',user.signIn));
app.use(route.post('/user/create',user.create));
app.use(route.get('/user/list',user.userList));
// | -------------------------------------------------------- |

//Mongoose middleware
// app.use(mongoose({
//   username: '',
//   password: '',
//   host: '127.0.0.1',
//   port: 27017,
//   database: ctx => {
//     return ctx.headers['x-app']
//   },
//   schemas: './models/schema',
//   db: {
//     native_parser: true
//   },
//   server: {
//     poolSize: 5
//   }
// }))

// Serve static files
app.use(serve(path.join(__dirname, 'public')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3003);
  console.log('listening on port 3003');
}
