/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var subdomain = require('express-subdomain');



module.exports = function(app) {

    
    //set CORS
app.use(function(req,res,next) { 
   // res.setHeader("Access-Control-Allow-Origin", "http://localhost.dev:9000"); 
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type")
    
    next(); });
    

  // SETUP API ROUTES
 app.use(subdomain('api',  require('./api/project')))
 
 // SETUP ADMIN ROUTES
 
  app.use('/api/users', require('./api/user'));
  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
