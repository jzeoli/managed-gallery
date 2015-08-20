
'use strict';

var _ = require('lodash');
var Project = require('./project.model');
var multiparty = require('multiparty');
var fs = require('fs')

// Get list of projects except the archived ones
exports.index = function(req, res) {
  Project.find(function (err, projects) {
    if(err) { return handleError(res, err); }   
      
      var notArchived = [];
      
      for(var i in projects){
          if(!projects[i].archived){
              notArchived.push(projects[i])
          }
          
      }
    return res.json(200, notArchived);
  });
};

// Get a single project
exports.show = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    return res.json(project);
  });
};

// Creates a new project in the DB.
exports.create = function(req, res) {
    
var host = req.headers.host;

  var dir = "client/uploads/" + req.body.url +'/';
      if(!fs.existsSync(dir)){
          fs.mkdirSync(dir);
      }
    req.body.main_img = req.body.main_img.split('\\').join('/');
    var newPath = req.body.main_img.replace('client/uploads/', dir);

 fs.rename(req.body.main_img, newPath, function(error){
 if(error)
  throw error;
});
    
    req.body.main_img = "http://" + host + newPath.replace('client','');
    
  Project.create(req.body, function(err, project) {
    if(err) { return handleError(res, err); }
      
    return res.json(201, project);
  });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    var updated = _.merge(project, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, project);
    });
  });
};

// Deletes a project from the DB. - future
exports.destroy = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.send(404); }
    project.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};


//Uploads Image to a tmp folder - maybe eventually change this to a tmp folder
exports.upload = function(req, res) {
    var form = new multiparty.Form({
        uploadDir: './client/uploads/'    
    });
    
    
    form.parse(req, function(err, fields, files) {
        for (var i in files.file){
        files.file[i].path = files.file[i].path.split('\\').join('/');
            console.log(files.file[i].path)
        }
        
      res.json(200, files)
    });

   
}

function handleError(res, err) {
  return res.send(500, err);
}