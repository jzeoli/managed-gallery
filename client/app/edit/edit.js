'use strict';

angular.module('managedGalleryApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/editproject/:id', {
        templateUrl: 'app/edit/edit.html',
        controller: 'EditCtrl',
        authenticate: true
      });
  });