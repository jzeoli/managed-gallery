'use strict';

var subdomain = require('express-subdomain');
var express = require('express');
var controller = require('./project.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();




router.get('/project', controller.index);
router.get('/project/:id', controller.show);
router.post('/project', auth.isAuthenticated(), controller.create);
router.put('/project/:id', auth.isAuthenticated(), controller.update);
router.post('/project/:id', auth.isAuthenticated(), controller.update);
router.delete('/project/:id', auth.isAuthenticated(), controller.destroy);
router.post('/upload', auth.isAuthenticated(), controller.upload);

router.get('*', function(req, res){
    res.send(500)
});


module.exports = router;